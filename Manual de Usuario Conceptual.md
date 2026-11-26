# Manual de Usuario Conceptual

## VToConnect

VToConnect es una plataforma web pensada para facilitar encuentros presenciales y reducir el aislamiento social. Permite descubrir actividades cercanas, proponer eventos, organizar la participación y conversar con otras personas del grupo.

> **Alcance de este manual:** el proyecto está en etapa de prototipo frontend. Este documento explica el uso esperado de acuerdo con las pantallas y controles visibles; algunas acciones se describen suponiendo que los servicios de la plataforma funcionan detrás de la interfaz.

## 1. Login y registro

### Propósito de la pantalla

Dar acceso a la comunidad a las personas que ya tienen una cuenta y ofrecer a quienes llegan por primera vez la opción de iniciar el registro.

### Elementos de interfaz

- Campo **Correo Electrónico**.
- Campo **Contraseña**, con un control visual para mostrar u ocultar su contenido.
- Enlace **Contraseña olvidada?**.
- Botón **Iniciar Sesión**.
- Enlace **Crear cuenta** para personas nuevas.
- Enlaces de pie para **Privacidad** y **Necesitas Ayuda?**.

### Interacción y resultados

1. La persona escribe su correo y contraseña.
2. Al pulsar **Iniciar Sesión**, la plataforma valida las credenciales. Si son correctas, abre la experiencia principal; si no, muestra un mensaje de error junto al formulario.
3. El control junto a la contraseña permite alternar entre texto oculto y visible.
4. **Contraseña olvidada?** inicia el flujo de recuperación de acceso.
5. **Crear cuenta** lleva al flujo de registro, donde una persona nueva puede completar los datos requeridos y crear su perfil. La interfaz entregada muestra este acceso desde Login; no incluye una pantalla independiente de registro.
6. Los enlaces de privacidad y ayuda conducen a la información correspondiente.

## 2. Explorar y mapa

### Propósito de la pantalla

Encontrar actividades y personas con intereses afines en la zona. El mapa ofrece contexto geográfico y las tarjetas permiten comparar eventos rápidamente.

### Elementos de interfaz

- Campo de búsqueda **Buscar eventos, clases...**.
- Botón de filtros con icono de controles deslizantes.
- Área de mapa con marcadores de eventos.
- Hoja inferior que puede expandirse o contraerse mediante su asa.
- Filtros rápidos por categoría: **Todos**, **Yoga**, **Baile**, **Senderismo** y **Tours**.
- Tarjetas de evento con imagen, título, anfitrión, horario, ubicación, asistentes y botón **Ver detalles**.
- Barra inferior para ir a **Explorar**, **Mis Eventos**, **Crear**, **Mensajes** o **Perfil**.

### Interacción y resultados

- Al escribir en el buscador, la plataforma filtra eventos por nombre, actividad u otros términos relacionados.
- Al elegir una categoría rápida, el mapa y las tarjetas muestran las actividades de esa categoría. **Todos** quita ese filtro rápido.
- Al arrastrar la hoja inferior, se amplía el espacio de tarjetas o se da más protagonismo al mapa.
- Al seleccionar un marcador o **Ver detalles**, se abre la ficha del evento para revisar la información antes de decidir si participar.
- El botón de filtros abre el submenú **Filtros de búsqueda** descrito a continuación.

## 3. Filtros de búsqueda

### Propósito de la pantalla

Acotar la búsqueda para encontrar eventos que coincidan con la ubicación, el tamaño del grupo, el momento y los intereses de la persona.

### Elementos de interfaz

- Control deslizante de **Cercanía (Distancia)** con rango de **1 km** a **15+ km** y una etiqueta que muestra el valor elegido.
- Opciones de **Número de personas**: Individual, 2–5 personas, 6–10 personas y Grupos grandes (10+).
- Opciones de **Fecha y hora**: Hoy, Este fin de semana y Próxima semana.
- Opciones de **Precio**: Gratis, bajo, medio y alto.
- Opciones de **Categoría de actividad**: Yoga, Baile, Deportes y Aire libre.
- Botón **Restablecer**.
- Botones **Aplicar filtros** y **Mostrar resultados**.
- Control para cerrar la hoja de filtros.

### Interacción y resultados

- Al mover el deslizador, cambia el radio de búsqueda y se actualizan la etiqueta de kilómetros y, al aplicar, los eventos mostrados en el mapa.
- Al seleccionar tamaño de grupo, fecha, precio o categoría, se marca la opción elegida para combinarla con los demás criterios.
- **Restablecer** devuelve las opciones a sus valores iniciales.
- **Aplicar filtros** confirma los criterios y actualiza la búsqueda. La interfaz comunica la acción con un aviso de confirmación.
- **Mostrar resultados** lleva de vuelta a los resultados filtrados para revisarlos en el mapa y en las tarjetas.
- El control de cierre descarta la hoja y vuelve a Explorar.

## 4. Crear evento

### Propósito de la pantalla

Permitir que una persona proponga una actividad presencial y comparta los datos necesarios para que otras personas puedan decidir si asistir.

### Elementos de interfaz

- Campos para **Título del evento** y **Descripción**.
- Selector de **Categoría** con Yoga, Senderismo, Baile, Deportes, Charla y Otros.
- Controles **Seleccionar fecha** y **Seleccionar hora**.
- Campo **Ubicación** y espacio visual reservado para el mapa.
- Control de **Límite de asistentes** con botones + y −.
- Botón **Publicar Evento**.
- Barra inferior de navegación.

### Interacción y resultados

1. La persona escribe el título y una descripción que explique la actividad, qué llevar y dónde reunirse.
2. Selecciona la categoría, fecha y hora. Los selectores abren controles para escoger cada dato.
3. Introduce una dirección o lugar. La plataforma localiza el sitio y lo representa en el mapa para revisar el punto de encuentro.
4. Usa + o − para ajustar el cupo máximo.
5. Al pulsar **Publicar Evento**, la plataforma valida los datos y, si están completos, publica la actividad. El evento aparece en Explorar y queda asociado al perfil de quien lo organiza.
6. La barra inferior permite cambiar a cualquiera de las secciones principales sin salir de la aplicación.

## 5. Mis Eventos

### Propósito de la pantalla

Consultar las actividades a las que la persona se ha unido o que ha organizado, separando las próximas de las que ya ocurrieron.

### Elementos de interfaz

- Pestañas **Próximos** e **Historial**.
- Tarjetas con nombre del evento, fecha u hora, lugar y asistentes.
- Indicador de estado del chat y botón **Chat del Evento** cuando está disponible.
- Barra inferior de navegación.

### Interacción y resultados

- **Próximos** muestra los eventos futuros y su información práctica.
- **Historial** cambia el contenido para mostrar eventos pasados. Si no hay eventos anteriores, aparece el mensaje de estado vacío.
- El botón **Chat del Evento** abre la conversación asociada. Cuando el chat aún no está habilitado, la tarjeta informa desde cuándo estará disponible.
- La barra inferior permite continuar hacia Explorar, Crear, Mensajes o Perfil.

## 6. Perfil de usuario

### Propósito de la pantalla

Presentar la identidad, intereses y participación de una persona para facilitar conexiones con otros miembros de la comunidad.

### Elementos de interfaz

- Espacios de portada y foto de perfil.
- Nombre, edad, ubicación y biografía.
- Etiquetas de intereses, como Yoga, Senderismo, Baile, Café y charlas, y Fotografía.
- Sección **Insignias de Comunidad**.
- Sección **Mi Impacto / Eventos** con tarjetas de actividades.
- Botones **Editar Perfil**, **Configuración** y **Cerrar Sesión**.
- Barra inferior de navegación.

### Interacción y resultados

- Al pulsar **Editar Perfil**, se abre la edición de los datos personales, biografía, ubicación e intereses.
- Las insignias y eventos muestran la actividad de la persona dentro de la comunidad y ayudan a dar contexto a quienes visitan el perfil.
- **Configuración** abre las preferencias de cuenta.
- **Cerrar Sesión** finaliza la sesión y devuelve a Login.
- Desde la barra inferior se puede navegar a las otras secciones principales.

## 7. Chat grupal

### Propósito de la pantalla

Coordinar los detalles de un evento y facilitar que sus participantes se conozcan antes del encuentro presencial.

### Elementos de interfaz

- Cabecera con botón de regreso, imagen del grupo, nombre del evento y número de participantes.
- Menú de opciones del chat.
- Historial de mensajes con nombre de quien escribe y hora.
- Campo **Escribe un mensaje...**.
- Botón de adjuntar y botón de enviar.
- Barra inferior de navegación.

### Interacción y resultados

- Al escribir en el campo y pulsar el botón de enviar, el mensaje se incorpora al hilo con la identidad y hora correspondientes.
- El botón de adjuntar permite compartir contenido relacionado con la organización del evento, si el servicio lo admite.
- El botón de regreso vuelve a la pantalla anterior; la cabecera permite reconocer en qué grupo se está conversando.
- El menú de opciones abre acciones de gestión de la conversación.
- La barra inferior permite cambiar a las demás secciones de VToConnect.

## Recorrido recomendado

1. Inicia sesión o crea una cuenta.
2. Explora el mapa y aplica filtros para encontrar un evento adecuado.
3. Revisa sus detalles y decide si participar.
4. Consulta **Mis Eventos** para tener a mano fecha, lugar y chat.
5. Usa el chat grupal para coordinar la asistencia y el perfil para compartir intereses.
6. Si quieres proponer un encuentro, completa **Crear Evento** y publícalo.
