import { supabase } from '../supabase/client.ts'; // O tu cliente de Supabase

let map;
let markers = [];

async function initMap() {
  // Coordenadas iniciales centradas en Guadalajara, Jalisco
  const guadalajaraCenter = { lat: 20.6597, lng: -103.3496 };

  map = new google.maps.Map(document.getElementById('map'), {
    center: guadalajaraCenter,
    zoom: 13,
    styles: [ // Estilo limpio opcional acorde a la paleta
      { elementType: "geometry", stylers: [{ color: "#f8fafc" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#475569" }] },
      { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
      { featureType: "water", elementType: "geometry", stylers: [{ color: "#e2e8f0" }] }
    ],
    disableDefaultUI: true,
    zoomControl: true
  });

  // Cargar ubicaciones desde Supabase y agregarlas al mapa
  await loadEventMarkers();
}

async function loadEventMarkers() {
  try {
    // Consulta a Supabase (asumiendo que tu tabla tiene lat, lng, titulo, categoria)
    // const { data: eventos, error } = await supabase.from('eventos').select('*');
    
    // Datos simulados de respaldo para pruebas locales:
    const eventos = [
      { id: 1, titulo: 'Clase de Salsa Principiantes', lat: 20.6736, lng: -103.344, categoria: 'Clases' },
      { id: 2, titulo: 'Yoga al Amanecer', lat: 20.6850, lng: -103.380, categoria: 'Yoga' },
      { id: 3, titulo: 'Meetup Desarrollo Web & IA', lat: 20.6540, lng: -103.325, categoria: 'Tech' }
    ];

    // Limpiar marcadores previos si existen
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    eventos.forEach(evento => {
      const marker = new google.maps.Marker({
        position: { lat: evento.lat, lng: evento.lng },
        map: map,
        title: evento.titulo,
        animation: google.maps.Animation.DROP
      });

      // Ventana de información al hacer clic en el pin
      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 6px;"><strong>${evento.titulo}</strong><br><span style="font-size: 12px; color: #64748b;">${evento.categoria}</span></div>`
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      markers.push(marker);
    });
  } catch (err) {
    console.error('Error al cargar marcadores de Supabase:', err);
  }
}

// Ejecutar al cargar la ventana
window.addEventListener('DOMContentLoaded', () => {
  if (window.google && window.google.maps) {
    initMap();
  } else {
    window.initMap = initMap; // Callback si se carga asíncronamente
  }
});