const SUPABASE_URL = 'https://odifpoqjpajqmszklpcd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_fjHvZ1-UlSQ2b9niOocLGw__TzXthjg';

const HEADERS_SUPABASE = {
    'apikey': SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
};

// 1. Iniciar sesión consultando directamente la tabla de usuarios
async function iniciarSesionAPI(email, password) {
    const url = `${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(email)}&password=eq.${encodeURIComponent(password)}&select=*`;
    const respuesta = await fetch(url, { headers: HEADERS_SUPABASE });

    if (!respuesta.ok) {
        throw new Error('Error al consultar la base de datos en Supabase.');
    }

    const usuarios = await respuesta.json();
    if (usuarios.length === 0) {
        throw new Error('Correo o contraseña incorrectos.');
    }

    return usuarios[0];
}

// 2. Obtener todos los eventos
async function obtenerEventos() {
    const url = `${SUPABASE_URL}/rest/v1/events?select=*,users:users!events_organizer_id_fkey(full_name,avatar_url)&order=starts_at.asc`;
    const respuesta = await fetch(url, { headers: HEADERS_SUPABASE });

    if (!respuesta.ok) {
        throw new Error('No se pudieron cargar los eventos.');
    }

    return await respuesta.json();
}

// 3. Obtener un evento por su ID
async function obtenerEventoPorId(id) {
    const url = `${SUPABASE_URL}/rest/v1/events?id=eq.${id}&select=*,users:users!events_organizer_id_fkey(full_name,avatar_url,bio)`;
    const respuesta = await fetch(url, { headers: HEADERS_SUPABASE });

    if (!respuesta.ok) {
        throw new Error('Error al obtener el detalle del evento.');
    }

    const eventos = await respuesta.json();
    return eventos[0] || null;
}

// 4. Crear un nuevo evento
async function crearEventoAPI(datosEvento) {
    const url = `${SUPABASE_URL}/rest/v1/events`;
    const respuesta = await fetch(url, {
        method: 'POST',
        headers: HEADERS_SUPABASE,
        body: JSON.stringify(datosEvento)
    });

    if (!respuesta.ok) {
        const errorData = await respuesta.json().catch(() => ({}));
        throw new Error(errorData.message || 'No se pudo publicar el evento.');
    }

    const creado = await respuesta.json();
    return creado[0] || creado;
}

// 5. Obtener datos completos del perfil desde Supabase
async function obtenerPerfilCompletoAPI(userId) {
    const resUser = await fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.${userId}&select=*`, { headers: HEADERS_SUPABASE });
    const users = await resUser.json();
    const usuario = users[0];

    const resInt = await fetch(`${SUPABASE_URL}/rest/v1/user_interests?user_id=eq.${userId}&select=interests(*)`, { headers: HEADERS_SUPABASE });
    const interesesData = await resInt.json();
    const intereses = Array.isArray(interesesData) ? interesesData.map(item => item.interests).filter(Boolean) : [];

    const resBad = await fetch(`${SUPABASE_URL}/rest/v1/user_badges?user_id=eq.${userId}&select=badges(*)`, { headers: HEADERS_SUPABASE });
    const insigniasData = await resBad.json();
    const insignias = Array.isArray(insigniasData) ? insigniasData.map(item => item.badges).filter(Boolean) : [];

    const resEv = await fetch(`${SUPABASE_URL}/rest/v1/events?organizer_id=eq.${userId}&select=*`, { headers: HEADERS_SUPABASE });
    const eventos = await resEv.json();

    return {
        usuario,
        intereses,
        insignias,
        eventos: Array.isArray(eventos) ? eventos : []
    };
}

// 6. Obtener eventos del usuario (organizados + inscritos) con sus asistentes
async function obtenerMisEventosAPI(userId) {
    const resOrg = await fetch(
        `${SUPABASE_URL}/rest/v1/events?organizer_id=eq.${userId}&select=*`,
        { headers: HEADERS_SUPABASE }
    );
    const organizados = resOrg.ok ? await resOrg.json() : [];

    const resIns = await fetch(
        `${SUPABASE_URL}/rest/v1/event_attendees?user_id=eq.${userId}&select=event_id`,
        { headers: HEADERS_SUPABASE }
    );
    const inscritosIds = resIns.ok ? await resIns.json() : [];

    let inscritos = [];
    if (Array.isArray(inscritosIds) && inscritosIds.length > 0) {
        const ids = inscritosIds.map(i => i.event_id).join(',');
        const resEvIns = await fetch(
            `${SUPABASE_URL}/rest/v1/events?id=in.(${ids})&select=*`,
            { headers: HEADERS_SUPABASE }
        );
        inscritos = resEvIns.ok ? await resEvIns.json() : [];
    }

    const mapaEventos = new Map();
    [...(Array.isArray(organizados) ? organizados : []), ...(Array.isArray(inscritos) ? inscritos : [])].forEach(ev => {
        mapaEventos.set(ev.id, ev);
    });

    const listaEventos = Array.from(mapaEventos.values()).sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at));

    if (listaEventos.length > 0) {
        const todosIds = listaEventos.map(e => e.id).join(',');
        const resAtt = await fetch(
            `${SUPABASE_URL}/rest/v1/event_attendees?event_id=in.(${todosIds})&select=event_id,user_id,status,users(id,full_name,avatar_url)`,
            { headers: HEADERS_SUPABASE }
        );
        const asistentes = resAtt.ok ? await resAtt.json() : [];

        return listaEventos.map(ev => ({
            ...ev,
            event_attendees: Array.isArray(asistentes)
                ? asistentes.filter(a => Number(a.event_id) === Number(ev.id))
                : []
        }));
    }

    return listaEventos;
}

// 7. Obtener detalle completo de un evento (organizador, reseñas y asistentes)
async function obtenerDetalleEventoCompletoAPI(eventId) {
    const url = `${SUPABASE_URL}/rest/v1/events?id=eq.${eventId}&select=*,users:users!events_organizer_id_fkey(id,full_name,avatar_url)`;
    const res = await fetch(url, { headers: HEADERS_SUPABASE });
    if (!res.ok) throw new Error('Error al obtener el detalle del evento.');

    const eventos = await res.json();
    const evento = eventos[0] || null;
    if (!evento) return null;

    const resAtt = await fetch(
        `${SUPABASE_URL}/rest/v1/event_attendees?event_id=eq.${eventId}&select=user_id,status,users(id,full_name,avatar_url)`,
        { headers: HEADERS_SUPABASE }
    );
    const asistentes = resAtt.ok ? await resAtt.json() : [];

    const resRev = await fetch(
        `${SUPABASE_URL}/rest/v1/organizer_reviews?organizer_id=eq.${evento.organizer_id}&select=rating`,
        { headers: HEADERS_SUPABASE }
    );
    const reviews = resRev.ok ? await resRev.json() : [];
    let promedioRating = null;
    if (Array.isArray(reviews) && reviews.length > 0) {
        const suma = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
        promedioRating = (suma / reviews.length).toFixed(1);
    }

    return {
        ...evento,
        event_attendees: Array.isArray(asistentes) ? asistentes : [],
        organizer_rating: promedioRating
    };
}

// 8. Unirse a un evento (inserta en event_attendees)
async function unirseAEventoAPI(eventId, userId) {
    const url = `${SUPABASE_URL}/rest/v1/event_attendees`;
    const res = await fetch(url, {
        method: 'POST',
        headers: HEADERS_SUPABASE,
        body: JSON.stringify({
            event_id: Number(eventId),
            user_id: Number(userId),
            status: 'attending'
        })
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'No se pudo registrar tu asistencia.');
    }

    return await res.json();
}

// 9. Obtener eventos con organizador y asistentes para Explorar
async function obtenerEventosExplorarAPI() {
    const resEv = await fetch(
        `${SUPABASE_URL}/rest/v1/events?select=*,users:users!events_organizer_id_fkey(full_name,avatar_url)&order=starts_at.asc`,
        { headers: HEADERS_SUPABASE }
    );

    if (!resEv.ok) {
        const detalleError = await resEv.text();
        console.error('Error Supabase en events:', resEv.status, detalleError);
        throw new Error(`Error ${resEv.status} al cargar eventos`);
    }

    const eventos = await resEv.json();

    let asistentes = [];
    try {
        const resAtt = await fetch(
            `${SUPABASE_URL}/rest/v1/event_attendees?select=event_id,user_id,users(avatar_url,full_name)`,
            { headers: HEADERS_SUPABASE }
        );
        if (resAtt.ok) {
            asistentes = await resAtt.json();
        }
    } catch (e) {
        console.warn('No se pudieron cargar asistentes:', e);
    }

    return eventos.map(ev => ({
        ...ev,
        event_attendees: Array.isArray(asistentes)
            ? asistentes.filter(a => Number(a.event_id) === Number(ev.id))
            : []
    }));
}

// 10. Obtener datos del chat de un evento (info del evento + participantes + mensajes)
async function obtenerDatosChatEventoAPI(eventId, userId) {
    let idObjetivo = eventId;

    if (!idObjetivo && userId) {
        const misEventos = await obtenerMisEventosAPI(userId);
        const conChat = misEventos.find(e => e.is_chat_open) || misEventos[0];
        if (conChat) idObjetivo = conChat.id;
    }

    if (!idObjetivo) {
        const resFallback = await fetch(
            `${SUPABASE_URL}/rest/v1/events?is_chat_open=eq.true&select=id&limit=1`,
            { headers: HEADERS_SUPABASE }
        );
        const fallback = resFallback.ok ? await resFallback.json() : [];
        if (fallback.length > 0) idObjetivo = fallback[0].id;
    }

    if (!idObjetivo) return null;

    const evento = await obtenerDetalleEventoCompletoAPI(idObjetivo);
    if (!evento) return null;

    let mensajes = null;
    try {
        const resMsg = await fetch(
            `${SUPABASE_URL}/rest/v1/event_messages?event_id=eq.${idObjetivo}&select=*,users:users!event_messages_sender_id_fkey(id,full_name,avatar_url)&order=created_at.asc`,
            { headers: HEADERS_SUPABASE }
        );
        if (resMsg.ok) {
            mensajes = await resMsg.json();
        }
    } catch (e) {
        console.warn('Tabla event_messages no disponible, usando respaldo local.');
    }

    return {
        evento,
        mensajes
    };
}

// 11. Enviar mensaje al chat del evento
async function enviarMensajeChatAPI(eventId, senderId, content) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/event_messages`, {
        method: 'POST',
        headers: HEADERS_SUPABASE,
        body: JSON.stringify({
            event_id: Number(eventId),
            sender_id: Number(senderId),
            content: content
        })
    });

    if (!res.ok) {
        throw new Error('No se pudo guardar el mensaje en Supabase.');
    }

    const data = await res.json();
    return data[0] || data;
}