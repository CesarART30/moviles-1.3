# Inventrex — Guía de diseño para Figma

> **Para el modelo que va a diseñar:** este documento es tu especificación completa. Construye en Figma la app móvil **Inventrex** siguiendo exactamente los tokens, componentes, pantallas y reglas de negocio de abajo. No inventes pantallas, textos, colores ni funciones que no estén aquí. Si algo no está especificado, elige la opción más simple que respete la paleta 60-30-10 y el estilo glassmorphism, y anótalo en la página *Notas* del archivo.
>
> **Versión 2:** agrega el rol de administrador y 16 pantallas nuevas: 3 del operador (sección 7) y 13 del administrador (sección 8). Las secciones 6.1 a 6.5 ya incluyen los cambios que esas pantallas provocan en las existentes.

---

## 0. Instrucciones de trabajo

1. Crea primero los **fundamentos** (variables de color, estilos de texto y estilos de efecto), después los **componentes** con sus variantes y, al final, las **pantallas** usando solo esos componentes.
2. Usa **Auto Layout** en todo: tarjetas, botones, listas, encabezados y pantallas completas. Nada posicionado a mano excepto el fondo y el menú flotante.
3. Copia los textos **literalmente** como aparecen en esta guía, con mayúsculas, tildes y signos incluidos.
4. Diseña cada pantalla en un frame de **390 × 844** (iPhone 14/15). Si el contenido es más largo, alarga el frame y deja el menú inferior fijo (*Fix position when scrolling*).
5. Nombra capas y componentes en español y con los mismos nombres que usa el código (ver sección 7), para que diseño y código se correspondan 1 a 1.
6. Arma el prototipo con las interacciones de la sección 5 y de cada pantalla.
7. Construye las pantallas nuevas (secciones 7 y 8) después de las existentes, reutilizando los componentes. Los componentes nuevos están en las secciones 4.10 a 4.26.

---

## 1. Contexto del producto

Inventrex es una app para el personal que hace **conteos físicos de inventario en bodegas**. Le permite:

- ver el resumen del día (quién está a cargo y en qué horario);
- controlar el tiempo disponible para terminar el conteo;
- revisar la discrepancia de cada bodega (diferencia entre lo contado y lo registrado);
- reportar productos defectuosos con una foto como evidencia;
- supervisar las revisiones hechas por los jefes de bodega;
- contar productos y obtener solos los faltantes y sobrantes frente al sistema;
- asignar ubicaciones a los productos escaneando sus códigos de barras;
- ver el mapa interno de cada bodega con el estado de cada estante;
- en el caso del administrador: programar conteos, aprobar ajustes de stock y reportes, y administrar productos, usuarios y bodegas.

La app tiene **dos roles** (sección 5): el **operador**, que cuenta y reporta, y el **administrador**, que programa, revisa y aprueba. Hay 5 pantallas actuales del operador (sección 6), 3 pantallas nuevas del operador (sección 7) y 13 del administrador (sección 8). Cada rol navega con su propio **menú inferior de 4 pestañas**.

---

## 2. Reglas de diseño (obligatorias)

### 2.1 Regla 60-30-10

La paleta tiene solo **tres colores**: blanco, negro y rojo, más los grises que derivan del negro.

| Proporción | Color | Uso permitido |
|---|---|---|
| **60 %** | Blanco | Fondo de pantalla, tarjetas de vidrio, campos de texto, chips sin seleccionar |
| **30 %** | Negro y grises | Todo el texto, menú inferior, tarjeta del cronómetro, tarjeta *Más información*, chips seleccionados, botones secundarios, avatar, badges *Aprobado* / *Revisado* |
| **10 %** | Rojo | Solo: botón de acción principal de cada pantalla, punto de la pestaña activa, barra de progreso del cronómetro, discrepancias de 10 % o más (barras, textos y estantes del mapa), badges *En revisión*, *Pendiente*, *Faltante*, *Por revisar* y *Bajo mínimo*, puntos de aviso de los KPI del Panel, línea del escáner, borde de un campo obligatorio vacío, textos *Quitar imagen*, *Cerrar sesión*, *Desactivar* y *Cancelar conteo*, la acción irreversible de una alerta, acentos del login (punto del logo y frase resaltada) y las manchas del fondo |

Si un elemento no está en la lista del rojo, **no puede ser rojo**. Ante la duda, usa negro.

### 2.2 Estilo glassmorphism

- Las superficies son **vidrio translúcido**: relleno blanco al 55 %, borde blanco fino, sombra muy suave y desenfoque de fondo.
- Detrás de todo hay un **fondo con manchas difuminadas** rojas y grises que se ven a través del vidrio. Sin ese fondo el efecto no existe.
- Hay una variante de **vidrio oscuro** (negro al 88 %) para el cronómetro y la tarjeta *Más información*.
- El **menú inferior es negro sólido**. En la app, el texto que pasaba por debajo se veía a través del menú, así que no lleva transparencia.

### 2.3 Prohibido

- Colores fuera de la sección 3.1 (nada de azul, verde ni ámbar).
- **Emojis e íconos.** La app usa solo texto, las iniciales de los avatares (*JP*, *AD*) y estos signos tipográficos: ← → ✕ ✓ + − ▾ •. No agregues íconos.
- Degradados, salvo los de las manchas del fondo.
- Sombras duras u oscuras.
- Cambiar textos, agregar pantallas o agregar funciones que no estén en esta guía.

---

## 3. Fundamentos (tokens)

### 3.1 Variables de color

Crea una colección de variables llamada **`colores`** con estos nombres exactos (son los del archivo `src/theme.js`):

| Variable | Valor | Rol |
|---|---|---|
| `blanco` | `#FFFFFF` | Texto sobre negro o rojo, base del vidrio |
| `fondo` | `#F4F4F5` | Color base de todas las pantallas |
| `negro` | `#0A0A0A` | Texto principal, menú, botones oscuros, chips activos |
| `grisOscuro` | `#3F3F46` | Texto secundario fuerte (descripciones, etiquetas de formulario) |
| `gris` | `#71717A` | Texto terciario (subtítulos, fechas, códigos, eyebrows, placeholders) |
| `grisClaro` | `#E4E4E7` | Bordes de inputs, badge por defecto |
| `rojo` | `#DC2626` | Acento principal |
| `rojoClaro` | `#F87171` | Discrepancia media (10 % a 19 %) |
| `rojoSuave` | `#DC2626` al 10 % | Fondo de badges *En revisión* / *Pendiente* |

Colores auxiliares (no son variables; aplícalos como relleno con opacidad):

| Uso | Valor |
|---|---|
| Divisores y bordes internos sobre vidrio claro | `#0A0A0A` al 6 % |
| Pista de barra de progreso sobre vidrio claro | `#0A0A0A` al 8 % |
| Pista de barra de progreso sobre vidrio oscuro | `#FFFFFF` al 12 % |
| Texto secundario sobre negro | `#FFFFFF` al 50–60 % |
| Pestaña activa del menú (fondo) | `#FFFFFF` al 8 % |

### 3.2 Estilos de efecto

| Estilo | Relleno | Borde | Efectos |
|---|---|---|---|
| **Vidrio/Claro** | `#FFFFFF` 55 % | 1 px interior, `#FFFFFF` 90 % | Drop shadow X 0, Y 8, Blur 20, `#0A0A0A` 6 % + **Background blur 20** |
| **Vidrio/Oscuro** | `#0A0A0A` 88 % | 1 px interior, `#FFFFFF` 10 % | Drop shadow X 0, Y 10, Blur 24, `#0A0A0A` 20 % + **Background blur 20** |
| **Menú** | `#0A0A0A` 100 % | 1 px interior, `#FFFFFF` 10 % | Drop shadow X 0, Y 10, Blur 24, `#0A0A0A` 20 % |
| **Sombra/BotónRojo** | — | — | Drop shadow X 0, Y 8, Blur 16, `#DC2626` 30 % |

> En el código, el desenfoque de fondo se simula porque React Native no lo trae de forma nativa. En Figma usa el **Background blur** real: es la intención del diseño.

### 3.3 Fondo de pantalla (componente `Fondo`)

Cada frame de pantalla tiene, detrás de todo y fijo (no se desplaza con el scroll):

1. Rectángulo de 390 × 844 con relleno `fondo` (`#F4F4F5`).
2. Tres elipses con **degradado radial**, del color en el centro a 0 % en el borde, recortadas por el frame:

| Mancha | Tamaño | Posición (x, y) en el frame | Color central |
|---|---|---|---|
| Roja grande | 360 × 360 | (150, −140), sale por arriba a la derecha | `#DC2626` 16 % |
| Gris | 300 × 300 | (−150, 260), sale por la izquierda | `#0A0A0A` 9 % |
| Roja chica | 260 × 260 | (210, 644), sale por abajo a la derecha | `#DC2626` 12 % |

Conviértelo en un componente **`Fondo`** y úsalo en las 5 pantallas.

### 3.4 Tipografía

Usa **Inter**, la más cercana a la fuente del sistema que usa la app. Crea estos estilos de texto:

| Estilo | Tamaño / Peso | Interletrado | Uso |
|---|---|---|---|
| `Logo` | 44 / ExtraBold (800) | −1.5 px | "Inventrex" en el login |
| `H1` | 30 / ExtraBold (800) | −0.5 px | Título de cada pantalla |
| `Métrica` | 36 / ExtraBold (800) | −1 px | Números de Inicio |
| `Cronómetro` | 28 / ExtraBold (800) | −0.5 px | "2h 15m" |
| `Discrepancia` | 22 / ExtraBold (800) | −0.5 px | "15%" en tarjetas de inventario |
| `H2` | 20 / ExtraBold (800) | −0.3 px | "Reportes enviados" |
| `Lema` | 20 / SemiBold (600), alto de línea 28 | 0 | Frase del login |
| `Destacado` | 17 / Bold (700) | 0 | Nombre del responsable y horario en Inicio |
| `TítuloTarjeta` | 16 / Bold (700) | 0 | Título de un reporte |
| `Botón` | 15 / Bold (700); 16 en el login | 0 | Texto de botones |
| `Cuerpo` | 14 / Regular (400), alto de línea 20 | 0 | Subtítulos, descripciones, inputs |
| `CuerpoFuerte` | 14 / Bold (700) | 0 | Nombre de bodega, valores de stats, chips |
| `Etiqueta` | 12–13 / SemiBold (600) | 0 | Labels de formulario, texto de métricas, menú |
| `Eyebrow` | 10–12 / Bold (700), MAYÚSCULAS | 1–2 px | "PRODUCTO", "INFORMACIÓN HOY", "JEFE DE BODEGA" |
| `Pequeño` | 11–12 / Regular (400) | 0 | Fechas, códigos, "discrepancia", "Productos" |

Colores de texto: títulos y valores en `negro`; subtítulos, fechas y eyebrows en `gris`; descripciones en `grisOscuro`; sobre negro o rojo, `blanco`.

### 3.5 Espaciado y radios

| Token | Valor |
|---|---|
| Margen lateral de pantalla | 20 |
| Margen superior (debajo de la barra de estado) | 56 |
| Margen inferior (espacio para el menú flotante) | 120 |
| Separación entre título y contenido | 20–24 |
| Gap de la grilla de 2 columnas | 12 |
| Gap entre chips | 8 |
| Gap entre botones en fila | 10 |
| Padding de tarjetas | 14 (inventario), 16 (reporte y gestión), 18 (Inicio y cronómetro) |

| Elemento | Radio |
|---|---|
| Tarjetas de vidrio | 20 |
| Tarjeta de inventario | 18 |
| Formulario del login | 24 |
| Menú inferior | 24 |
| Pestaña activa del menú | 18 |
| Botones grandes (Iniciar conteo, Enviar, Ver todas) | 16 |
| Botón del login, inputs, chips, botones de contorno | 14 |
| Botón *Ver ubicación en mapa*, imagen de vista previa y miniatura | 12 |
| Badges y pill del login | Circular (999) |
| Avatar | Círculo de 48 |

---

## 4. Componentes

Crea cada componente con sus variantes y propiedades. Entre paréntesis va el nombre en el código.

### 4.1 `Boton` (Pressable)

| Variante | Relleno | Texto | Borde / efecto |
|---|---|---|---|
| `Primario` | `rojo` | `blanco`, estilo `Botón` | Sombra/BotónRojo |
| `Oscuro` | `negro` | `blanco`, estilo `Botón` | — |
| `Contorno` | `#FFFFFF` 50–60 % | `negro`, estilo `Botón` | 1.5 px `negro` |

- Padding vertical 15 (Primario y Oscuro), 13 (Contorno) o 11 (*Ver ubicación en mapa*); ancho completo o *fill* dentro de una fila.
- Propiedad `Estado`: `Normal` y `Presionado`. En *Presionado* la opacidad baja al 85 % y la escala al 98 %.

### 4.2 `Input` (TextInput)

- Relleno `#FFFFFF` al 70–75 %, borde 1 px `grisClaro`, radio 14, padding 14 × 12.
- Texto `negro`, 16 en el login y 14 en el resto; placeholder en `gris`.
- Variantes: `Vacío`, `Con texto`, `Multilínea` (alto fijo de 100, texto alineado arriba).
- Encima del input va una etiqueta (`Etiqueta`, `grisOscuro`, margen inferior 6) o un `Eyebrow`, según la pantalla.

### 4.3 `Chip`

- Variante `Normal`: estilo Vidrio/Claro con radio 14, padding 12 × 9 y texto `CuerpoFuerte` en `negro`.
- Variante `Seleccionado`: relleno y borde `negro`, texto `blanco`.
- Propiedad `ConSubtitulo` (sí/no): agrega una segunda línea `Pequeño`, en `gris` si está normal y en `#FFFFFF` 60 % si está seleccionado. Se usa para los productos: "PRD-001 · Bodega A".
- Configúralo como **componente interactivo**: un clic cambia de Normal a Seleccionado.

### 4.4 `Badge`

Pill con padding 10 × 4 y texto 11 / Bold.

| Variante | Fondo | Texto |
|---|---|---|
| `Aprobado` / `Revisado` | `negro` | `blanco` |
| `EnRevision` / `Pendiente` | `rojoSuave` | `rojo` |
| `Defecto` | `grisClaro` | `negro` |

### 4.5 `Tarjeta`

Variantes `Vidrio` (Vidrio/Claro) y `VidrioOscuro` (Vidrio/Oscuro), cada una con un slot de contenido con Auto Layout vertical.

### 4.6 `BarraProgreso`

- Pista de 5–6 px de alto, radio 3; el relleno ocupa un porcentaje del ancho.
- Variante `SobreClaro`: pista `#0A0A0A` 8 % y color de relleno configurable (`negro`, `rojoClaro` o `rojo`).
- Variante `SobreOscuro`: pista `#FFFFFF` 12 % y relleno `rojo`.

### 4.7 `MenuInferior`

- Barra flotante con estilo **Menú**: 16 de margen a izquierda y derecha, 20 sobre el borde inferior, padding 6 y radio 24.
- Cuatro pestañas de igual ancho: **Inicio · Inventario · Reportes · Gestión**.
- Cada pestaña tiene padding vertical 10, un punto de 5 × 5 arriba (margen inferior 5) y la etiqueta 12 / SemiBold.
  - *Inactiva*: punto transparente y texto `#FFFFFF` 50 %.
  - *Activa*: fondo `#FFFFFF` 8 % con radio 18, punto `rojo` y texto `blanco`.
- Crea 4 variantes, una por pestaña activa: `Activa=Inicio | Inventario | Reportes | Gestión`.

### 4.8 `Titulo`

Columna con un `H1` en `negro` y, opcionalmente, un subtítulo `Cuerpo` en `gris` (margen superior 4). Margen inferior del bloque: 24.

### 4.9 Piezas menores

- **`Eyebrow`**: texto en mayúsculas, 11 / Bold, interletrado 1, color `gris`, margen inferior 8.
- **`Avatar`**: círculo de 48 en `negro` con borde de 2 px `#FFFFFF` 90 %, iniciales "JP" en 15 / Bold y `blanco`.
- **`PillMarca`**: Vidrio/Claro con radio 999 y padding 12 × 5, texto "ULEAM · INVENTARIOS" en 10 / Bold, interletrado 2 y color `grisOscuro`.
- **`Divisor`**: línea de 1 px en `#0A0A0A` 6 %.
- **`Alerta`**: diálogo nativo de iOS para representar los avisos de la app. Tarjeta blanca al 90 % con background blur 30, título 17 / SemiBold `negro`, mensaje 13 / Regular `negro` y un botón "OK". Ponlo sobre un velo `#0A0A0A` al 20 %. Es la única pieza con estilo de sistema.

### 4.10 Variantes nuevas de `Boton`

| Variante | Relleno | Texto | Uso |
|---|---|---|---|
| `Deshabilitado` | `grisClaro`, sin sombra | `gris` | Acción no disponible; por ejemplo, *No tienes conteos programados hoy* |
| `Texto` | Sin relleno | 13–15 / Bold, en `negro` o `rojo` | Acciones secundarias en línea. *Cerrar sesión* y *Desactivar* van en `rojo` |

### 4.11 `BotonVolver`

Pill Vidrio/Claro con radio 999 y padding 12 × 6. Texto "← " seguido del nombre de la pantalla de origen, en 13 / Bold `negro` (por ejemplo, "← Inventarios"). Va arriba a la izquierda de todas las subpantallas, 12 px sobre el `Titulo`. Sobre el visor del escáner usa la versión Vidrio/Oscuro con texto `blanco`.

### 4.12 `Stepper` (cantidad)

Fila con un botón circular "−" de 44 (Vidrio/Claro, texto 22 / Bold `negro`), el valor central en 28 / ExtraBold `negro` (centrado, ancho mínimo 72) y un botón circular "+" de 44. Tocar el número abre el teclado numérico. Variantes: `Normal` y `EnMinimo` (el "−" al 40 % de opacidad).

### 4.13 `CampoLectura`

Tarjeta Vidrio/Claro con radio 16 y padding 14: un `Eyebrow` arriba, el valor en 28 / ExtraBold `gris` y la nota "Del sistema" en 11 `gris`. Variante `Oculto`: el valor es "••" y la nota dice "Conteo ciego".

### 4.14 `Segmentado`

Contenedor Vidrio/Claro con radio 14 y padding 4. Las opciones tienen el mismo ancho y texto 13 / SemiBold `grisOscuro`. La opción activa lleva fondo `negro` con radio 10 y texto `blanco`. Úsalo para 2 o 3 opciones; para 4 o más, usa una fila de `Chip` con scroll horizontal.

### 4.15 `FilaLista`

Tarjeta Vidrio/Claro con radio 16, padding 14 y Auto Layout horizontal. A la izquierda, un título en 14 / Bold `negro` y un subtítulo en 12 `gris`. A la derecha, un valor (14 / Bold), un `Badge`, un `Toggle` o una flecha "→" (16 / Bold `negro`).

- `ConMiniatura`: agrega a la izquierda una imagen de 56 × 56 con radio 12.
- `ConCasilla`: agrega una `Casilla` a la izquierda.
- `Compacta`: sin tarjeta propia, para agrupar varias filas dentro de una sola `Tarjeta`, separadas por `Divisor`.

### 4.16 `Toggle`

Pista de 44 × 26 con radio 13 y perilla blanca de 22 con sombra suave. `Apagado`: pista `grisClaro`. `Encendido`: pista `negro`. Un toggle es un estado, no una acción, así que **nunca es rojo**.

### 4.17 `Casilla`

Cuadro de 22 × 22, radio 6 y borde 1.5 `negro`. `Marcada`: relleno `negro` con "✓" en 14 / Bold `blanco`.

### 4.18 `HojaInferior`

Panel anclado abajo, de ancho completo, con radio superior 28, relleno `#FFFFFF` 90 % + Background blur 30 y padding 20 (24 abajo). Arriba lleva una agarradera de 36 × 4 en `#0A0A0A` 15 %. Detrás va un velo `#0A0A0A` 20 % sobre la pantalla.

### 4.19 `Aviso` (toast)

Pill `negro` con padding 16 × 10 y texto 13 / SemiBold `blanco`, centrada 16 px por encima del menú o del borde inferior. Por ejemplo: "Ubicación asignada".

### 4.20 `Alerta`, variante `DosBotones`

Igual que `Alerta` (4.9), con dos botones lado a lado: "Cancelar" (`negro`, Regular) y la acción. Si la acción es irreversible (*Finalizar*, *Aprobar ajuste*, *Aprobar*, *Cerrar sesión*), su texto va en `rojo` y Bold.

### 4.21 `EstadoVacio`

Tarjeta Vidrio/Claro con padding 24 y texto centrado: un título en 15 / Bold `negro` (por ejemplo, "No hay reportes rechazados") y una línea en 13 `gris` que explica cuándo aparecerán datos.

### 4.22 `Estante` (celda del mapa)

Rectángulo de 44 × 30 con radio 8 y la etiqueta "E01" (10 / Bold) al centro.

| Variante | Relleno | Borde | Etiqueta |
|---|---|---|---|
| `SinNovedad` | `negro` | — | `blanco` |
| `Media` (10 % a 19 %) | `rojoClaro` | — | `blanco` |
| `Critica` (20 % o más, o con reporte en revisión) | `rojo` | — | `blanco` |
| `SinContar` | Vidrio/Claro | 1 px `#0A0A0A` 15 % | `negro` |
| `Vacio` | Transparente | 1 px punteado `#0A0A0A` 15 % | `gris` |

Propiedades: `Seleccionado` (anillo exterior de 2 px `negro`, separado 2 px de la celda) y `Atenuado` (opacidad 25 %).

### 4.23 `VisorEscaner`

Área de cámara a pantalla completa: usa una foto oscura de estantes de bodega con un velo `#0A0A0A` 45 %. En el centro va un marco de 260 × 160 formado por cuatro esquinas en L de 24 px (trazo 3 px `blanco`, radio 6). Dentro del marco, una línea horizontal de 2 px en `rojo`; en el prototipo, anímala de arriba abajo con *Smart animate*. Debajo del marco, el texto "Apunta al código de barras" en 14 / SemiBold `blanco` y una pill Vidrio/Oscuro con el paso: "Paso 1 de 2 · Producto".

### 4.24 Variantes nuevas de `Badge`

| Variante | Fondo | Texto | Dónde se usa |
|---|---|---|---|
| `Cuadra` | `negro` | `blanco` | Conteo: contado igual al sistema |
| `Faltante` | `rojoSuave` | `rojo` | Conteo: contado menor que el sistema ("Faltante 6") |
| `Sobrante` | `grisClaro` | `negro` | Conteo: contado mayor que el sistema ("Sobrante 9") |
| `SinContar` | Transparente, borde 1 px `#0A0A0A` 15 % | `gris` | Producto aún no contado |
| `Programado` | `grisClaro` | `negro` | Conteo agendado |
| `EnCurso` | Transparente, borde 1 px `negro` | `negro` | Conteo en progreso |
| `PorRevisar` | `rojoSuave` | `rojo` | Conteo finalizado que espera al administrador |
| `Rechazado` | Transparente, borde 1 px `negro` | `negro` | Reporte rechazado |
| `BajoMinimo` | `rojoSuave` | `rojo` | Producto con stock menor al mínimo |
| `RolAdmin` | `negro` | `blanco` | "Administrador" |
| `RolOperador` | `grisClaro` | `negro` | "Operador" |

`Revisado` y `Aprobado` siguen siendo negros, y `Pendiente` y `EnRevision`, rojos (sección 4.4).

### 4.25 `MenuInferior` del administrador

Es el mismo componente con el mismo estilo, y las pestañas **Panel · Conteos · Aprobar · Más**. Agrega la propiedad `Rol` (`Operador` / `Administrador`) y las 4 variantes de pestaña activa del administrador.

### 4.26 `CampoFechaHora` y `Avatar` "AD"

- `CampoFechaHora`: variante de `Input` que muestra un valor ("Oct 9, 2026", "8:00 AM") con "▾" a la derecha (14, `gris`). Al tocarlo se abre el selector nativo del sistema; no hace falta diseñar el selector.
- `Avatar` con las iniciales "AD" para el administrador. En las hojas de perfil, el avatar mide 56.

---

## 5. Roles, navegación y lógica global

### 5.1 Roles

| Rol | Quién es | Qué puede hacer | Cuenta de prueba |
|---|---|---|---|
| **Operador** | Personal de bodega que hace los conteos | Contar productos, escanear códigos y asignar ubicaciones, reportar defectos, ver las revisiones y el mapa de la bodega | `estudiante@uleam.edu.ec` / `123456` |
| **Administrador** | Responsable del inventario | Programar conteos, revisar resultados y aprobar ajustes de stock, aprobar o rechazar reportes, administrar productos, usuarios, bodegas y ubicaciones | `admin@uleam.edu.ec` / `admin123` |

El rol lo define la cuenta: el Login no tiene selector de rol. Un operador nunca ve las pantallas del administrador. El administrador no cuenta ni escanea (no ve Conteo ni Escáner), pero sí puede ver el mapa.

### 5.2 Mapa de navegación

```
LOGIN
 ├─ cuenta de operador ──▶ INICIO ──(avatar)──▶ Hoja de perfil ──▶ Cerrar sesión
 │                         INVENTARIOS
 │                          ├─(Iniciar conteo de hoy / Ver detalles)──▶ Conteo
 │                          │     ├─(Reportar defecto)──▶ Reportar defecto (producto precargado)
 │                          │     └─(Escanear)──▶ Escáner, modo buscar
 │                          └─(Escanear código)──▶ Escáner, modo asignar ubicación
 │                         REPORTES
 │                         GESTIÓN ──(Ver ubicación en mapa / Ver todas)──▶ Mapa de bodega ──▶ Hoja de estante
 │
 └─ cuenta de admin ─────▶ PANEL ──(+ Programar conteo)──▶ Programar conteo
                           CONTEOS ──▶ Programar conteo
                              └──────▶ Revisión de conteo
                           APROBAR ──▶ Detalle de reporte
                           MÁS ──▶ Productos ──▶ Formulario de producto
                               ├─▶ Usuarios ──▶ Formulario de usuario
                               ├─▶ Bodegas y ubicaciones ──▶ Configurar bodega
                               ├─▶ Mapa de bodegas
                               └─▶ Cerrar sesión
```

En MAYÚSCULAS van las pantallas principales, que llevan menú. Las demás son subpantallas.

### 5.3 Reglas globales

| Regla | Detalle |
|---|---|
| Acceso | La app arranca en **Login**. Sin iniciar sesión no se ve ninguna otra pantalla ni el menú. |
| Pantalla inicial | Operador → **Inicio**. Administrador → **Panel**. |
| Menú inferior | Operador: **Inicio · Inventario · Reportes · Gestión**. Administrador: **Panel · Conteos · Aprobar · Más**. Solo aparece en esas 8 pantallas principales. |
| Subpantallas | Las pantallas que se abren desde un botón o una lista **no muestran el menú**. En su lugar llevan un `BotonVolver` arriba a la izquierda con el nombre de la pantalla de origen. |
| Cerrar sesión | Operador: tocar el avatar de Inicio abre una `HojaInferior` con *Cerrar sesión*. Administrador: *Más → Cerrar sesión*. En ambos casos aparece una confirmación y luego se vuelve al Login. |
| Persistencia | La información se conserva al cambiar de pantalla. En la versión actual de la app, que no tiene servidor, se pierde al cerrarla. |
| Botones sin función | Solo la tarjeta *Más información* de Inicio. |

### 5.4 Reglas de negocio compartidas

| Regla | Valor |
|---|---|
| Discrepancia de un producto | `abs(contado − sistema) / sistema × 100`. Si el sistema marca 0 y se contó algo, la discrepancia es 100 %. |
| Discrepancia de una bodega | `Σ abs(diferencias) / Σ sistema × 100`, sobre los productos del conteo. |
| Umbrales de discrepancia | Menos de 10 %: aceptable (`negro`) · de 10 % a 19 %: revisar (`rojoClaro`) · 20 % o más: crítica (`rojo`). Se usan en Inventarios, Conteo, Mapa y Panel. |
| Jornada de conteo | Máximo 8 horas, definida por el administrador al programar (por defecto, 8:00 AM – 2:00 PM). El cronómetro muestra el tiempo que falta para la hora de fin. |
| Código de producto | Interno `PRD-0NN` más un código de barras EAN-13 (13 dígitos). |
| Código de ubicación | `P{pasillo}-E{estante}-N{nivel}`. Por ejemplo, `P2-E03-N1` es el pasillo 2, estante 03, nivel 1. Una ubicación solo existe si el administrador la configuró. |
| Código de reporte | `REP-00N`, correlativo. |

### 5.5 Ciclos de vida

```
Conteo:    Programado ──▶ En curso ──▶ Por revisar ──▶ Revisado
                             ▲              │
                             └── reconteo ──┘
Reporte:   En revisión ──▶ Aprobado
                       └─▶ Rechazado (con motivo)
Producto y usuario:   Activo ⇄ Inactivo
```

Gestión, en la app del operador, muestra **Revisado** cuando el conteo está *Revisado* y **Pendiente** en cualquier otro estado.

**Prototipo global:**

- Cada pestaña del menú navega a su pantalla, con transición *Instant* o *Dissolve* de 150 ms.
- Cada `BotonVolver` usa la acción *Back*.
- El Login con la cuenta de operador lleva a `Inicio`; con la de administrador, a `Admin / Panel`.
- El menú es el mismo componente en todas las pantallas, con la variante de rol y de pestaña activa que corresponda.

---

## 6. Pantallas

### 6.1 Login (`LoginScreen`)

**Propósito:** permitir el acceso solo al personal autorizado.

**Lógica de negocio**

1. El usuario escribe su correo y su contraseña. La contraseña se muestra oculta con puntos.
2. Al presionar **Iniciar Sesión**:
   - si algún campo está vacío (los espacios no cuentan), aparece la alerta **"Datos incompletos"** con el mensaje *"Por favor ingresa correo y contraseña."*;
   - si coincide con la cuenta del **operador** (`estudiante@uleam.edu.ec` / `123456`), entra a **Inicio**;
   - si coincide con la del **administrador** (`admin@uleam.edu.ec` / `admin123`), entra al **Panel** (sección 8.1);
   - si la cuenta existe pero está desactivada, aparece la alerta **"Usuario inactivo"** con el mensaje *"Comunícate con el administrador."*;
   - en cualquier otro caso aparece la alerta **"Credenciales incorrectas"** con el mensaje *"El correo o la contraseña son incorrectos."*
3. No hay selector de rol, registro, recuperación de contraseña ni opción de recordar sesión: las cuentas las crea el administrador (sección 8.8).

**Layout** (todo centrado vertical y horizontalmente, con padding 24):

1. `PillMarca` "ULEAM · INVENTARIOS" (margen inferior 18).
2. Logo "Inventrex" en estilo `Logo`, `negro`, seguido de un punto "." en `rojo` (margen inferior 8).
3. Lema en estilo `Lema`, color `grisOscuro`, centrado: "Gestiona tu inventario **de forma eficiente**". La parte "de forma eficiente" va en `rojo` y ExtraBold. Margen inferior 28.
4. Formulario en una `Tarjeta` Vidrio, ancho máximo 360, padding 20, radio 24:
   - etiqueta "Correo electrónico" e input con placeholder "Correo Electrónico";
   - etiqueta "Contraseña" e input con placeholder "Contraseña";
   - `Boton` Primario "Iniciar Sesión" (radio 14, texto 16).

**Frames a diseñar:** `Login / Vacío`, `Login / Completo`, `Login / Alerta datos incompletos`, `Login / Alerta credenciales incorrectas`.

**Prototipo:** botón en `Login / Completo` → `Inicio`. Crea también `Login / Completo admin` → `Admin / Panel`. Botón en `Login / Vacío` → overlay `Alerta datos incompletos`.

**Control 60-30-10:** el rojo solo aparece en el punto del logo, la frase resaltada y el botón.

---

### 6.2 Inicio (`InicioScreen`)

**Propósito:** dar el contexto del día antes de empezar a contar.

**Lógica de negocio**

- Muestra tres contadores de inventarios según su estado: **2** seguidos, **3** normales y **4** concretados.
- Muestra el **responsable a cargo hoy** y la **ventana horaria** de trabajo (8:00 AM – 2:00 PM). Esa ventana es la jornada sobre la que se calcula el tiempo disponible en Inventarios.
- La tarjeta *Más información* todavía no tiene acción. Tocar el **avatar** abre la hoja de perfil con *Cerrar sesión* (sección 7.4).
- La pantalla no tiene entradas de datos ni validaciones: solo muestra información.

**Layout:**

1. Fila de encabezado (alineada al centro, separada de lo siguiente por 24):
   - a la izquierda, `H1` "Pantalla de Inicio" y debajo `Cuerpo` en `gris`: "Bienvenido al sistema de solicitudes";
   - a la derecha, `Avatar` "JP" con 12 de margen.
2. Grilla de 2 columnas (gap 12, margen inferior 28) con 4 tarjetas de alto mínimo 120 y padding 18. El contenido se reparte arriba y abajo (*space between*):
   - `Tarjeta` Vidrio: "2" en estilo `Métrica` y debajo "Inventarios seguidos" (13 / Medium, `grisOscuro`);
   - `Tarjeta` Vidrio: "3" y "Inventarios normales";
   - `Tarjeta` Vidrio: "4" y "Inventarios concretados";
   - `Tarjeta` VidrioOscuro: círculo de 36 en `rojo` con un "+" de 22 / Bold en `blanco`, y debajo "Más información" en 13 / SemiBold `blanco`.
3. `Eyebrow` "INFORMACIÓN HOY" (12 px, interletrado 1.5).
4. `Tarjeta` Vidrio con padding 18:
   - "Pacheco Chalen Jose David" en estilo `Destacado`, `negro`, y debajo "a cargo hoy" en 12 / Medium `gris`;
   - `Divisor` con 14 de margen vertical;
   - "8:00 AM - 2:00 PM" en estilo `Destacado` y debajo "Ventana Horaria".
5. `MenuInferior` con la variante `Activa=Inicio`.

**Frames a diseñar:** `Inicio`, `Inicio / Perfil` (ver 7.4).

**Control 60-30-10:** el rojo solo aparece en el círculo "+" y el punto del menú.

---

### 6.3 Inventarios (`InventarioScreen`)

**Propósito:** controlar el tiempo del conteo y ver qué bodegas tienen diferencias.

**Lógica de negocio**

- **Cronómetro.** Muestra el tiempo restante de la jornada de 8 horas. La barra se llena con la fórmula `(horas × 60 + minutos) / 480`. Con **2h 15m** restantes, la barra va al **28 %** del ancho.
- **Discrepancia.** Es el porcentaje de diferencia entre lo contado y lo registrado en el sistema. La barra de cada tarjeta ocupa ese mismo porcentaje del ancho y cambia de color según este umbral:

| Discrepancia | Color de la barra | Significado |
|---|---|---|
| Menos de 10 % | `negro` | Aceptable |
| De 10 % a 19 % | `rojoClaro` | Requiere revisión |
| 20 % o más | `rojo` | Crítica |

- **Iniciar conteo de hoy** reemplaza a *+ Crear Inventario*: crear conteos ahora es tarea del administrador (sección 8.3). Abre el **Conteo** (sección 7.1) programado para hoy. Si no hay ninguno, el botón aparece `Deshabilitado` con el texto *No tienes conteos programados hoy*.
- **Escanear código** abre el **Escáner** para asignar ubicaciones (sección 7.2).
- **Ver detalles →** abre el Conteo de esa bodega: editable si está en curso y en solo lectura si está cerrado.
- El porcentaje de cada tarjeta es la discrepancia calculada en el Conteo.

**Datos:**

| Bodega | Fecha | Discrepancia | Productos contados | Categoría |
|---|---|---|---|---|
| Bodega A | Oct 2 | 15 % | 245 | Electrónica |
| Bodega B | Oct 1 | 8 % | 187 | Textil |
| Almacén C | Sep 30 | 22 % | 512 | Alimentos |
| Oficina D | Sep 28 | 5 % | 89 | Suministros |

**Layout:**

1. `Titulo`: "Inventarios" con el subtítulo "Gestiona y monitorea tus procesos". Margen inferior 20.
2. Cronómetro en una `Tarjeta` VidrioOscuro con padding 18 y margen inferior 14:
   - fila con contenido alineado abajo y separado a los extremos:
     - a la izquierda, "TIEMPO DISPONIBLE" (11 / SemiBold, mayúsculas, interletrado 1, `#FFFFFF` 60 %) y debajo "2h 15m" en estilo `Cronómetro`, `blanco`;
     - a la derecha, "de 8 h" (12 / SemiBold, `#FFFFFF` 50 %);
   - debajo, a 14 px, `BarraProgreso` SobreOscuro al 28 %.
3. `Boton` Primario "Iniciar conteo de hoy" y, 10 px debajo, `Boton` Oscuro "Escanear código" (ambos con radio 16; margen inferior 24).
4. Grilla de 2 columnas (gap 12) con una `Tarjeta` Vidrio por bodega (radio 18, padding 14):
   - nombre en `CuerpoFuerte` `negro` y debajo la fecha en `Pequeño` `gris`; margen inferior 12;
   - fila alineada a la línea base: "15%" en estilo `Discrepancia` y, a 6 px, "discrepancia" en `Pequeño` `gris`;
   - `BarraProgreso` SobreClaro con el ancho y el color del umbral; margen inferior 12;
   - fila de stats con borde de 1 px arriba y abajo (`#0A0A0A` 6 %) y padding vertical 10: a la izquierda "245" (14 / Bold) sobre "Productos" (10 px, `gris`); en el centro un divisor vertical de 1 × 22; a la derecha la categoría (10 px, `gris`);
   - "Ver detalles →" en 12 / Bold `negro`.
5. `MenuInferior` con la variante `Activa=Inventario`.

**Frames a diseñar:** `Inventarios`, `Inventarios / Sin conteo programado`.

**Prototipo:** *Iniciar conteo de hoy* y *Ver detalles →* de Bodega A → `Conteo / En curso`; *Escanear código* → `Escáner / Paso 1`.

**Control 60-30-10:** el rojo solo aparece en la barra del cronómetro, el botón *Iniciar conteo de hoy*, las barras de Bodega A (rojo claro) y Almacén C (rojo), y el punto del menú.

---

### 6.4 Reportar defecto (`ReporteScreen`)

**Propósito:** registrar un producto dañado, vencido o incompleto, con una foto como evidencia, y consultar los reportes enviados.

**Lógica de negocio**

1. **Producto (obligatorio).** Se elige uno solo, tocando un chip. Cada producto tiene código y bodega.
2. **Tipo de defecto (obligatorio).** Se elige uno solo entre *Dañado*, *Vencido*, *Incompleto* y *Otro*.
3. **Descripción (obligatoria).** Texto libre de varias líneas; un texto con solo espacios cuenta como vacío.
4. **Evidencia fotográfica (obligatoria).** Se obtiene de una de dos formas:
   - **Tomar foto**: pide permiso de cámara y abre la cámara;
   - **Galería**: pide permiso de galería y abre la galería.

   Si el usuario niega el permiso, aparece la alerta **"Permiso denegado para acceder a la cámara."** (o *"…a la galería."*). La foto se recorta en proporción **4:3**. Si el usuario cancela, no cambia nada. Con la foto cargada se ve una vista previa con la opción **✕ Quitar imagen**.
5. **Enviar reporte.** Valida en este orden:
   1. si faltan producto, tipo o descripción, aparece la alerta **"Campos incompletos."** con *"Selecciona el producto, el tipo de defecto y escribe una descripción."*;
   2. si falta la foto, aparece la alerta **"Falta la evidencia."** con *"Toma o selecciona una foto del producto defectuoso."*;
   3. si todo está bien, se crea el reporte:
      - código correlativo `REP-00N`, donde N es la cantidad de reportes + 1 (con 2 reportes, el nuevo es `REP-003`);
      - estado inicial **En revisión** y fecha de hoy;
      - se agrega **al inicio** de la lista y el formulario se limpia;
      - aparece la alerta **"Reporte enviado."** con *"El reporte quedó en revisión."*
6. **Estados de un reporte.** El operador solo crea reportes *En revisión*. El administrador los **aprueba** o los **rechaza** con un motivo (sección 8.5). *Aprobado* usa el badge `Aprobado`, *Rechazado* el badge `Rechazado` y cualquier otro estado el badge `Defecto`.
7. La lista de reportes se conserva al cambiar de pestaña.

**Datos:**

| Código | Nombre | Bodega |
|---|---|---|
| PRD-001 | Monitor LED 24" | Bodega A |
| PRD-002 | Camiseta algodón | Bodega B |
| PRD-003 | Caja de cereal | Almacén C |
| PRD-004 | Resma de papel | Oficina D |

| Reporte | Producto · Tipo | Descripción | Fecha | Estado |
|---|---|---|---|---|
| REP-001 | Monitor LED 24" · Dañado | Pantalla con rayones en la esquina inferior. | Oct 1 | Aprobado |
| REP-002 | Caja de cereal · Vencido | Lote con fecha de caducidad pasada. | Oct 2 | En revisión |

**Layout:**

1. `Titulo`: "Reportar defecto" con el subtítulo "Registra productos defectuosos con evidencia".
2. `Eyebrow` "PRODUCTO" y, debajo, chips con `ConSubtitulo=sí` en filas que se ajustan solas (gap 8, margen inferior 18). Por ejemplo: "Monitor LED 24"" con "PRD-001 · Bodega A".
3. `Eyebrow` "TIPO DE DEFECTO" y 4 chips simples: Dañado, Vencido, Incompleto, Otro.
4. `Eyebrow` "DESCRIPCIÓN" e `Input` Multilínea con el placeholder "Describe el defecto encontrado" (margen inferior 18).
5. `Eyebrow` "EVIDENCIA FOTOGRÁFICA" y una fila con 2 botones Contorno de igual ancho (gap 10): "Tomar foto" y "Galería".
6. Solo si hay foto: `Tarjeta` Vidrio con padding 12 que contiene "Imagen seleccionada" (12 px, `gris`), la imagen a todo el ancho en proporción 4:3 con radio 12, y "✕ Quitar imagen" centrado en 13 / Bold `rojo`.
7. `Boton` Primario "Enviar reporte" (radio 16, 8 arriba y 28 abajo).
8. `H2` "Reportes enviados".
9. Una `Tarjeta` Vidrio por reporte (padding 16, separación 12):
   - fila separada a los extremos: código "REP-001" (12 / Bold, `gris`, interletrado 0.5) y el `Badge` del estado;
   - "Monitor LED 24" · Dañado" en `TítuloTarjeta` `negro`;
   - la descripción en `Cuerpo` `grisOscuro`;
   - si el reporte tiene foto, la miniatura a todo el ancho con 140 de alto y radio 12;
   - la fecha en `Pequeño` `gris`.
10. `MenuInferior` con la variante `Activa=Reportes`.

**Frames a diseñar:**

- `Reporte / Vacío`: nada seleccionado; la lista muestra REP-001 y REP-002.
- `Reporte / Completando`: "Resma de papel" y "Dañado" seleccionados, con la descripción "Paquete con hojas mojadas." escrita.
- `Reporte / Con foto`: lo mismo que el anterior, más la vista previa. Usa una foto de ejemplo de un paquete de papel.
- `Reporte / Alerta campos incompletos`
- `Reporte / Alerta falta evidencia`
- `Reporte / Enviado`: formulario limpio y **REP-003** primero en la lista: "Resma de papel · Dañado", badge *En revisión*, con miniatura.

**Prototipo:** los chips son componentes interactivos. Desde `Vacío`, el botón *Enviar reporte* abre la alerta de campos incompletos; desde `Completando`, *Galería* lleva a `Con foto`; desde `Con foto`, *Enviar reporte* lleva a `Enviado`.

**Cambios por las pantallas nuevas:**

- **Unidades afectadas.** Campo obligatorio nuevo entre *Tipo de defecto* y *Descripción*, con el `Eyebrow` "UNIDADES AFECTADAS". Es un `Stepper` con valor inicial 1, mínimo 1 y máximo igual al stock en sistema del producto. La tarjeta del reporte lo muestra así: "Caja de cereal · Vencido · 3 u".
- **Apertura desde Conteo.** Si la pantalla se abre con *Reportar defecto* desde el Conteo, el producto llega preseleccionado y arriba aparece un `BotonVolver` "← Conteo". Al enviar, vuelve al conteo.
- **Estado Rechazado.** Lo decide el administrador. La tarjeta muestra el badge `Rechazado` y, debajo de la descripción, "Motivo: …" en `Pequeño` `grisOscuro`.
- **Frame adicional:** `Reporte / Desde conteo`.

**Control 60-30-10:** los chips seleccionados y los botones de foto son **negros**, no rojos. El rojo solo aparece en *Enviar reporte*, *✕ Quitar imagen*, el badge *En revisión* y el punto del menú.

---

### 6.5 Gestión (`GestionScreen`)

**Propósito:** que el supervisor siga las revisiones de inventario que hace cada jefe de bodega.

**Lógica de negocio**

- Cada revisión tiene una bodega, una fecha, un **jefe de bodega** responsable, unas **observaciones** y un estado.
- Hay dos estados: **Revisado**, cuando el conteo se terminó y se revisó, y **Pendiente**, cuando sigue en progreso. *Pendiente* se marca en rojo porque requiere atención.
- **Ver ubicación en mapa →** abre el **Mapa de bodega** (sección 7.3) en la bodega de esa tarjeta. **Ver todas las bodegas** abre el mismo mapa en la primera bodega, con el selector arriba.
- El estado sale del ciclo de conteos del administrador (sección 5.5): *Revisado* cuando el administrador aprobó el ajuste y *Pendiente* en cualquier otro estado.

**Datos:**

| Revisión | Fecha | Jefe de bodega | Estado | Observaciones |
|---|---|---|---|---|
| Bodega A - Inventario Oct 2 | Oct 2, 2026 | Carlos López | Revisado | Discrepancia detectada en sección electrónica. Revisar códigos de barras. |
| Bodega B - Inventario Oct 1 | Oct 1, 2026 | María García | Pendiente | Conteo en progreso. Falta revisar sección textil. |
| Almacén C - Inventario Sep 30 | Sep 30, 2026 | Juan Pérez | Revisado | Todo conforme. Stock coincide con sistema. |
| Oficina D - Inventario Sep 28 | Sep 28, 2026 | Ana Martínez | Revisado | Falta un equipo de cómputo. Reportar a sistemas. |

**Layout:**

1. `Titulo`: "Gestión" con el subtítulo "Monitorea revisiones de bodegas". Margen inferior 20.
2. `Boton` Oscuro "Ver todas las bodegas" (radio 16, margen inferior 20). Es negro porque no es la acción principal.
3. Una `Tarjeta` Vidrio por revisión (padding 16, separación 12):
   - encabezado separado a los extremos: a la izquierda el nombre en `CuerpoFuerte` `negro` y debajo la fecha en `Pequeño` `gris`; a la derecha el `Badge` (Revisado o Pendiente);
   - sección con `Eyebrow` "JEFE DE BODEGA" (10 px) y el nombre en 13 / SemiBold `negro`, con borde inferior de 1 px (`#0A0A0A` 6 %) y 12 de padding y margen inferior;
   - sección con `Eyebrow` "OBSERVACIONES" y el texto en 13 / Regular `grisOscuro` (alto de línea 19), con el mismo borde;
   - `Boton` Contorno "Ver ubicación en mapa →" (radio 12, padding vertical 11, texto 13).
4. `MenuInferior` con la variante `Activa=Gestión`.

**Frames a diseñar:** `Gestión` (frame alargado con las 4 tarjetas).

**Prototipo:** *Ver ubicación en mapa →* de cada tarjeta → `Mapa / Bodega A` (o la bodega correspondiente).

**Control 60-30-10:** el rojo solo aparece en el badge *Pendiente* y el punto del menú.

---

## 7. Pantallas nuevas del operador

### 7.1 Conteo de productos (`ConteoScreen`)

**Propósito:** registrar cuántas unidades hay físicamente de cada producto y obtener solos los faltantes y sobrantes frente al sistema.

**Acceso:** Inventarios → *Iniciar conteo de hoy*, o *Ver detalles →* en una bodega con conteo en curso. Si el conteo ya está cerrado, la pantalla se abre en solo lectura, sin formulario.

**Lógica de negocio**

1. Carga la bodega y los productos que el administrador incluyó al programar el conteo: toda la bodega, una categoría o una selección de productos (conteo cíclico).
2. **Cronómetro.** El encabezado muestra el tiempo que falta para la hora de fin. Al llegar a cero, el conteo se cierra solo: los productos sin contar quedan en 0 y aparece la alerta **"Tiempo agotado"** con *"El conteo se cerró. Los productos sin contar se registraron como faltantes."*
3. **Elegir producto.** Se puede buscar por nombre o código, tocar una fila de la lista o usar **Escanear** (abre el Escáner en modo buscar y vuelve con el producto cargado). Si el producto no está en este conteo, aparece **"Producto fuera del conteo"** con *"Este producto pertenece a Bodega B."* o *"Este producto no está incluido en el conteo de hoy."*
4. **Cantidad en sistema.** Viene del catálogo y es de solo lectura: el operador no puede cambiarla. Si el administrador programó un **conteo ciego**, esta cantidad no se muestra (para no influir en el conteo) y la diferencia se calcula recién al finalizar.
5. **Cantidad contada (obligatoria).** Entero mayor o igual a 0, con el `Stepper` o con el teclado numérico.
6. **Cálculo automático, en vivo y sin botón:** `diferencia = contado − sistema`.
   - Menor que 0 → **Faltante** de N unidades.
   - Igual a 0 → **Cuadra**.
   - Mayor que 0 → **Sobrante** de N unidades.
   - La discrepancia del producto se muestra con el color de su umbral y la palabra *aceptable*, *revisar* o *crítica*.
7. **Observación.** Es opcional, pero pasa a ser **obligatoria** cuando la discrepancia del producto es de 20 % o más. Si falta, aparece **"Falta la observación"** con *"Explica la diferencia: la discrepancia supera el 20 %."*
8. **Guardar conteo.**
   - Si falta el producto o la cantidad, aparece **"Campos incompletos."** con *"Selecciona un producto e ingresa la cantidad contada."*
   - Si falta la observación obligatoria, aparece la alerta del punto 7.
   - Si todo está bien, guarda la fila. Si el producto ya estaba contado, reemplaza el valor anterior (recuento).
   - Luego limpia el formulario y carga el siguiente producto sin contar.
9. **Reportar defecto** abre *Reportar defecto* con el producto ya seleccionado. Las unidades defectuosas **se cuentan igual**, porque están físicamente en la bodega; el reporte sirve para darlas de baja cuando el administrador lo apruebe.
10. **Resumen automático.** Muestra los productos contados (X de N), las unidades faltantes y sobrantes, y la discrepancia de la bodega calculada sobre los productos ya contados. Este valor es el que aparece en la tarjeta de la bodega en Inventarios.
11. **Finalizar conteo.**
    - Si quedan productos sin contar, aparece la `Alerta` DosBotones **"Quedan productos sin contar"** con *"1 producto se registrará con cantidad 0 (faltante total). ¿Finalizar igual?"* y las opciones *Cancelar* y *Finalizar*.
    - Al finalizar, **los faltantes se asignan automáticamente**: cada producto sin contar pasa a faltante total y el resumen se recalcula.
    - El conteo pasa a **Por revisar**, le llega al administrador (sección 8.4) y en Gestión aparece como *Pendiente*.
    - El operador ya no puede editarlo.
12. **Reconteo.** Si el administrador pidió un reconteo, solo aparecen los productos marcados y arriba se muestra una tarjeta Vidrio con *"Reconteo solicitado: {motivo}"*.

**Datos (Bodega A, conteo cíclico en curso):**

| Código | Producto | Ubicación | Sistema | Contado | Resultado | Discrepancia | Observación |
|---|---|---|---|---|---|---|---|
| PRD-001 | Monitor LED 24" | P1-E01-N1 | 40 | 34 | Faltante 6 | 15 % | — |
| PRD-005 | Teclado USB | P1-E02-N2 | 60 | 60 | Cuadra | 0 % | — |
| PRD-006 | Mouse inalámbrico | P2-E03-N1 | 50 | 38 | Faltante 12 | 24 % | Hay 12 unidades en tránsito a Bodega B. |
| PRD-007 | Cable HDMI 2 m | P2-E04-N3 | 30 | 39 | Sobrante 9 | 30 % | Llegó un lote sin registrar. |
| PRD-008 | Audífonos Bluetooth | P3-E01-N2 | 20 | — | Sin contar | — | — |

**Resumen:** **4 de 5** productos contados · **18 u** faltantes · **9 u** sobrantes · discrepancia **15 %** (27 / 180, en `rojoClaro`). Es el mismo 15 % de la tarjeta de Bodega A en Inventarios. Si se finaliza sin contar los audífonos, se agregan 20 u de faltante y la discrepancia sube a **23,5 %** (47 / 200, en `rojo`).

**Wireframe:**

```
┌──────────────────────────────────────┐
│ (← Inventarios)                      │
│ Conteo · Bodega A          ( 2h 15m )│ ← pill Vidrio/Oscuro
│ Electrónica · 4 de 5 productos       │
│ ████████████████████████░░░░░░  80 % │
│                                      │
│ PRODUCTO                             │
│ [ Buscar nombre o código ][Escanear] │ ← Escanear: Oscuro
│ ┌──────────────────────────────────┐ │
│ │ Audífonos Bluetooth              │ │
│ │ PRD-008 · P3-E01-N2              │ │
│ └──────────────────────────────────┘ │
│ ┌ EN SISTEMA ─────┐ ┌ CONTADO ─────┐ │
│ │ 20              │ │ (−)  18  (+) │ │
│ │ Del sistema     │ └──────────────┘ │
│ └─────────────────┘                  │
│ ┌──────────────────────────────────┐ │
│ │ [Faltante 2]     10 % · revisar  │ │ ← se calcula solo
│ └──────────────────────────────────┘ │
│ OBSERVACIÓN (OPCIONAL)               │
│ [                                  ] │
│ [========= Guardar conteo =========] │ ← Primario
│ [-------- Reportar defecto --------] │ ← Contorno
│                                      │
│ ┌ RESUMEN (Vidrio/Oscuro) ─────────┐ │
│ │  15 %       18 u        9 u      │ │
│ │  discrep.   faltantes   sobrantes│ │
│ └──────────────────────────────────┘ │
│ PRODUCTOS DEL CONTEO                 │
│ Monitor LED 24"     34/40 [Faltante 6]│
│ Teclado USB         60/60 [Cuadra]   │
│ Mouse inalámbrico   38/50 [Faltante 12]│
│ Cable HDMI 2 m      39/30 [Sobrante 9]│
│ Audífonos Bluetooth  —/20 [Sin contar]│
│ [######## Finalizar conteo ########] │ ← Oscuro
└──────────────────────────────────────┘
```

**Especificaciones:**

- **Encabezado.** `BotonVolver` "← Inventarios". Título `H1` "Conteo · Bodega A" y, a la derecha, una pill Vidrio/Oscuro (radio 999, padding 10 × 5) con "2h 15m" en 13 / Bold `blanco`. Debajo, el subtítulo "Electrónica · 4 de 5 productos contados" y una `BarraProgreso` SobreClaro con relleno `negro` al 80 %.
- **Cantidades.** "EN SISTEMA" usa `CampoLectura` y "CONTADO" una `Tarjeta` Vidrio con el `Stepper`. Las dos van en fila, con gap 10 y el mismo ancho.
- **Resultado.** `Tarjeta` Vidrio con el `Badge` (Cuadra, Faltante o Sobrante) a la izquierda y, a la derecha, "10 % · revisar" en 14 / Bold con el color del umbral.
- **Resumen.** `Tarjeta` Vidrio/Oscuro con 3 columnas: valor en 22 / ExtraBold `blanco` (la discrepancia va con el color de su umbral) y etiqueta en 11 `#FFFFFF` 60 %.
- **Lista.** Una `FilaLista` por producto: nombre, "PRD-001 · P1-E01-N1" y, a la derecha, "34 / 40" (14 / Bold) con el `Badge`.
- **Botones.** *Guardar conteo* es Primario, *Reportar defecto* es Contorno y *Finalizar conteo* es Oscuro, al final de la lista.

**Frames a diseñar:**

- `Conteo / En curso`: como el wireframe.
- `Conteo / Observación obligatoria`: Mouse inalámbrico con 38 contados, Faltante 12 · 24 % · crítica. El campo de observación lleva borde 1.5 `rojo` y la etiqueta "OBSERVACIÓN (OBLIGATORIA)".
- `Conteo / Conteo ciego`: `CampoLectura` Oculto y, como resultado, "Se calculará al finalizar".
- `Conteo / Confirmar finalizar`: `Alerta` DosBotones.
- `Conteo / Tiempo agotado`: `Alerta`.
- `Conteo / Solo lectura`: conteo cerrado, sin formulario, solo con el resumen y la lista.

**Prototipo:**

- *Reportar defecto* → `Reporte / Desde conteo`.
- *Escanear* → `Escáner / Buscar`.
- *Finalizar conteo* → overlay `Confirmar finalizar` → `Inventarios`.

**Control 60-30-10:** el rojo solo aparece en *Guardar conteo*, los badges *Faltante*, los textos de discrepancia de 10 % o más y el borde de la observación obligatoria.

---

### 7.2 Escáner de códigos (`EscanerScreen`)

**Propósito:** asignar o corregir la ubicación de un producto leyendo su código de barras, y buscar productos rápido durante el conteo.

**Acceso y modos:**

- **Asignar ubicación:** Inventarios → *Escanear código*.
- **Buscar producto:** Conteo → *Escanear*. Al leer un código válido, vuelve al Conteo con el producto cargado, sin pasar por el paso 2.

**Lógica de negocio (modo asignar ubicación)**

1. **Permiso de cámara.** La pantalla lo pide al abrirse. Si se niega, aparece **"Permiso denegado para acceder a la cámara."** y el botón *Ingresar código* permite escribir los 13 dígitos a mano.
2. **Paso 1 · Producto.** Lee el código de barras (EAN-13) y lo busca en el catálogo.
   - Si no existe → **"Código no registrado"** con *"Pide al administrador que registre el producto en el catálogo."*
   - Si es de otra bodega → **"Producto de otra bodega"** con *"Este producto pertenece a Bodega B."*
   - Si está inactivo → **"Producto inactivo"** con *"Este producto fue desactivado por el administrador."*
3. **Paso 2 · Ubicación.**
   - Se abre una `HojaInferior` con el producto: nombre, código interno, código de barras y ubicación actual (o "Sin ubicación").
   - La nueva ubicación se define escaneando la etiqueta del estante (código `P2-E03-N1`) o eligiéndola con chips de Pasillo, Estante y Nivel.
   - Solo aparecen las ubicaciones que el administrador configuró para esa bodega.
4. **Asignar ubicación.**
   - Si la ubicación elegida es la actual → **"Sin cambios"** con *"El producto ya está en esa ubicación."*
   - Si no, la guarda y registra en el historial el producto, la ubicación anterior y la nueva, el usuario y la hora.
   - Después muestra el `Aviso` *"Ubicación asignada"* y vuelve al paso 1 para el siguiente producto.
5. **Últimas asignaciones.** Al pie de la hoja aparecen las 3 más recientes de la sesión.

**Datos de ejemplo:** Mouse inalámbrico · PRD-006 · `7861234500064`. Ubicación actual P2-E03-N1, nueva P2-E05-N2. Últimas asignaciones:

- 10:15 · Cable HDMI 2 m · P2-E01-N3 → P2-E04-N3
- 10:02 · Teclado USB · Sin ubicación → P1-E02-N2

**Wireframe:**

```
┌──────────────────────────────────────┐
│ (← Inventarios)    (Ingresar código) │
│░░░░░░░░░░░ cámara oscura ░░░░░░░░░░░░│
│░░░░░░░  ┌─                ─┐  ░░░░░░░│
│░░░░░░░                         ░░░░░░│
│░░░░░░░  ━━━━━━━━━━━━━━━━━━━━  ░░░░░░░│ ← línea roja
│░░░░░░░                         ░░░░░░│
│░░░░░░░  └─                ─┘  ░░░░░░░│
│░░░░░  Apunta al código de barras ░░░░│
│░░░░░░ ( Paso 1 de 2 · Producto ) ░░░░│
├──────────── HojaInferior ────────────┤
│                 ────                 │
│ Mouse inalámbrico                    │
│ PRD-006 · 7861234500064              │
│ Ubicación actual           P2-E03-N1 │
│ NUEVA UBICACIÓN                      │
│ Pasillo [P1][P2][P3][P4]             │
│ Estante [E01][E02][E03][E04][E05]…   │
│ Nivel   [N1][N2][N3][N4]             │
│ o escanea la etiqueta del estante    │
│ [======= Asignar ubicación ========] │ ← Primario
│ ÚLTIMAS ASIGNACIONES                 │
│ 10:15  Cable HDMI 2 m   → P2-E04-N3  │
│ 10:02  Teclado USB      → P1-E02-N2  │
└──────────────────────────────────────┘
```

**Especificaciones:**

- **Sobre la cámara.** `BotonVolver` y la pill *Ingresar código*, ambos en Vidrio/Oscuro con texto `blanco`.
- **Chips de la hoja.** Los seleccionados van en `negro` (en el ejemplo, P2 · E05 · N2).
- **Ubicación actual.** Es una fila con la etiqueta en 13 `gris` a la izquierda y el código en 14 / Bold `negro` a la derecha.

**Frames a diseñar:**

- `Escáner / Paso 1`: solo el visor.
- `Escáner / Paso 2`: la hoja con P2-E05-N2 seleccionado.
- `Escáner / Ubicación asignada`: el visor con el `Aviso`.
- `Escáner / Código no registrado`: la alerta.
- `Escáner / Permiso denegado`: fondo `negro`, el mensaje y el botón *Ingresar código* en Contorno blanco.
- `Escáner / Buscar`: el visor con la pill "Buscar producto para el conteo".

**Prototipo:**

- Tocar el visor simula una lectura y lleva a `Paso 2`.
- *Asignar ubicación* → `Ubicación asignada` → tras 1500 ms, `Paso 1`.

**Control 60-30-10:** el rojo solo aparece en la línea del escáner y en *Asignar ubicación*.

---

### 7.3 Mapa de bodega (`MapaBodegaScreen`)

**Propósito:** ver de un vistazo dónde están los problemas dentro de la bodega y qué hay en cada estante.

**Acceso:**

- Operador: Gestión → *Ver ubicación en mapa →* (abre la bodega de esa tarjeta) o *Ver todas las bodegas* (abre la primera, con el selector arriba).
- Administrador: *Más → Mapa de bodegas*, o tocando una bodega en el Panel.

**Lógica de negocio**

1. Es un **plano esquemático del interior** de la bodega, no un mapa geográfico. Se dibuja con la configuración del administrador: pasillos × estantes por pasillo. Los niveles se ven al tocar un estante.
2. **Color de cada estante.** Toma el color del **peor estado** de sus productos según su conteo más reciente. De peor a mejor:
   1. `Critica`: algún producto con 20 % o más, o con un reporte de defecto en revisión;
   2. `Media`: alguno entre 10 % y 19 %;
   3. `SinContar`: alguno aún sin contar en un conteo en curso;
   4. `SinNovedad`: todo contado con menos de 10 %;
   5. `Vacio`: el estante no tiene productos asignados.
3. **Selector y filtro.** Arriba hay chips para elegir la bodega. El `Segmentado` *Todos · Con diferencias · Sin contar* atenúa (`Atenuado`) los estantes que no cumplen el filtro.
4. **Buscar producto.** Al escribir un nombre o código, su estante queda `Seleccionado` y se abre su hoja.
5. **Tocar un estante** abre una `HojaInferior` con:
   - el título, por ejemplo "Estante P2-E03";
   - el último conteo (fecha y responsable);
   - una `FilaLista` Compacta por nivel, con el producto, "contado / sistema" y su `Badge`. Los niveles sin producto dicen "Vacío".
6. **Resumen** sobre el plano, por ejemplo: "24 estantes · 22 contados · 3 con diferencias".

**Datos de ejemplo (Bodega A, 4 pasillos × 6 estantes):**

- **Estados de los estantes:**
  - P1-E01 `Media` (Monitor, 15 %);
  - P2-E03 `Critica` (Mouse, 24 %);
  - P2-E04 `Critica` (Cable, 30 %);
  - P3-E01 `SinContar` (Audífonos);
  - P4-E06 `Vacio`;
  - los otros 19 estantes, `SinNovedad`: sus productos se contaron en el conteo anterior, ya revisado.
- **Hoja de P2-E03:**
  - N1 · Mouse inalámbrico · 38 / 50 · Faltante 12;
  - N2 · Vacío;
  - N3 · Mouse pad · 25 / 25 · Cuadra;
  - N4 · Vacío;
  - último conteo: Oct 2 · Jose David Pacheco.

**Wireframe:**

```
┌──────────────────────────────────────┐
│ (← Gestión)                          │
│ Mapa de bodega                       │
│ Estado por estante del último conteo │
│ [Bodega A][Bodega B][Almacén C][Ofi… │
│ [ Buscar producto en el mapa       ] │
│ [ Todos | Con diferencias | Sin contar ]│
│ 24 estantes · 22 contados · 3 con dif.│
│ ┌ plano (Vidrio/Claro) ────────────┐ │
│ │   P1      P2      P3      P4     │ │
│ │  [E01]   [E01]   [E01]   [E01]   │ │
│ │  [E02]   [E02]   [E02]   [E02]   │ │
│ │  [E03]   [E03]   [E03]   [E03]   │ │
│ │  [E04]   [E04]   [E04]   [E04]   │ │
│ │  [E05]   [E05]   [E05]   [E05]   │ │
│ │  [E06]   [E06]   [E06]   [E06]   │ │
│ │ ┌Recepción┐           ┌Oficina┐  │ │
│ │ ═════════════ ENTRADA ══════════ │ │
│ └──────────────────────────────────┘ │
│ ■ Sin novedad  ■ Media  ■ Crítica    │
│ □ Sin contar   ┆ Vacío               │
└──────────────────────────────────────┘
```

**Especificaciones:**

- **Plano.** `Tarjeta` Vidrio con padding 16. Cada pasillo es una columna de `Estante` con gap 8, separada de la siguiente por 18 px (el espacio libre representa el pasillo). Arriba de cada columna va la etiqueta "P1" en 11 / Bold `gris`.
- **Recepción y Oficina.** Rectángulos Vidrio/Oscuro con radio 10 y texto 10 / Bold `blanco`.
- **Entrada.** Línea de 3 px `negro` con "ENTRADA" centrado (10 / Bold, interletrado 2, `gris`).
- **Leyenda.** Mini estantes de 14 × 10 con su texto en 11 `gris`.
- **Menú.** Esta pantalla es una subpantalla: lleva `BotonVolver` y no tiene menú inferior.

**Frames a diseñar:** `Mapa / Bodega A`, `Mapa / Estante seleccionado` (P2-E03 con su hoja), `Mapa / Con diferencias` (el filtro activo atenúa 21 estantes).

**Prototipo:**

- Cada tarjeta de Gestión → `Mapa / Bodega A`, o la bodega correspondiente.
- P2-E03 → `Mapa / Estante seleccionado`.
- Los chips de bodega cambian de variante.

**Control 60-30-10:** el rojo solo aparece en los estantes `Media` y `Critica` y en su leyenda.

---

### 7.4 Hoja de perfil del operador

Se abre al tocar el avatar de Inicio. Es una `HojaInferior` con:

- el `Avatar` "JP" de 56;
- "Jose David Pacheco" en 17 / Bold `negro`;
- "Operador · Bodega A" y "estudiante@uleam.edu.ec" en 13 `gris`;
- un `Divisor`;
- el `Boton` Texto "Cerrar sesión" en `rojo`.

*Cerrar sesión* abre la `Alerta` DosBotones **"¿Cerrar sesión?"** con *"Tendrás que volver a ingresar tu correo y contraseña."*. Desde ahí, *Cerrar sesión* lleva a `Login / Vacío`. Frame: `Inicio / Perfil`.

### 7.5 Resumen de cambios en las pantallas existentes

| Pantalla | Cambio (ya aplicado en la sección 6) |
|---|---|
| Login | Detecta el rol por la cuenta y agrega la alerta *Usuario inactivo* |
| Inicio | El avatar abre la hoja de perfil con *Cerrar sesión* |
| Inventarios | *+ Crear Inventario* pasa a ser *Iniciar conteo de hoy*, porque crear conteos es tarea del administrador. Se agrega *Escanear código* y *Ver detalles →* abre el Conteo |
| Reportar defecto | Campo *Unidades afectadas*, estado *Rechazado* con motivo y apertura desde Conteo con el producto preseleccionado |
| Gestión | *Ver ubicación en mapa →* y *Ver todas las bodegas* abren el Mapa de bodega |

---

## 8. Pantallas del administrador

Todas usan los mismos fundamentos y componentes que las del operador. Las 4 pantallas principales llevan el `MenuInferior` con `Rol=Administrador`; las subpantallas llevan `BotonVolver` y no tienen menú. Los frames se nombran con el prefijo `Admin /`.

### 8.1 Panel (`AdminPanelScreen`)

**Propósito:** mostrar el estado general del inventario y lo que necesita atención hoy.

**Lógica de negocio**

1. **KPIs** (calculados):
   - **Conteos en curso:** conteos *En curso* hoy → **1**.
   - **Por revisar:** conteos *Por revisar* → **1**.
   - **Reportes por aprobar:** reportes *En revisión* → **1**.
   - **Discrepancia promedio:** promedio de la última discrepancia de cada bodega (la parcial si su conteo está en curso): (15 + 8 + 22 + 5) / 4 = **12,5 %** → *revisar*.
2. Las tarjetas *Por revisar* y *Reportes por aprobar* muestran un punto `rojo` de 8 px cuando su valor es mayor que 0. Tocar un KPI abre la lista correspondiente ya filtrada (Conteos o Aprobar).
3. **Bodegas que requieren atención:** las que tienen 10 % o más, de mayor a menor, cada una con una `BarraProgreso` del color de su umbral. Tocar una abre su Mapa.
4. **Actividad reciente:** los últimos 4 eventos, con hora.
5. **+ Programar conteo** (Primario) abre Programar conteo.

**Datos:**

- **Bodegas que requieren atención:** Almacén C 22 % (`rojo`) y Bodega A 15 % (`rojoClaro`).
- **Actividad reciente:**

| Hora | Evento |
|---|---|
| 10:42 | María García finalizó el conteo de Bodega B |
| 10:15 | Jose David Pacheco asignó P2-E04-N3 a Cable HDMI 2 m |
| 09:30 | Nuevo reporte REP-002 · Caja de cereal (Vencido) |
| Ayer | Ajuste aprobado en Almacén C |

**Wireframe:**

```
┌──────────────────────────────────────┐
│ Panel                           (AD) │
│ Resumen de hoy                       │
│ ┌───────────────┐ ┌───────────────┐  │
│ │ 1             │ │ 1           • │  │ ← punto rojo
│ │ Conteos en    │ │ Por revisar   │  │
│ │ curso         │ │               │  │
│ └───────────────┘ └───────────────┘  │
│ ┌───────────────┐ ┌───────────────┐  │
│ │ 1           • │ │ 12,5 %        │  │ ← Vidrio/Oscuro
│ │ Reportes por  │ │ Discrepancia  │  │
│ │ aprobar       │ │ promedio      │  │
│ └───────────────┘ └───────────────┘  │
│ [====== + Programar conteo ========] │ ← Primario
│ BODEGAS QUE REQUIEREN ATENCIÓN       │
│ Almacén C   22 %  ▓▓▓▓▓▓▓░░░░░░░░░░  │
│ Bodega A    15 %  ▓▓▓▓▓░░░░░░░░░░░░  │
│ ACTIVIDAD RECIENTE                   │
│ 10:42  María García finalizó el …    │
│ 10:15  Jose David Pacheco asignó …   │
│ 09:30  Nuevo reporte REP-002 …       │
│ Ayer   Ajuste aprobado en Almacén C  │
│ [  Panel · Conteos · Aprobar · Más  ]│
└──────────────────────────────────────┘
```

**Especificaciones:**

- **Encabezado.** Igual que el de Inicio: `H1` "Panel", subtítulo "Resumen de hoy" y `Avatar` "AD", que no tiene acción.
- **KPIs.** Grilla de 2 columnas como la de Inicio: tarjetas Vidrio con número en estilo `Métrica`. La 4.ª es Vidrio/Oscuro, con "12,5 %" en `blanco` y la palabra "revisar" en 11 / Bold `rojoClaro`.
- **Bodegas.** Cada una es una `FilaLista` con nombre, porcentaje (14 / Bold) y una `BarraProgreso` debajo.
- **Actividad.** Una sola `Tarjeta` Vidrio con filas `Compacta`: la hora en 12 / Bold `gris` (ancho fijo 48) y el texto en 13 `negro`.

**Frames:** `Admin / Panel`.

**Control 60-30-10:** el rojo solo aparece en *+ Programar conteo*, los puntos de aviso, las barras de bodegas y el punto del menú.

---

### 8.2 Conteos (`AdminConteosScreen`)

**Propósito:** ver todos los conteos y en qué estado está cada uno.

**Lógica de negocio**

1. **Filtro.** Fila de `Chip` con scroll horizontal: *Todos · En curso · Por revisar · Programados · Revisados*.
2. **Orden.** Primero *Por revisar*, luego *En curso*, después *Programados* (el más próximo primero) y al final *Revisados* (el más reciente primero).
3. **Tarjeta de cada conteo.** Muestra:
   - la bodega, la fecha y la ventana horaria;
   - el responsable;
   - el `Badge` de estado;
   - una `BarraProgreso` con los productos contados (X de N);
   - la discrepancia con el color de su umbral.
4. **Al tocar un conteo:**
   - *Por revisar* o *Revisado* → Revisión de conteo (8.4);
   - *En curso* → Revisión en modo seguimiento, sin acciones;
   - *Programado* → Programar conteo en modo edición, con *Cancelar conteo* (`Boton` Texto `rojo`), disponible solo antes de la hora de inicio.
5. **+ Programar conteo** (Primario), arriba de la lista.

**Datos:**

| Bodega | Fecha y ventana | Responsable | Estado | Avance | Discrepancia |
|---|---|---|---|---|---|
| Bodega B | Oct 1 · 8:00–14:00 | María García | Por revisar | 4 de 4 | 8 % |
| Bodega A | Oct 2 · 8:00–14:00 | Jose David Pacheco | En curso | 4 de 5 | 15 % |
| Bodega A | Oct 9 · 8:00–14:00 | Jose David Pacheco | Programado | 0 de 41 | — |
| Almacén C | Sep 30 · 8:00–14:00 | Juan Pérez | Revisado | 6 de 6 | 22 % |
| Oficina D | Sep 28 · 9:00–13:00 | Ana Martínez | Revisado | 3 de 3 | 5 % |

**Wireframe:**

```
┌──────────────────────────────────────┐
│ Conteos                              │
│ Programa y revisa los conteos        │
│ [====== + Programar conteo ========] │
│ [Todos][En curso][Por revisar][Prog… │
│ ┌──────────────────────────────────┐ │
│ │ Bodega B             [Por revisar]│ │
│ │ Oct 1 · 8:00–14:00 · María García│ │
│ │ ██████████████████████  4 de 4   │ │
│ │ Discrepancia 8 %                 │ │
│ └──────────────────────────────────┘ │
│ ┌──────────────────────────────────┐ │
│ │ Bodega A              [En curso] │ │
│ │ Oct 2 · 8:00–14:00 · J. D. Pacheco│ │
│ │ █████████████████░░░░░  4 de 5   │ │
│ │ Discrepancia 15 %                │ │
│ └──────────────────────────────────┘ │
│ …                                    │
│ [  Panel · Conteos · Aprobar · Más  ]│
└──────────────────────────────────────┘
```

**Frames:** `Admin / Conteos`, `Admin / Conteos · Por revisar` (con el filtro activo).

**Control 60-30-10:** el rojo solo aparece en el botón, el badge *Por revisar*, las discrepancias de 10 % o más y el punto del menú.

---

### 8.3 Programar conteo (`AdminProgramarConteoScreen`)

**Propósito:** agendar un conteo y definir quién lo hace, cuándo y qué se cuenta.

**Campos**

| Campo | Tipo | Regla |
|---|---|---|
| Bodega | `Chip`, una sola | Obligatorio |
| Responsable | `Chip`, una sola | Obligatorio. Solo operadores activos asignados a esa bodega; la lista se filtra al elegir la bodega |
| Fecha | `CampoFechaHora` | Obligatorio; por defecto, hoy |
| Hora de inicio y de fin | Dos `CampoFechaHora` en fila | Obligatorios; por defecto, 8:00 AM y 2:00 PM |
| Alcance | `Segmentado`: *Toda la bodega · Por categoría · Seleccionados* | Por categoría: aparecen chips con las categorías de la bodega. Seleccionados (conteo cíclico): aparece una lista de productos con `FilaLista` ConCasilla y un buscador |
| Conteo ciego | `Toggle` | Si está activo, el operador no ve la cantidad del sistema ni la diferencia hasta finalizar |

**Lógica de negocio**

1. **Resumen dinámico** al pie del formulario: *"Se contarán 41 productos en 23 estantes · 6 h"*.
2. **Validaciones**, en este orden:
   1. faltan campos → **"Campos incompletos"** con *"Completa bodega, responsable, fecha y horario."*;
   2. fecha anterior a hoy → **"Fecha no válida"** con *"El conteo no puede programarse en una fecha pasada."*;
   3. la hora de fin no es posterior a la de inicio, o la duración pasa de 8 h → **"Horario no válido"** con *"La hora de fin debe ser posterior a la de inicio y el conteo no puede durar más de 8 horas."*;
   4. alcance *Seleccionados* sin productos marcados → **"Sin productos"** con *"Selecciona al menos un producto."*;
   5. la bodega ya tiene un conteo programado o en curso en ese horario → **"Bodega ocupada"**;
   6. el responsable ya tiene otro conteo en ese horario → **"Responsable ocupado"**.
3. **Programar conteo** (Primario). Crea el conteo en estado *Programado*, vuelve a Conteos y muestra el `Aviso` *"Conteo programado"*.
4. **Llegada al operador.** El día del conteo, desde la hora de inicio, el operador lo ve en Inventarios como *Iniciar conteo de hoy*, y su cronómetro corre hasta la hora de fin.
5. **Modo edición** (desde un conteo *Programado*). Los mismos campos, más el `Boton` Texto `rojo` *Cancelar conteo*, que abre una `Alerta` DosBotones.

**Wireframe:**

```
┌──────────────────────────────────────┐
│ (← Conteos)                          │
│ Programar conteo                     │
│ Define quién, cuándo y qué se cuenta │
│ BODEGA                               │
│ [Bodega A][Bodega B][Almacén C][Ofi… │
│ RESPONSABLE                          │
│ [Jose David Pacheco][Carlos López]   │
│ FECHA                                │
│ [ Oct 9, 2026                    ▾ ] │
│ HORARIO                              │
│ [ 8:00 AM      ▾ ] [ 2:00 PM     ▾ ] │
│ ALCANCE                              │
│ [ Toda la bodega | Por categoría | Seleccionados ]│
│ ┌──────────────────────────────────┐ │
│ │ Conteo ciego                (●—) │ │ ← Toggle encendido
│ │ El operador no verá el stock     │ │
│ └──────────────────────────────────┘ │
│ Se contarán 41 productos en 23       │
│ estantes · 6 h                       │
│ [========= Programar conteo =======] │ ← Primario
└──────────────────────────────────────┘
```

**Frames:**

- `Admin / Programar · Vacío`.
- `Admin / Programar · Completo`: Bodega A, Jose David Pacheco, Oct 9, 8:00 AM – 2:00 PM, Toda la bodega, conteo ciego encendido.
- `Admin / Programar · Horario no válido`: la alerta.
- `Admin / Programar · Editar`: con *Cancelar conteo*.

**Control 60-30-10:** el rojo solo aparece en *Programar conteo* y en *Cancelar conteo*.

---

### 8.4 Revisión de conteo (`AdminRevisionConteoScreen`)

**Propósito:** revisar el resultado de un conteo finalizado y decidir si se ajusta el stock o se vuelve a contar.

**Lógica de negocio**

1. **Qué muestra:**
   - la bodega, el responsable, la fecha, la ventana y la hora de finalización;
   - un resumen en Vidrio/Oscuro con la discrepancia final, las unidades faltantes y sobrantes, y los productos contados;
   - la lista de productos con sistema → contado, el `Badge` de resultado y la observación del operador (si la hay);
   - los reportes de defecto vinculados, si existen.
2. **Aprobar ajuste** (Primario).
   - Abre la `Alerta` DosBotones **"Aprobar ajuste"** con *"El stock del sistema se reemplazará por las cantidades contadas en 3 productos. Esta acción no se puede deshacer."*
   - Al confirmar, el conteo pasa a **Revisado**, el stock del sistema toma los valores contados y se registra quién aprobó y cuándo (auditoría).
   - En la Gestión del operador, el conteo pasa a *Revisado*.
3. **Solicitar reconteo** (Contorno).
   - Activa una `Casilla` en cada fila; el administrador marca los productos a recontar.
   - Si no marca ninguno, aparece **"Selecciona al menos un producto"**.
   - Luego se abre una `HojaInferior` con el campo obligatorio **"Motivo del reconteo"** y el botón *Enviar a reconteo* (Primario).
   - El conteo vuelve a **En curso** solo con esos productos, y el operador ve el motivo (7.1, punto 12).
4. **Otros estados.**
   - *Revisado*: la pantalla queda en solo lectura, con la línea *"Aprobado por Administrador · Oct 1, 15:20"*.
   - *En curso*: modo seguimiento, sin botones.

**Datos (Bodega B, por revisar, finalizado el Oct 1 a las 13:48):**

| Código | Producto | Ubicación | Sistema | Contado | Resultado | Discrepancia | Observación |
|---|---|---|---|---|---|---|---|
| PRD-002 | Camiseta algodón | P1-E02-N1 | 80 | 72 | Faltante 8 | 10 % | — |
| PRD-009 | Pantalón jean | P1-E03-N2 | 45 | 45 | Cuadra | 0 % | — |
| PRD-010 | Chompa polar | P2-E01-N1 | 30 | 35 | Sobrante 5 | 16,7 % | Llegaron 5 unidades de una devolución sin registrar. |
| PRD-011 | Medias (paquete x3) | P2-E05-N3 | 32 | 30 | Faltante 2 | 6,3 % | — |

**Resumen:** discrepancia **8 %** (15 / 187) · **10 u** faltantes · **5 u** sobrantes · **4 de 4** productos.

**Wireframe:**

```
┌──────────────────────────────────────┐
│ (← Conteos)                          │
│ Revisión · Bodega B    [Por revisar] │
│ María García · Oct 1 · 8:00–14:00    │
│ Finalizado a las 13:48               │
│ ┌ Vidrio/Oscuro ───────────────────┐ │
│ │  8 %      10 u       5 u    4/4  │ │
│ │  discrep. faltantes sobrant prod.│ │
│ └──────────────────────────────────┘ │
│ PRODUCTOS                            │
│ Camiseta algodón    80→72 [Faltante 8]│
│ Pantalón jean       45→45 [Cuadra]   │
│ Chompa polar        30→35 [Sobrante 5]│
│   "Llegaron 5 unidades de una…"      │
│ Medias (paquete x3) 32→30 [Faltante 2]│
│ [========== Aprobar ajuste ========] │ ← Primario
│ [-------- Solicitar reconteo ------] │ ← Contorno
└──────────────────────────────────────┘
```

**Frames:**

- `Admin / Revisión · Por revisar`.
- `Admin / Revisión · Confirmar ajuste`: la alerta.
- `Admin / Revisión · Reconteo`: Camiseta y Medias marcadas, con la hoja del motivo "Recontar sección textil: diferencias en camisetas y medias."
- `Admin / Revisión · Revisado`: solo lectura, con la línea de auditoría.

**Control 60-30-10:** el rojo solo aparece en *Aprobar ajuste*, los badges *Por revisar* y *Faltante*, y las discrepancias de 10 % o más.

---

### 8.5 Aprobar reportes (`AdminReportesScreen`) y Detalle de reporte (`AdminDetalleReporteScreen`)

**Propósito:** decidir si un producto reportado como defectuoso se da de baja.

**Lógica de negocio**

1. **Lista.**
   - Filtro `Segmentado`: *Por aprobar · Aprobados · Rechazados*.
   - Cada reporte es una `FilaLista` ConMiniatura con la foto, "REP-002 · Caja de cereal", "Vencido · 3 u · Almacén C", "Jose David Pacheco · Oct 2" y su `Badge`.
   - Si un filtro no tiene reportes, se muestra un `EstadoVacio`.
2. **Detalle.** Muestra:
   - la foto en 4:3;
   - el código y el `Badge`;
   - el producto, con su código, bodega y ubicación;
   - el tipo de defecto y las unidades afectadas;
   - la descripción;
   - quién lo reportó y cuándo.
3. **Aprobar** (Primario, solo si el reporte está *En revisión*).
   - Abre la `Alerta` DosBotones **"Aprobar reporte"** con *"Se darán de baja 3 unidades de Caja de cereal del stock del sistema."*
   - Al confirmar, el reporte pasa a **Aprobado**, el stock baja en las unidades afectadas y se registra quién aprobó y cuándo.
   - Si el stock actual es menor que las unidades afectadas, aparece **"Stock insuficiente"** y no se aprueba.
4. **Rechazar** (Contorno).
   - Abre una `HojaInferior` con el campo obligatorio **"Motivo del rechazo"** (`Input` Multilínea) y el botón *Rechazar reporte* (Oscuro).
   - Si el motivo está vacío, aparece **"Falta el motivo"**.
   - Al rechazar, el reporte pasa a **Rechazado** y el operador ve el motivo en su lista.
5. Un reporte ya decidido no se puede modificar: se muestra en solo lectura con la línea de auditoría o con el motivo.

**Datos:**

| Código | Producto | Tipo | Unidades | Bodega · ubicación | Reportado por | Fecha | Estado |
|---|---|---|---|---|---|---|---|
| REP-002 | Caja de cereal (PRD-003) | Vencido | 3 | Almacén C · P3-E02-N1 | Jose David Pacheco | Oct 2 | En revisión |
| REP-001 | Monitor LED 24" (PRD-001) | Dañado | 1 | Bodega A · P1-E01-N1 | Jose David Pacheco | Oct 1 | Aprobado |

En *Rechazados* no hay reportes, así que se muestra el estado vacío: "No hay reportes rechazados" / *"Aquí aparecerán los reportes que rechaces, con su motivo."*

**Wireframe (detalle):**

```
┌──────────────────────────────────────┐
│ (← Aprobar)                          │
│ ┌──────────────────────────────────┐ │
│ │           foto 4:3               │ │
│ └──────────────────────────────────┘ │
│ REP-002                [En revisión] │
│ Caja de cereal                       │
│ ┌──────────────────────────────────┐ │
│ │ Código              PRD-003      │ │
│ │ Ubicación  Almacén C · P3-E02-N1 │ │
│ │ Tipo                Vencido      │ │
│ │ Unidades afectadas  3            │ │
│ │ Reportado por  J. D. Pacheco · Oct 2│ │
│ └──────────────────────────────────┘ │
│ DESCRIPCIÓN                          │
│ Lote con fecha de caducidad pasada.  │
│ [============= Aprobar ============] │ ← Primario
│ [------------- Rechazar -----------] │ ← Contorno
└──────────────────────────────────────┘
```

**Frames:**

- `Admin / Aprobar · Por aprobar`.
- `Admin / Aprobar · Rechazados vacío`.
- `Admin / Detalle · En revisión`.
- `Admin / Detalle · Confirmar aprobación`.
- `Admin / Detalle · Motivo de rechazo`: la hoja, con "La fecha de caducidad no es legible en la foto."
- `Admin / Detalle · Rechazado`: solo lectura, con el motivo.

**Control 60-30-10:** el rojo solo aparece en *Aprobar*, el badge *En revisión* y el punto del menú.

---

### 8.6 Más (`AdminMasScreen`)

**Propósito:** reunir las secciones de administración y el cierre de sesión.

**Layout:**

1. `Titulo` "Más".
2. `Tarjeta` Vidrio de perfil: `Avatar` "AD" de 56, "Administrador" en 17 / Bold, "admin@uleam.edu.ec" en 13 `gris` y `Badge` `RolAdmin`.
3. `Eyebrow` "ADMINISTRACIÓN" y 4 `FilaLista` con "→":
   - **Productos** · "126 productos · 2 bajo mínimo";
   - **Usuarios** · "6 usuarios · 1 inactivo";
   - **Bodegas y ubicaciones** · "4 bodegas · 312 ubicaciones";
   - **Mapa de bodegas** · "Estado por estante".
4. `Boton` Texto `rojo` "Cerrar sesión", centrado, con la misma alerta de confirmación que en 7.4.

**Frames:** `Admin / Más`.

---

### 8.7 Productos (`AdminProductosScreen`) y Formulario de producto (`AdminProductoFormScreen`)

**Propósito:** administrar el catálogo que usan el conteo, el escáner y los reportes.

**Lógica de la lista**

1. **Buscador** por nombre, código interno o código de barras, y chips de bodega: *Todas · Bodega A · Bodega B · Almacén C · Oficina D*.
2. **Orden.** Alfabético; los productos inactivos van al final, con opacidad 40 %.
3. **Filas.** Cada producto con stock menor a su mínimo muestra el `Badge` *Bajo mínimo*.
4. **+ Nuevo producto** (Primario).

**Datos (muestra):**

| Producto | Código · ubicación | Bodega | Stock | Mínimo | Badge |
|---|---|---|---|---|---|
| Audífonos Bluetooth | PRD-008 · P3-E01-N2 | Bodega A | 20 u | 25 | Bajo mínimo |
| Caja de cereal | PRD-003 · P3-E02-N1 | Almacén C | 12 u | 20 | Bajo mínimo |
| Camiseta algodón | PRD-002 · P1-E02-N1 | Bodega B | 80 u | 30 | — |
| Monitor LED 24" | PRD-001 · P1-E01-N1 | Bodega A | 40 u | 10 | — |
| Mouse inalámbrico | PRD-006 · P2-E03-N1 | Bodega A | 50 u | 15 | — |
| Resma de papel | PRD-004 · Sin ubicación | Oficina D | 25 u | 10 | — |

**Campos del formulario**

| Campo | Tipo | Regla |
|---|---|---|
| Nombre | `Input` | Obligatorio |
| Código interno | `CampoLectura` | Automático y correlativo (`PRD-0NN`) |
| Código de barras | `Input` + botón *Escanear* (Oscuro) | Obligatorio, 13 dígitos numéricos (EAN-13) y único |
| Categoría | `Chip`: Electrónica, Textil, Alimentos, Suministros | Obligatorio |
| Bodega | `Chip` | Obligatorio |
| Ubicación | Chips de Pasillo, Estante y Nivel | Opcional (si no se elige, queda "Sin ubicación"). Solo muestra ubicaciones de la bodega elegida |
| Stock en sistema | `Stepper` al crear; `CampoLectura` al editar | Entero mayor o igual a 0. Después de crear el producto, solo cambia con ajustes de conteo o con bajas por reportes aprobados (nota en 11 `gris`) |
| Stock mínimo | `Stepper` | Entero mayor o igual a 0 |

**Lógica del formulario**

1. **Validaciones:**
   - campos obligatorios → **"Campos incompletos"**;
   - código de barras con formato inválido → **"Código no válido"** con *"El código de barras debe tener 13 dígitos."*;
   - código de barras repetido → **"Código duplicado"** con *"Ya existe un producto con ese código de barras."*
2. **Guardar** (Primario): vuelve a la lista con el `Aviso` *"Producto guardado"*.
3. **Desactivar producto** (`Boton` Texto `rojo`, solo al editar).
   - Abre una `Alerta` DosBotones.
   - Si el producto está en un conteo en curso, aparece **"No se puede desactivar"** con *"El producto está en un conteo en curso."*
   - Un producto inactivo no aparece en conteos nuevos ni en el escáner.

**Frames:** `Admin / Productos`, `Admin / Producto · Nuevo`, `Admin / Producto · Editar` (Mouse inalámbrico), `Admin / Producto · Código duplicado`.

---

### 8.8 Usuarios (`AdminUsuariosScreen`) y Formulario de usuario (`AdminUsuarioFormScreen`)

**Propósito:** crear las cuentas, asignar roles y bodegas, y activar o desactivar el acceso.

**Lógica de negocio**

1. **Lista.** Tiene un buscador. Cada usuario es una `FilaLista` con nombre, correo, `Badge` de rol (*Administrador* u *Operador*), bodega asignada y `Toggle` de activo a la derecha.
2. **Formulario** (+ Nuevo usuario, o al tocar un usuario):

| Campo | Tipo | Regla |
|---|---|---|
| Nombre completo | `Input` | Obligatorio |
| Correo institucional | `Input` | Obligatorio; debe terminar en `@uleam.edu.ec` y ser único |
| Rol | `Segmentado`: *Operador · Administrador* | Obligatorio |
| Bodega asignada | `Chip` | Obligatoria si el rol es Operador; se oculta para Administrador |
| Contraseña temporal | `Input` + `Boton` Texto *Generar* | Obligatoria al crear; mínimo 6 caracteres. Se muestra una sola vez para entregarla al usuario |

3. **Reglas:**
   - nadie puede desactivarse a sí mismo → **"Acción no permitida"**;
   - siempre debe quedar al menos un administrador activo;
   - para desactivar a un operador con un conteo en curso, primero hay que reasignar ese conteo (**"Reasigna su conteo antes de desactivarlo."**);
   - un usuario inactivo no puede iniciar sesión (alerta *Usuario inactivo* en el Login).

**Datos:**

| Nombre | Correo | Rol | Bodega | Activo |
|---|---|---|---|---|
| Administrador | admin@uleam.edu.ec | Administrador | — | Sí |
| Jose David Pacheco | estudiante@uleam.edu.ec | Operador | Bodega A | Sí |
| Carlos López | clopez@uleam.edu.ec | Operador | Bodega A | Sí |
| María García | mgarcia@uleam.edu.ec | Operador | Bodega B | Sí |
| Juan Pérez | jperez@uleam.edu.ec | Operador | Almacén C | Sí |
| Ana Martínez | amartinez@uleam.edu.ec | Operador | Oficina D | No |

**Frames:** `Admin / Usuarios`, `Admin / Usuario · Nuevo`, `Admin / Usuario · Acción no permitida` (el administrador intenta desactivarse a sí mismo).

---

### 8.9 Bodegas y ubicaciones (`AdminBodegasScreen`) y Configurar bodega (`AdminBodegaFormScreen`)

**Propósito:** definir las bodegas y su distribución física. De esta configuración salen los códigos de ubicación, el escáner y el mapa.

**Lógica de negocio**

1. **Lista.** Una `Tarjeta` Vidrio por bodega con el nombre, la categoría, el jefe de bodega, la distribución ("4 pasillos × 6 estantes × 4 niveles"), el total de ubicaciones y un mini plano. Arriba va *+ Nueva bodega* (Primario).
2. **Configurar:**
   - Campos: nombre (obligatorio y único), categoría principal (`Chip`) y jefe de bodega (`Chip` con operadores activos).
   - Tres `Stepper`: **Pasillos** (1 a 8), **Estantes por pasillo** (1 a 10) y **Niveles por estante** (1 a 5).
   - Una vista previa en vivo del plano (`Estante` Vacio) con el texto *"96 ubicaciones · de P1-E01-N1 a P4-E06-N4"*.
3. **Restricción.** Si un cambio elimina ubicaciones que tienen productos, aparece **"Ubicaciones en uso"** con *"Hay 3 productos en ubicaciones que se eliminarían. Reubícalos primero con el Escáner."* y el cambio no se guarda.
4. **Guardar** (Primario): el Mapa y el Escáner usan la nueva distribución de inmediato.

**Datos:**

| Bodega | Categoría | Jefe de bodega | Distribución | Ubicaciones |
|---|---|---|---|---|
| Bodega A | Electrónica | Carlos López | 4 × 6 × 4 | 96 |
| Bodega B | Textil | María García | 3 × 6 × 4 | 72 |
| Almacén C | Alimentos | Juan Pérez | 5 × 6 × 4 | 120 |
| Oficina D | Suministros | Ana Martínez | 2 × 4 × 3 | 24 |

En total son 312 ubicaciones, el mismo número que muestra *Más*.

**Frames:** `Admin / Bodegas`, `Admin / Bodega · Configurar` (Bodega A), `Admin / Bodega · Ubicaciones en uso`.

---

## 9. Estructura del archivo de Figma

| Página | Contenido |
|---|---|
| `00 Portada` | Nombre "Inventrex", lema y miniaturas de Login, Inicio y Panel |
| `01 Fundamentos` | Variables `colores` con su proporción 60-30-10, estilos de texto, estilos de efecto y el componente `Fondo` |
| `02 Componentes` | Todos los componentes de las secciones 4.1 a 4.26, con sus variantes |
| `03 Operador` | Login, Inicio (con Perfil), Inventarios, Reporte, Gestión, Conteo, Escáner y Mapa, en ese orden y en filas |
| `04 Administrador` | Panel, Conteos, Programar conteo, Revisión de conteo, Aprobar, Detalle de reporte, Más, Productos, Formulario de producto, Usuarios, Formulario de usuario, Bodegas y Configurar bodega |
| `05 Prototipo` | Los 7 flujos que se listan abajo |
| `Notas` | Decisiones que tomaste y que no estaban en esta guía |

Flujos de la página `05 Prototipo`:

1. **Operador:** Login → Inicio → las 4 pestañas.
2. **Conteo:** Inventarios → Conteo → Reportar defecto → Conteo → Finalizar.
3. **Escáner:** Inventarios → Paso 1 → Paso 2 → Ubicación asignada.
4. **Mapa:** Gestión → Mapa → Estante.
5. **Administrador:** Login → Panel → Programar conteo.
6. **Revisión:** Conteos → Revisión → Aprobar ajuste.
7. **Reportes:** Aprobar → Detalle → Aprobar o Rechazar.

**Correspondencia con el código**

| Figma | Archivo |
|---|---|
| `LoginScreen` | `src/screens/loginScreen.jsx` |
| `InicioScreen` | `src/screens/inicioScreen.jsx` |
| `InventarioScreen` | `src/screens/solicitudScreen.jsx` |
| `ReporteScreen` | `src/screens/reporteScreen.jsx` |
| `GestionScreen` | `src/screens/perfilScreen.jsx` |
| `ConteoScreen` | `src/screens/conteoScreen.jsx` (propuesto) |
| `EscanerScreen` | `src/screens/escanerScreen.jsx` (propuesto) |
| `MapaBodegaScreen` | `src/screens/mapaBodegaScreen.jsx` (propuesto) |
| `Admin…Screen` | `src/screens/admin/` + nombre en camelCase, por ejemplo `adminPanelScreen.jsx` (propuesto) |
| `MenuInferior` | `src/components/menuInferior.jsx` |
| `Titulo` | `src/components/titulo.jsx` |
| `Fondo` | `src/components/fondo.jsx` |
| Variables `colores` y estilos de vidrio | `src/theme.js` |

---

## 10. Checklist de entrega

Antes de terminar, revisa que se cumpla todo esto:

- [ ] Solo se usan las variables de `colores` y los valores auxiliares de la sección 3.1. No hay azul, verde ni ámbar.
- [ ] En cada pantalla el rojo ocupa como mucho el 10 % y aparece solo donde lo indica su *Control 60-30-10*.
- [ ] No hay emojis ni íconos: solo texto, las iniciales de los avatares y los signos tipográficos permitidos.
- [ ] Todas las tarjetas usan Vidrio/Claro o Vidrio/Oscuro con Background blur, y todas las pantallas tienen el componente `Fondo` detrás.
- [ ] El menú inferior es negro sólido, flota a 16 / 16 / 20 de los bordes y marca la pestaña activa con un punto rojo.
- [ ] Cada rol tiene su menú y ve solo sus pantallas: 8 pantallas principales con menú y el resto como subpantallas con `BotonVolver`.
- [ ] Los textos y los datos coinciden literalmente con esta guía, incluidos los cálculos de ejemplo: Conteo 15 % → 23,5 %, Revisión de Bodega B 8 %, Panel 12,5 % y 312 ubicaciones.
- [ ] Los estantes del mapa usan solo las 5 variantes de `Estante` y su leyenda.
- [ ] Están todos los frames de estado: alertas, observación obligatoria, conteo ciego, código no registrado, confirmaciones, hojas inferiores y estados vacíos.
- [ ] El prototipo recorre los 7 flujos de la sección 9.
- [ ] Todo usa Auto Layout y componentes con variantes; no hay elementos sueltos duplicados.
- [ ] La página `Notas` registra cualquier decisión propia.

---

## 11. Notas para implementar en código (después de Figma)

- **Navegación.** Pasar de `pantallaActual` a React Navigation: una pila por rol con pestañas, para tener *Volver* y pasar parámetros como la bodega o el producto entre pantallas.
- **Escáner.** `expo-camera`: el componente `CameraView` con `barcodeScannerSettings` para los formatos `ean13`, `code128` y `qr`.
- **Datos y roles.** Productos, conteos, reportes y usuarios deben compartirse entre pantallas y roles. La solución inmediata es un `Context` en `App.js`; para que los datos persistan y los roles sean reales hace falta un backend con autenticación, como Supabase o Firebase.
- **Desenfoque real.** `expo-blur`, que en Android requiere configuración adicional.
