# Inventrex — Contexto del proyecto

**Inventrex** es una aplicación móvil híbrida para gestionar inventarios de bodega, desarrollada con React Native y Expo para la asignatura *Aplicaciones Móviles Híbridas* (ULEAM, Facultad de Ciencias de la Vida y Tecnología), con el Ing. Jr Zamora como docente.

Este documento explica para qué sirve la app, cómo está organizada, cómo fluye la navegación y qué hace cada pantalla por dentro. Las reglas de negocio en detalle están en [`LOGICA_DE_NEGOCIO.md`](./LOGICA_DE_NEGOCIO.md).

---

## 1. Finalidad

La app está pensada para el personal que hace conteos físicos de inventario en bodegas. En un conteo hay tres cosas que normalmente se pierden en papel: el tiempo disponible para terminar, las diferencias entre lo que hay físicamente y lo que dice el sistema (discrepancias), y los productos que aparecen dañados o vencidos durante el conteo. Inventrex reúne todo eso en el teléfono.

Con la app, el usuario inicia sesión, ve un resumen del día (quién está a cargo y en qué horario), revisa los inventarios de cada bodega con su porcentaje de discrepancia y el tiempo que le queda, reporta productos defectuosos adjuntando una foto como evidencia y consulta el estado de las revisiones que hacen los jefes de bodega.

Hoy el proyecto es un **prototipo funcional de frontend**: las pantallas, la navegación y la lógica de formularios funcionan, pero los datos son de ejemplo y viven en memoria. No hay backend ni base de datos todavía.

---

## 2. Tecnologías

| Tecnología | Versión | Para qué se usa |
|---|---|---|
| Expo | ~57.0 | Entorno de desarrollo, ejecución en Expo Go y empaquetado |
| React Native | 0.86.3 | Componentes nativos (`View`, `Text`, `TextInput`, `Pressable`, `Image`, `ScrollView`, `FlatList`) |
| React | 19.2.3 | Componentes funcionales y Hooks (`useState`) |
| expo-image-picker | ~57.0 | Tomar fotos con la cámara o elegirlas de la galería |
| expo-location | ~57.0 | Obtener la ubicación GPS al reportar un defecto |
| expo-sensors | ~57.0 | Leer el acelerómetro para detectar movimientos bruscos |
| react-native-web | ^0.21 | Permite abrir la app en el navegador (`npm run web`) |
| StyleSheet | (React Native) | Estilos de cada pantalla |

El lenguaje es JavaScript con JSX. No se usa TypeScript ni librerías de navegación.

---

## 3. Estructura de carpetas

```
primera-app-movil/
├── index.js                  Punto de entrada: registra App en Expo
├── App.js                    Componente raíz: login + navegación entre pantallas
├── app.json                  Configuración de Expo (nombre, íconos, orientación)
├── package.json              Dependencias y scripts
├── docs/                     Documentación: README, este archivo, lógica de negocio y guía de Figma
├── assets/                   Íconos y splash de la app
└── src/
    ├── theme.js              Paleta de colores y estilos de vidrio compartidos
    ├── components/
    │   ├── fondo.jsx         Fondo con manchas de color detrás del vidrio
    │   ├── menuInferior.jsx  Barra de navegación inferior flotante (4 opciones)
    │   └── titulo.jsx        Encabezado reutilizable (título + subtítulo)
    └── screens/
        ├── loginScreen.jsx     Inicio de sesión
        ├── inicioScreen.jsx    Dashboard / resumen del día
        ├── solicitudScreen.jsx Inventarios (componente InventarioScreen)
        ├── reporteScreen.jsx   Reporte de productos defectuosos con foto
        ├── perfilScreen.jsx    Gestión de revisiones (componente GestionScreen)
        └── CreateProfile.jsx   Prototipo de perfil (no conectado)
```

Ojo con los nombres: `solicitudScreen.jsx` contiene la pantalla de **Inventarios** y `perfilScreen.jsx` contiene la pantalla de **Gestión**. Los nombres de archivo vienen de una versión anterior del proyecto y no se renombraron.

---

## 4. Cómo arranca la app

```
index.js
 └─ registerRootComponent(App)
     └─ App.js
         ├─ usuarioAutenticado === false  →  <LoginScreen onLogin={...} />
         └─ usuarioAutenticado === true
             ├─ pantalla según pantallaActual:
             │    'inicio'     →  <InicioScreen />      (por defecto)
             │    'inventario' →  <InventarioScreen />  (solicitudScreen.jsx)
             │    'reporte'    →  <ReporteScreen />     (reporteScreen.jsx, recibe los reportes)
             │    'gestion'    →  <GestionScreen />     (perfilScreen.jsx)
             ├─ <Fondo />         (manchas de color detrás de todo)
             └─ <MenuInferior />  (flotante, siempre visible abajo)
```

`index.js` solo registra el componente `App` para que Expo lo ejecute. Todo lo demás se decide en `App.js` con dos estados:

| Estado | Valor inicial | Qué controla |
|---|---|---|
| `usuarioAutenticado` | `false` | Si se muestra el login o la app completa |
| `pantallaActual` | `'inicio'` | Qué pantalla se dibuja encima del menú |
| `reportes` | 2 reportes de ejemplo | Lista de reportes de defectos; vive aquí para no perderse al cambiar de pantalla |

---

## 5. Lógica de navegación

La app **no usa React Navigation ni Expo Router**. La navegación se resuelve con *renderizado condicional*: `App.js` guarda el nombre de la pantalla actual en un estado y, con un `if / else if`, decide qué componente dibujar.

Los componentes hijos no cambian de pantalla por su cuenta; **avisan al padre** mediante funciones que reciben por props. A esto se le llama *levantar el estado* (lifting state up):

- `LoginScreen` recibe `onLogin`. Cuando las credenciales son correctas, llama a `onLogin()` y `App` cambia `usuarioAutenticado` a `true`.
- `MenuInferior` recibe `cambiarPantalla` (que es `setPantallaActual`) y `pantallaActual`. Cada botón llama a `cambiarPantalla('inventario')`, `cambiarPantalla('reporte')`, etc., y usa `pantallaActual` para resaltar el botón activo con el patrón `[styles.boton, activo && styles.botonActivo]`.

| Opción del menú | Ruta que envía | Pantalla |
|---|---|---|
| Inicio | `'inicio'` | Inicio |
| Inventario | `'inventario'` | Inventarios |
| Reportes | `'reporte'` | Reportar defecto |
| Gestión | `'gestion'` | Gestión |

Este enfoque es simple y fácil de seguir, pero tiene límites: no hay historial (el botón *atrás* de Android cierra la app), no hay animaciones de transición y no se pueden pasar parámetros entre pantallas. Por eso, por ejemplo, "Ver detalles" en una tarjeta de inventario todavía no puede abrir el detalle de esa bodega. Cuando el proyecto lo necesite, el siguiente paso natural es migrar a React Navigation o Expo Router.

Otro efecto importante: como solo se dibuja **una** pantalla a la vez, al cambiar de pestaña la pantalla anterior se *desmonta* y su estado (`useState`) se pierde. Por eso la lista de reportes se guarda en `App.js` y se pasa a `ReporteScreen` por props: `App` nunca se desmonta, así que los reportes sobreviven al cambio de pestaña. Lo que sí se pierde es un formulario a medio llenar.

---

## 6. Pantallas

### 6.1 Login — `loginScreen.jsx`

Es la primera pantalla. Muestra el nombre **Inventrex**, un lema, los campos de correo y contraseña y el botón *Iniciar Sesión*.

Guarda en estado lo que escribe el usuario (`correo`, `clave`). Al presionar el botón, `iniciarSesion()` primero verifica que ningún campo esté vacío y después compara contra credenciales de prueba escritas en el código:

```
Correo:     estudiante@uleam.edu.ec
Contraseña: 123456
```

Si coinciden, llama a `onLogin()` y la app pasa a la pantalla de Inicio; si no, muestra un aviso. La autenticación es solo local, de demostración.

### 6.2 Inicio — `inicioScreen.jsx`

Es el dashboard que aparece después del login. Arriba tiene el título, un subtítulo y un botón circular negro con las iniciales *JP* (todavía sin acción). Debajo hay una cuadrícula de 2×2 con tres métricas —inventarios seguidos (2), normales (3) y concretados (4)— y una tarjeta oscura de *Más información* con un botón rojo. Al final, la sección **Información Hoy** muestra quién está a cargo (Pacheco Chalen Jose David) y la ventana horaria del día (8:00 AM – 2:00 PM).

No tiene estado ni lógica: todos los datos son fijos. Su propósito es darle al usuario el contexto del día antes de empezar a contar.

### 6.3 Inventarios — `solicitudScreen.jsx` (componente `InventarioScreen`)

Es la pantalla central del trabajo de conteo y tiene tres bloques.

El **cronómetro compacto**, en una tarjeta de vidrio oscuro, muestra el tiempo disponible (2h 15m) con una barra de progreso roja. El ancho de la barra se calcula sobre una jornada de 8 horas:

```js
porcentajeTiempo = (horas * 60 + minutos) / (8 * 60) * 100   // 135 / 480 ≈ 28 %
```

Debajo está el botón **+ Crear Inventario** (todavía sin acción) y, por último, una **cuadrícula de 2 columnas** con una tarjeta por bodega (Bodega A, Bodega B, Almacén C, Oficina D). Cada tarjeta muestra el nombre, la fecha, el porcentaje de discrepancia con su barra, los productos contados, la categoría y el enlace *Ver detalles →*.

El color de la barra de discrepancia lo decide `getDiscrepancyColor(valor)`:

| Discrepancia | Color | Significado |
|---|---|---|
| menor a 10 % | negro `#0a0a0a` | Conteo aceptable |
| de 10 % a 19 % | rojo claro `#f87171` | Requiere revisión |
| 20 % o más | rojo `#dc2626` | Diferencia crítica |

Los inventarios están en un arreglo dentro de `useState` y se dibujan con `.map()`. La pantalla también define una función `obtenerUbicacion` que todavía no está conectada a ningún botón (ver sección 11).

### 6.4 Reportar defecto — `reporteScreen.jsx` (componente `ReporteScreen`)

Permite registrar un producto del inventario que está dañado, vencido o incompleto, con una foto como evidencia. El formulario sigue este orden:

1. **Producto**: se elige de una lista de chips (Monitor LED 24", Camiseta algodón, Caja de cereal, Resma de papel), cada uno con su código y bodega.
2. **Tipo de defecto**: Dañado, Vencido, Incompleto u Otro.
3. **Descripción**: texto libre de varias líneas.
4. **Evidencia fotográfica**: botones *Tomar foto* y *Galería*, con vista previa y opción de quitar la imagen.
5. **Enviar reporte**.

Las dos funciones de foto siguen el mismo patrón con `try / catch`: piden permiso (`requestCameraPermissionsAsync` o `requestMediaLibraryPermissionsAsync`); si se niega, avisan y salen; si se concede, abren la cámara o la galería (`launchCameraAsync` / `launchImageLibraryAsync`) con recorte 4:3 y calidad 0.8; y si el usuario no cancela, guardan la URI de la imagen en el estado `imagen`.

`enviarReporte()` valida dos cosas: que estén elegidos el producto y el tipo y que haya descripción, y que exista una foto. Si todo está bien, crea un objeto como este:

```js
{
  id: 1739999999999,          // Date.now()
  codigo: "REP-003",          // correlativo según la cantidad de reportes
  producto: "Caja de cereal",
  tipo: "Vencido",
  descripcion: "Lote con fecha de caducidad pasada.",
  imagen: "file:///.../foto.jpg",
  fecha: "15/10/2026",
  estado: "En revisión",
}
```

Lo agrega al inicio de la lista, limpia el formulario y confirma el envío. Debajo del formulario, **Reportes enviados** muestra cada reporte en una tarjeta con su código, un badge de estado (Aprobado en negro, En revisión en rojo, cualquier otro en gris), el producto, el tipo, la descripción, la miniatura de la foto y la fecha.

| Estado | Contenido |
|---|---|
| `productoSeleccionado` | Objeto del producto elegido o `null` |
| `tipoDefecto` | Texto del tipo elegido |
| `descripcion` | Texto del campo de descripción |
| `imagen` | URI de la foto o `null` |
| `reportes` / `setReportes` | Llegan por props desde `App.js` (la lista empieza con 2 de ejemplo) |

La pantalla tiene además dos funciones con sensores:

- **Obtener ubicación** pide permiso de ubicación y, con `expo-location`, muestra la latitud, la longitud y la precisión aproximada. Por ahora esa ubicación no se guarda en el reporte.
- **Detector de movimiento** lee el acelerómetro cada 500 ms con `expo-sensors` y muestra *Movimiento detectado* cuando la aceleración cambia más de 0,35 g entre dos lecturas. En el navegador no está disponible.

Su lógica está detallada en `LOGICA_DE_NEGOCIO.md` (reglas RN-17 y RN-18).

Los reportes viven en `App.js`, así que **se conservan al cambiar de pestaña**, pero todavía se pierden al recargar la app. Para guardarlos de forma permanente haría falta AsyncStorage o un backend.

### 6.5 Gestión — `perfilScreen.jsx` (componente `GestionScreen`)

Se abre con la opción *Gestión* del menú. Es la vista de supervisión: muestra las revisiones de inventario hechas en cada bodega.

Arriba tiene el botón negro **Ver todas las bodegas** y, debajo, una lista (`FlatList` con `scrollEnabled={false}` dentro de un `ScrollView`) con una tarjeta por inventario gestionado. Cada tarjeta indica el nombre y la fecha, un badge de estado (**Revisado** en negro o **Pendiente** en rojo, según `getEstadoEstilo`), el jefe de bodega responsable, las observaciones de la revisión y el botón **Ver ubicación en mapa →**. Los botones todavía no tienen acción y los datos son de ejemplo.

### 6.6 CreateProfile — `CreateProfile.jsx` (no conectada)

Es un prototipo para crear el perfil del usuario con nombre, descripción y foto. **No está importado en `App.js`**, así que no se puede abrir desde la app. Además tiene errores que impedirían usarlo: no importa `TextInput`, usa `result.cancelled` y `result.uri` (en la versión actual de expo-image-picker son `result.canceled` y `result.assets[0].uri`) y referencia estilos que no existen (`form`, `input`, `boton`, `textBoton`).

---

## 7. Componentes reutilizables

| Componente | Props | Uso |
|---|---|---|
| `MenuInferior` | `pantallaActual`, `cambiarPantalla` | Barra flotante de navegación; marca la opción activa con un punto rojo |
| `Titulo` | `texto`, `subtitulo` (opcional) | Encabezado de pantalla; el subtítulo solo aparece si se pasa. Lo usa `ReporteScreen` |
| `Fondo` | — | Capa detrás de todas las pantallas con manchas de color difuminadas que se ven a través del vidrio |

Las demás pantallas dibujan su propio encabezado con estilos `titulo` y `subtitulo`, en lugar de usar `Titulo`.

`src/theme.js` no es un componente: exporta `colores` (la paleta) y los estilos base `vidrio` y `vidrioOscuro`, que cada pantalla reutiliza con `...vidrio` dentro de su `StyleSheet`.

---

## 8. Manejo de datos

Todos los datos son de ejemplo y se definen con `useState` dentro de cada pantalla. No hay backend, base de datos ni almacenamiento local, por lo que cualquier cambio desaparece al recargar. Los reportes son una excepción parcial: viven en `App.js` y por eso sobreviven al cambio de pestaña.

Además, las pantallas no comparten datos entre sí: los productos de *Reportar defecto* no están conectados con los inventarios de la pantalla *Inventarios*, ni los reportes aparecen en *Gestión*. Unificar esa información (un único listado de productos y bodegas, por ejemplo en `App.js` o en un backend) es lo que convertiría el prototipo en un sistema conectado.

---

## 9. Sistema visual

La interfaz sigue la regla **60-30-10** con tres colores, blanco, negro y rojo, y un estilo **glassmorphism** (superficies de vidrio translúcido).

| Proporción | Color | Dónde se usa |
|---|---|---|
| 60 % | Blanco (`#ffffff`, fondo `#f4f4f5`) | Fondo de la app, tarjetas de vidrio y campos de texto |
| 30 % | Negro (`#0a0a0a`) y sus grises (`#3f3f46`, `#71717a`, `#e4e4e7`) | Texto, menú inferior, cronómetro, chips seleccionados, botones secundarios y badges *Aprobado* / *Revisado* |
| 10 % | Rojo (`#dc2626`, con `#f87171` y rojo al 10 % como variantes) | Botones de acción principal (*Iniciar Sesión*, *Crear Inventario*, *Enviar reporte*), opción activa del menú, progreso del cronómetro, discrepancias altas y estados *En revisión* / *Pendiente* |

El rojo se reserva para lo que pide acción o atención; por eso botones como *Ver todas las bodegas* o *Tomar foto* son negros.

El efecto de vidrio sale de `src/theme.js` y `src/components/fondo.jsx`. Las tarjetas son blanco semitransparente (`rgba(255, 255, 255, 0.55)`) con un borde blanco de 1 px y una sombra muy suave. El cronómetro y la tarjeta *Más información* usan una variante oscura (`rgba(10, 10, 10, 0.88)`). Detrás de todo hay un fondo con manchas rojas y grises difuminadas que se ven a través de las tarjetas.

React Native no tiene desenfoque de fondo nativo (*backdrop blur*), así que cada mancha se dibuja con siete círculos concéntricos de baja opacidad que simulan un degradado radial. Por la misma razón, el menú inferior es negro opaco: con transparencia, el texto que pasaba por debajo se veía a través.

Las tarjetas usan radio de borde de 20, los chips y campos de 14 y los botones de 14 a 16. Los emojis se reemplazaron por texto (y por las iniciales *JP* en el perfil) porque sus colores rompían la paleta. Los botones principales se encogen levemente al presionarlos (`transform: [{ scale: 0.98 }]`).

---

## 10. Cómo ejecutar

```bash
npm install
npx expo start -c
```

Escanea el código QR con **Expo Go** en el teléfono e inicia sesión con `estudiante@uleam.edu.ec` / `123456`. La cámara y los avisos (`Alert`) funcionan mejor en un teléfono físico. También se puede abrir en el navegador con `npm run web`, pero ahí `Alert.alert` no muestra nada y la cámara depende del navegador.

---

## 11. Estado actual y pendientes

| Elemento | Situación |
|---|---|
| Login, navegación y las 4 pantallas principales | Funcionando con datos de ejemplo y el diseño glassmorphism |
| Reporte de defectos con foto | Funcionando; los reportes se conservan al cambiar de pestaña, pero no al recargar |
| *Crear Inventario*, *Ver detalles*, *Más información*, perfil de Inicio, *Ver ubicación en mapa*, *Ver todas las bodegas* | Botones visibles sin acción todavía |
| Ubicación GPS del reporte | Se muestra, pero no se guarda en el reporte ni se limpia al enviar |
| `obtenerUbicacion` en `solicitudScreen.jsx` | Sin conectar y con errores: usa `PermissionStatus.status` (no definido), no importa `Alert` y no corta con `return` si se niega el permiso |
| Jornada del cronómetro | Inicio indica una ventana de 6 h (8:00 AM – 2:00 PM), pero el cronómetro calcula sobre 8 h |
| `CreateProfile.jsx` | No conectada y con errores (ver 6.6) |
| Nombres de archivo que no coinciden con la pantalla | `solicitudScreen` → Inventarios, `perfilScreen` → Gestión |

Ya resueltos: el `<strong>` del login, que fallaba en Android/iOS, ahora es un `<Text>` anidado; los avisos del login usan `Alert.alert` para mostrar título y mensaje; y se quitaron los estados e imports sin uso de `solicitudScreen.jsx`.

El detalle de estas brechas, con su impacto y la recomendación para cada una, está en `LOGICA_DE_NEGOCIO.md` (sección 10.2).

Los siguientes pasos naturales para el proyecto son persistir los datos (AsyncStorage o un backend como Firebase o Supabase), unificar productos, inventarios y reportes en una sola fuente de datos, migrar la navegación a React Navigation para tener historial y pantallas de detalle, y dar acción a los botones pendientes, empezando por *Ver detalles* y *Crear Inventario*.
