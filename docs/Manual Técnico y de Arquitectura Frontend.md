# Manual Técnico y de Arquitectura Frontend

## VToConnect

**Versión documental:** 1.0  
**Estado del producto:** prototipo de interfaz móvil  
**Tecnologías observadas:** HTML5, CSS3 y JavaScript embebido en algunas vistas

## 1. Introducción y alcance del prototipo

### 1.1 Propósito

VToConnect es una propuesta de aplicación web móvil orientada a facilitar encuentros presenciales mediante eventos y actividades grupales. Su propósito de producto es ayudar a las personas a descubrir actividades cercanas, conectar con participantes y organizar encuentros, contribuyendo a reducir el aislamiento social.

### 1.2 Alcance y madurez

El material entregado corresponde principalmente a una **fase de prototipado UI/UX**. Las vistas HTML y hojas CSS describen la presentación, estructura, contenido de ejemplo y algunos estados de interacción en el navegador. No se incluye en este repositorio un servidor, una base de datos, una API propia, autenticación operativa ni persistencia de eventos, mensajes o perfiles.

Hay JavaScript local para alternar pestañas, mostrar/ocultar el panel de filtros y cambiar elementos del DOM del chat. Esto no equivale a una aplicación conectada a datos reales. `menuLogin.html` contiene una llamada `fetch` hacia una URL de túnel externa configurada en el propio archivo; el servicio no forma parte del proyecto entregado y su disponibilidad o contrato no puede darse por garantizado. Por ello, las capacidades que siguen se describen como comportamiento proyectado cuando corresponda.

Los datos, nombres, horarios, asistentes, estados de chat y perfiles visibles son contenido de demostración incluido en el marcado. No deben interpretarse como datos de producción.

## 2. Arquitectura de archivos y estándares de desarrollo

### 2.1 Estructura observada

El proyecto es plano: las páginas y estilos están en un mismo directorio, sin separación por carpetas de componentes, activos o lógica.

| Archivo | Responsabilidad |
|---|---|
| `global.css` | Variables visuales base, reinicio de márgenes, `box-sizing`, tipografía y ancho máximo de los contenedores móviles. |
| `navbar.css` | Estilos compartidos de la navegación inferior y su estado activo. |
| `menuLogin.html` | Inicio de sesión, formulario y scripts locales de validación básica de campos, visibilidad de contraseña y petición de acceso al endpoint configurado. |
| `login.css` | Presentación de la vista de acceso. |
| `menuExplorar.html` | Búsqueda, mapa reservado, tarjetas de muestra y hoja de filtros; incluye JavaScript para apertura/cierre, slider y estado visual de píldoras. |
| `menuExplorarv2.html` | Copia de la vista de explorar con el mismo nombre de hoja de estilos y estructura general. No se identifica en el marcado un mecanismo que la convierta en una versión funcional distinta. |
| `explorar.css` | Presentación de búsqueda, contenedor de mapa, tarjetas y hoja inferior de resultados. |
| `filtros.css` | Estilos de overlay, panel deslizable, controles de distancia, píldoras y botones de filtros. |
| `crearEvento.html` | Formulario visual para proponer un evento y navegación inferior. El mapa está reservado mediante un `div` con id `gmp-map-container`. |
| `crear-evento.css` | Estilos del formulario de creación, categorías, campos y contador. |
| `menuRegistro.html` | Vista “Mis Eventos”, tarjetas de ejemplo y pestañas Próximos/Historial; incluye `switchTab()` para alternar vistas locales. |
| `mis-eventos.css` | Estilos de tarjetas, pestañas y estado vacío de eventos. |
| `menuChat.html` | Conversación de ejemplo y compositor de mensajes; incluye una función local para incorporar texto al DOM. |
| `chat.css` | Estilos de cabecera, burbujas y controles de chat. |
| `menuPerfil.html` | Perfil de ejemplo, intereses, insignias, eventos y acciones visuales. |
| `perfil.css` | Estilos de la vista de perfil y placeholders de imagen. |
| `habilitarRegistro.html` | Aunque su nombre sugiere registro, el contenido implementado es una **vista de detalle de evento** con organizador, asistentes y botones para unirse o abrir el chat. |
| `detalle-evento.css` | Estilos de la vista de detalle del evento. |
| `Manual de Usuario Conceptual.md` | Documentación conceptual de uso existente; debe leerse considerando el alcance de prototipo descrito en este manual. |

Los HTML enlazan Font Awesome 6.4.0 desde un CDN para iconografía. Si no hay acceso al CDN, esos iconos pueden no mostrarse. La tipografía base está definida con una pila de fuentes del sistema en `global.css`.

### 2.2 Convenciones de interfaz y diseño

- **Enfoque móvil:** cada vista usa un contenedor con ancho máximo cercano a 400 px y centrado en la ventana. Los estilos priorizan una composición de pantalla estrecha; no se observa un sistema amplio de breakpoints para escritorio.
- **Base compartida:** `global.css` proporciona variables y estilos comunes, mientras que cada página enlaza una hoja específica. Algunas hojas redefinen variables como `--bg-color`, `--primary-coral` o `--text-main`; por tanto, la paleta no está completamente normalizada entre todas las vistas.
- **Paleta:** predominan fondos cálidos claros, blanco, texto oscuro, coral para acciones/selección y verde apagado para etiquetas o categorías. Los valores exactos varían por módulo; la base global declara, entre otros, `#FAFAF7`, `#D67C6B` y `#90A288`.
- **Tipografía:** pila nativa `-apple-system`, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica y Arial, sin fuente web propia.
- **Componentes repetidos:** barra inferior de cinco accesos (Explorar, Mis Eventos, Crear, Mensajes y Perfil), tarjetas, etiquetas de categoría, controles tipo píldora y contenedores móviles.
- **Panel deslizable:** filtros de explorar se presentan como overlay y hoja inferior. Sus clases `active` controlan la transición visual desde JavaScript.
- **Marcadores de contenido:** imágenes de portada, avatares y mapas aparecen en varios puntos como placeholders. No se incluyen activos de imágenes ni una instancia real de mapa en el HTML inspeccionado.

## 3. Catálogo de módulos y capacidades proyectadas

La columna “capacidad proyectada” define la función que los controles sugieren para una futura integración. No afirma que exista procesamiento de datos en este prototipo.

### 3.1 Acceso — `menuLogin.html`

**Interfaz presente:** campos de correo (`type="email"`) y contraseña, control visual de mostrar/ocultar, enlace de recuperación, botón de inicio, enlace de creación de cuenta y mensaje de error inicialmente oculto.

**Comportamiento local observado:** el botón de visibilidad cambia el tipo del campo entre `password` y `text`. El script comprueba que correo y contraseña no estén vacíos. El botón realiza una petición `POST` a `/login` sobre una URL externa codificada; ante éxito guarda `data.user` en `localStorage` y redirige a `explorar.html`.

**Capacidad proyectada:** autenticación de usuarios, presentación de errores del servicio, recuperación de contraseña y acceso al registro. En el repositorio no hay vista independiente de registro ni contrato/servidor que permita confirmar la operación del endpoint. La ruta de redirección `explorar.html` tampoco coincide con los archivos listados (`menuExplorar.html` y `menuExplorarv2.html`), por lo que requiere alineación.

### 3.2 Explorar / mapa — `menuExplorar.html` y `menuExplorarv2.html`

**Interfaz presente:** campo “Buscar eventos, clases…”, botón de filtros, `div#map-container` preparado para incorporar un mapa, tarjetas de eventos de muestra con botón “Ver detalles”, categorías rápidas y barra inferior. El contenedor no incluye actualmente una etiqueta `<gmp-map>`.

**Comportamiento local observado:** el botón abre la hoja de filtros. Las tarjetas y el buscador no están conectados a lógica de búsqueda en el código inspeccionado.

**Capacidad proyectada:** buscar actividades por texto, representar eventos con marcadores y tarjetas, filtrar por categorías y abrir el detalle de una actividad. La vista de detalle disponible está en `habilitarRegistro.html`; los enlaces/botones de las tarjetas deben conectarse explícitamente a esa ruta o a una ruta equivalente.

### 3.3 Submenú de filtros

**Interfaz presente:** slider `min="1"`, `max="16"`, valor inicial 5; etiquetas visuales de distancia; grupos de opciones de tamaño, fecha, precio y categoría; botones Restablecer, Aplicar filtros y Mostrar resultados; cierre y overlay.

**Comportamiento local observado:** se actualiza la etiqueta del slider, mostrando “15+ km” para el extremo 16; el botón Restablecer devuelve el slider a 5 km; las píldoras alternan su clase `active`; aplicar/cerrar ocultan el panel. El script de filtros no recoge ni aplica las selecciones a tarjetas o mapa y `Mostrar resultados` no tiene un listener asociado.

**Capacidad proyectada:** combinar radio de 1 km a 15+ km, tamaño de grupo (Individual, 2–5, 6–10, 10+), fecha (hoy, fin de semana, próxima semana), nivel de precio y categoría para solicitar o filtrar resultados. Debe definirse si cada grupo admite una sola selección o varias: el comportamiento actual de alternancia permite activar múltiples píldoras dentro del mismo grupo.

### 3.4 Crear evento — `crearEvento.html`

**Interfaz presente:** título, botones de categoría (Yoga, Senderismo, Baile, Deportes, Charla y Otros), controles para seleccionar fecha y hora, ubicación, `div#gmp-map-container`, descripción, contador visual con valor 15 y botón “Publicar Evento”.

**Capacidad proyectada:** capturar datos del encuentro, seleccionar un punto geográfico, validar campos, ajustar cupo y publicar el evento para que aparezca en Explorar y quede asociado a su organizador. Actualmente no hay listeners para el formulario; los selectores, categorías, contador y botón son elementos visuales sin procesamiento implementado. El mapa solo está reservado como contenedor.

### 3.5 Mis Eventos — `menuRegistro.html`

**Interfaz presente:** pestañas Próximos e Historial, tarjetas de ejemplo, horario, ubicación, asistentes, estado de chat y estado vacío para historial.

**Comportamiento local observado:** `switchTab()` alterna clases CSS y cambia entre las dos vistas estáticas. El listado no se alimenta de eventos del usuario. Los botones de chat no tienen navegación declarada en el marcado.

**Capacidad proyectada:** separar participaciones y eventos organizados en próximos e históricos, mostrar datos actualizados y permitir abrir el chat cuando esté disponible. La regla “Disponible en 48h” aparece como texto de muestra, no como cálculo dinámico.

### 3.6 Chat grupal — `menuChat.html`

**Interfaz presente:** cabecera con regreso, nombre del evento, número de participantes y menú; mensajes de ejemplo; campo de texto, adjuntar y enviar.

**Comportamiento local observado:** la función `sendMessage()` agrega al DOM una burbuja con el texto escrito y limpia el campo; Enter también invoca el envío. No se observa transporte a servidor, almacenamiento persistente, sincronización entre participantes ni envío real de adjuntos. El botón de adjuntar y las opciones no tienen comportamiento implementado.

**Capacidad proyectada:** intercambiar mensajes asociados a un evento, consultar historial y habilitar adjuntos o gestión del grupo según permisos. Una integración futura necesitará persistencia y actualización en tiempo real o consulta periódica.

### 3.7 Perfil — `menuPerfil.html`

**Interfaz presente:** portada y avatar como placeholders, nombre/edad, ubicación, biografía, intereses, insignias, tarjetas de eventos, botones Editar Perfil, Configuración y Cerrar Sesión, además de navegación inferior.

**Capacidad proyectada:** consultar y editar identidad, biografía, ubicación e intereses; mostrar actividad e insignias; gestionar preferencias y cerrar sesión. En esta vista no hay formularios ni listeners asociados a esos botones y los datos están escritos directamente en el HTML.

### 3.8 Detalle de evento — `habilitarRegistro.html`

**Interfaz presente:** imagen placeholder, título, fecha/hora, ubicación y enlace “Ver en mapa”, organizador con valoración, asistentes y botones “Unirme al evento” y “Chat del Grupo (Abierto)”.

**Capacidad proyectada:** consultar la ficha completa, unirse o abandonar, abrir la ubicación y acceder al chat si corresponde. Los botones usan `href="#"`; no se implementa inscripción ni navegación real. Esta pantalla complementa el flujo de Explorar aunque el nombre del archivo no describe su contenido.

## 4. Flujos de navegación e interacción

Los enlaces de barra inferior presentes conectan las páginas principales mediante rutas HTML estáticas: Explorar → `menuExplorar.html`, Mis Eventos → `menuRegistro.html`, Crear → `crearEvento.html`, Mensajes → `menuChat.html` y Perfil → `menuPerfil.html`. La clase `active` identifica visualmente la sección seleccionada. El acceso desde el login es una excepción: su redirección apunta a `explorar.html`, archivo que no está en el directorio.

### 4.1 Recorrido de exploración

1. El usuario accede a Explorar desde la navegación inferior.
2. Visualiza el buscador, las categorías, las tarjetas de ejemplo y el área reservada al mapa.
3. Al pulsar filtros se abre la hoja inferior sobre el overlay.
4. Puede cambiar la distancia y alternar visualmente opciones de grupo, fecha, precio y categoría.
5. Puede restablecer el slider o cerrar la hoja. En una integración futura, “Aplicar filtros” y “Mostrar resultados” deberán confirmar criterios y actualizar el mapa/listado.
6. “Ver detalles” sugiere el paso a la ficha; actualmente no hay vínculo funcional declarado desde las tarjetas.

### 4.2 Creación de evento

1. El usuario entra a Crear desde la barra inferior.
2. Completa título y descripción, selecciona categoría y fecha/hora, e indica ubicación.
3. La interfaz reserva un área para ubicar el evento en un mapa y presenta un contador de asistentes.
4. “Publicar Evento” representa el cierre del flujo previsto. La validación y publicación requieren implementación futura.

### 4.3 Eventos y chat

1. En Mis Eventos, Próximos e Historial alternan las vistas locales.
2. La tarjeta con chat activo sugiere el acceso a una conversación; el prototipo muestra el destino de chat separado en `menuChat.html`, pero no conecta estos botones.
3. En el chat se puede escribir texto y observar una burbuja insertada localmente. Otros usuarios no reciben el mensaje.

### 4.4 Perfil y sesión

Desde Perfil se consultan los datos de muestra y se presentan acciones de edición, configuración y cierre. Esas acciones todavía no cambian de pantalla ni actualizan información. El único flujo de sesión con código es el intento de login en `menuLogin.html`; no se implementa cierre de sesión en Perfil.

## 5. Requerimientos de integración futura — hoja de ruta técnica

### 5.1 Capa cliente

- Consolidar nombres de rutas y navegación, especialmente `explorar.html` frente a `menuExplorar.html` y `habilitarRegistro.html` frente a su función de detalle.
- Separar JavaScript de los documentos HTML y convertir formularios, controles y acciones en componentes con estados accesibles y validaciones explícitas.
- Definir un modelo de estado de cliente para filtros, sesión, evento seleccionado y formularios; decidir qué estado es temporal y cuál proviene del servidor.
- Añadir estados de carga, error, éxito y vacío para operaciones remotas. Etiquetar controles, soportar teclado y lector de pantalla y revisar contraste/tamaño táctil.
- Normalizar variables de diseño entre hojas CSS para evitar que cada pantalla redefina de forma divergente colores y tokens.

### 5.2 Backend y persistencia

Se requiere una API cliente-servidor sobre HTTPS y una base de datos para cuentas, perfiles, eventos, inscripciones, categorías, ubicaciones, mensajes y, si aplica, insignias. La API deberá establecer contratos versionados para autenticación, consulta/búsqueda de eventos, filtros, creación/edición, inscripción, listados personales, chat y perfil.

La autenticación debe definir sesiones o tokens, expiración, recuperación de contraseña y autorización por recurso. El servidor debe validar los datos aunque el cliente también realice validaciones, aplicar controles de acceso y proteger datos personales. Para el chat se requiere persistencia, autorización de participantes y un mecanismo de actualización en tiempo real (por ejemplo, WebSocket) o una alternativa documentada.

### 5.3 Mapas y geolocalización

El HTML deja contenedores para mapa, pero no carga Google Maps. Si se elige Google Maps Platform, la integración requerirá habilitar los productos adecuados (Maps JavaScript API y, según el flujo, Places API y servicios de geocodificación), crear y restringir una clave por dominio/API, configurar facturación y políticas de uso, y gestionar consentimiento y permisos antes de acceder a la ubicación del dispositivo.

La búsqueda por radio requerirá coordenadas normalizadas y una consulta geoespacial en el servidor o en un servicio de datos compatible. La ubicación escrita debe resolverse a coordenadas; el mapa y los marcadores deben reflejar el resultado autorizado. No debe suponerse una ubicación del usuario hasta que conceda permiso.

### 5.4 Secuencia sugerida de implementación

1. **Cerrar el contrato de producto:** rutas, categorías, reglas de filtros, cupos, estados del evento y disponibilidad del chat.
2. **Diseñar API y datos:** esquemas, autenticación, validaciones, permisos y almacenamiento geográfico.
3. **Conectar acceso y perfil:** eliminar endpoint provisional, implementar flujo de sesión y edición con manejo seguro de errores.
4. **Implementar eventos:** búsqueda, filtros, mapa, detalle, creación, publicación e inscripción.
5. **Implementar Mis Eventos y chat:** listas derivadas de participaciones/organización, permisos, persistencia y actualización de mensajes.
6. **Endurecer y desplegar:** configuración por entorno, secretos fuera del código cliente, monitoreo, pruebas de integración, accesibilidad y revisión de privacidad.

La arquitectura futura puede organizarse como cliente web móvil estático servido por HTTPS, API de aplicación, almacenamiento persistente y proveedores externos de mapas y mensajería/notificaciones cuando sean necesarios. La selección concreta de framework, proveedor de nube y motor de base de datos no está determinada por los archivos actuales y debe tomarse como decisión de proyecto.

## 6. Consideraciones finales

VToConnect ya comunica con claridad una arquitectura de vistas centrada en descubrir actividades, organizarlas y facilitar la interacción grupal. La implementación actual sirve para validar disposición y recorrido visual, y contiene pequeñas interacciones locales. Para convertir esa propuesta en un producto funcional hacen falta contratos de datos, navegación consistente, servicios de aplicación y las integraciones descritas; mientras tanto, las acciones que dependen de usuarios, eventos o comunicación deben considerarse proyecciones de diseño.
