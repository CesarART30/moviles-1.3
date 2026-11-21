# Inventrex — Guía de lógica de negocio

Esta guía explica **qué reglas sigue Inventrex, por qué existen y cómo funcionan en el código**. Sirve para entender el sistema antes de modificarlo, para presentarlo y para verificar que una pantalla nueva respete las reglas existentes.

**Cómo leerla**

- Cada regla tiene un identificador (`RN-01`, `RN-02`, …) que se usa en toda la documentación.
- Cada regla y cada proceso indica su estado:
  - **Implementada**: funciona hoy en el código.
  - **Parcial**: existe en el código, pero incompleta o sin efecto sobre el resto del sistema.
  - **Planificada**: diseñada en [`GUIA_DISENO_FIGMA.md`](./GUIA_DISENO_FIGMA.md), pero todavía sin programar.
- La guía describe el código de la carpeta `MOBILES NATIVASS\primera-app-movil` al 25 de octubre de 2026.

---

## 1. Propósito del negocio

Inventrex apoya el **control de inventario físico en bodegas**. En un conteo hay que comparar lo que existe físicamente con lo que dice el sistema, registrar las diferencias, documentar los productos dañados y cerrar todo dentro de un horario. La app resuelve tres necesidades:

| Necesidad | Cómo la atiende | Estado |
|---|---|---|
| Saber qué bodegas tienen diferencias y cuánto tiempo queda | Inventarios: discrepancia por bodega con semáforo y cronómetro | Implementada (con datos de ejemplo) |
| Documentar productos defectuosos con evidencia | Reportar defecto: formulario con foto obligatoria, ubicación GPS y lista de reportes | Implementada |
| Supervisar las revisiones de cada bodega | Gestión: estado, jefe de bodega y observaciones | Implementada (con datos de ejemplo) |
| Contar productos y calcular faltantes y sobrantes | Conteo | Planificada |
| Ubicar productos dentro de la bodega | Escáner de códigos y Mapa de bodega | Planificada |
| Controlar el proceso desde la administración | Rol administrador: programar, revisar, aprobar y administrar | Planificada |

El indicador central del negocio es la **discrepancia**: el porcentaje de diferencia entre lo contado y lo registrado. Todas las alertas visuales de la app se basan en ella (sección 6).

---

## 2. Actores y permisos

| Actor | Descripción | Estado |
|---|---|---|
| **Operador** | Personal de bodega que cuenta, reporta defectos y consulta revisiones. Hoy es el único usuario que existe en la app | Implementado |
| **Administrador** | Responsable del inventario: programa conteos, aprueba ajustes y reportes, y administra el catálogo, los usuarios y las bodegas | Planificado |
| **Jefe de bodega** | No es un usuario de la app: es un dato de cada bodega que aparece en Gestión | Implementado como dato |

**Matriz de permisos**

| Acción | Operador | Administrador | Estado |
|---|---|---|---|
| Iniciar sesión | Sí | Sí | Implementada (solo la cuenta de operador) |
| Ver Inicio, Inventarios y Gestión | Sí | — | Implementada |
| Crear reportes de defecto | Sí | No | Implementada |
| Contar productos y finalizar un conteo | Sí | No | Planificada |
| Escanear y asignar ubicaciones | Sí | No | Planificada |
| Ver el mapa de bodega | Sí | Sí | Planificada |
| Programar conteos | No | Sí | Planificada |
| Aprobar ajustes de stock o pedir reconteo | No | Sí | Planificada |
| Aprobar o rechazar reportes | No | Sí | Planificada |
| Administrar productos, usuarios y bodegas | No | Sí | Planificada |

---

## 3. Modelo de dominio

### 3.1 Entidades

| Entidad | Atributos | Dónde vive hoy | Estado |
|---|---|---|---|
| **Usuario** | correo, contraseña (rol, bodega y activo están planificados) | Constantes en `loginScreen.jsx` | Parcial: una sola cuenta fija |
| **Bodega** | nombre, categoría, fecha del último conteo, discrepancia, productos contados | Arreglo `inventarios` en `solicitudScreen.jsx` | Parcial: mezcla bodega y resumen del conteo |
| **Producto** | id, código (`PRD-0NN`), nombre, bodega | Arreglo `productos` en `reporteScreen.jsx` | Parcial: 4 productos, sin stock ni ubicación |
| **Reporte de defecto** | id, código (`REP-00N`), producto, tipo, descripción, imagen, fecha, estado | Estado `reportes` en `App.js` | Implementada |
| **Revisión de bodega** | nombre, bodega, estado, observaciones, fecha, jefe de bodega | Arreglo `inventariosGestionados` en `perfilScreen.jsx` | Implementada (datos fijos) |
| **Ubicación GPS** | latitud, longitud, precisión | Estado local `ubicacion` en `reporteScreen.jsx` | Parcial: se muestra pero no se guarda |
| **Conteo** y **línea de conteo** | bodega, responsable, ventana, estado; producto, sistema, contado, observación | — | Planificada |
| **Ubicación interna** | pasillo, estante, nivel (`P2-E03-N1`) | — | Planificada |

### 3.2 Relaciones (modelo objetivo)

```
Bodega 1 ──── N Ubicación interna (P-E-N)
Bodega 1 ──── N Producto ──── 0..1 Ubicación interna
Bodega 1 ──── N Conteo ──── N Línea de conteo ──── 1 Producto
Usuario (operador) 1 ──── N Conteo (responsable)
Producto 1 ──── N Reporte de defecto ──── 0..1 Ubicación GPS
Usuario 1 ──── N Reporte de defecto (quién reportó / quién decidió)
```

> **Brecha actual:** las entidades no están conectadas entre sí. Los productos de *Reportar defecto* no son los de *Inventarios* y los reportes no aparecen en *Gestión*. Cada pantalla tiene su propia copia de datos de ejemplo (sección 9).

---

## 4. Cómo funciona la lógica en el código

### 4.1 Arquitectura del estado

```
index.js ──▶ App.js (componente raíz)
              ├─ usuarioAutenticado  ← decide si se muestra Login o la app
              ├─ pantallaActual      ← decide qué pantalla se dibuja
              └─ reportes            ← lista compartida de reportes de defecto
                   │
                   ├─▶ LoginScreen       recibe onLogin()
                   ├─▶ InicioScreen      sin estado
                   ├─▶ InventarioScreen  estado local: inventarios, ubicacion
                   ├─▶ ReporteScreen     recibe reportes + setReportes; estado local del formulario
                   ├─▶ GestionScreen     estado local: inventariosGestionados
                   └─▶ MenuInferior      recibe pantallaActual + cambiarPantalla()
```

En el código hay tres patrones:

1. **Renderizado condicional como navegación.** `App.js` decide la pantalla con un `if / else if` según `pantallaActual`. Solo existe una pantalla a la vez.
2. **Levantar el estado.** Un hijo no cambia la navegación ni los datos compartidos por su cuenta: llama a una función que recibe por props (`onLogin`, `cambiarPantalla`, `setReportes`), y el padre actualiza su estado.
3. **Estado local para lo efímero.** Lo que solo importa mientras la pantalla está abierta (el formulario a medio llenar, la ubicación consultada, la lectura del acelerómetro) vive dentro de la pantalla.

**Consecuencia:** al cambiar de pestaña, la pantalla anterior se desmonta y pierde su estado local. Por eso `reportes` vive en `App.js` y el formulario no (RN-16).

### 4.2 Dónde agregar una regla nueva

| Si la regla… | Va en… |
|---|---|
| Afecta datos que usan varias pantallas | El estado de `App.js` (o un `Context`), pasado por props |
| Solo afecta a una pantalla | Una función dentro de esa pantalla, como `enviarReporte` |
| Es un cálculo reutilizable (discrepancia, códigos) | Una función pura en un archivo propio (por ejemplo `src/logica/inventario.js`), con una prueba |
| Es un color o un estilo por estado | `src/theme.js` y la función de estilo de la pantalla |

---

## 5. Procesos

### 5.1 Autenticación — **Implementada**

**Archivo:** `src/screens/loginScreen.jsx`, función `iniciarSesion`.

1. El usuario escribe correo y contraseña.
2. Si algún campo está vacío o solo tiene espacios, aparece la alerta *Datos incompletos* (RN-01).
3. Si coinciden con la cuenta de prueba, se llama a `onLogin()` y `App.js` pone `usuarioAutenticado = true` (RN-02).
4. Si no coinciden, aparece la alerta *Credenciales incorrectas*.

No hay cierre de sesión: `usuarioAutenticado` vuelve a `false` solo al recargar la app. El cierre de sesión y el rol por cuenta están planificados (RN-03 a RN-05).

### 5.2 Navegación — **Implementada**

**Archivos:** `App.js` y `src/components/menuInferior.jsx`.

- Después del login, la pantalla inicial es Inicio (RN-06).
- El menú tiene 4 opciones con rutas fijas: `inicio`, `inventario`, `reporte` y `gestion`. Cada opción llama a `cambiarPantalla(ruta)` y la activa se marca con un punto rojo (RN-07).
- No hay historial: el botón *atrás* de Android cierra la app.

### 5.3 Monitoreo de inventarios — **Implementada con datos de ejemplo**

**Archivo:** `src/screens/solicitudScreen.jsx` (componente `InventarioScreen`).

- **Semáforo de discrepancia.** Cada bodega muestra su porcentaje de discrepancia con una barra cuyo color sale de `getDiscrepancyColor` (RN-08).
- **Cronómetro.** Muestra el tiempo disponible sobre una jornada de 8 horas (RN-09). Hoy los valores son fijos (2h 15m) y el tiempo no corre.
- **Botones sin acción:** *+ Crear Inventario* y *Ver detalles →*.
- **Ubicación sin conectar.** La pantalla define `obtenerUbicacion`, pero ningún botón la usa y tiene errores (sección 10).

### 5.4 Reporte de defecto — **Implementada**

**Archivos:** `src/screens/reporteScreen.jsx` (formulario y lista) y `App.js` (dueño de la lista).

```
Elegir producto ─▶ Elegir tipo ─▶ Escribir descripción ─▶ Adjuntar foto ─▶ (Opcional: ubicación GPS)
        └──────────────────────── Enviar reporte ──────────────────────────────┘
                                         │
             ┌─────────── ¿producto, tipo y descripción? ── no ──▶ "Campos incompletos."
             │ sí
             ├─────────── ¿hay foto? ─────────────────────── no ──▶ "Falta la evidencia."
             │ sí
             ▼
  Crear reporte REP-00N · estado "En revisión" · fecha de hoy
  ─▶ agregarlo al inicio de la lista (App.js) ─▶ limpiar formulario ─▶ "Reporte enviado."
```

| Paso | Regla |
|---|---|
| Producto | Uno solo, de la lista de 4 (RN-10) |
| Tipo de defecto | Uno solo: Dañado, Vencido, Incompleto u Otro (RN-10) |
| Descripción | Obligatoria; si solo tiene espacios se considera vacía (RN-10) |
| Foto | Obligatoria; con cámara o galería, permiso previo, recorte 4:3 y calidad 0.8 (RN-11, RN-12) |
| Código | `REP-` + (cantidad de reportes + 1) con tres dígitos (RN-13) |
| Estado inicial | *En revisión* (RN-14) |
| Orden de la lista | El más reciente primero (RN-15) |
| Persistencia | Se conserva al cambiar de pestaña, pero no al cerrar la app (RN-16) |

**Ubicación GPS** (**Parcial**, función `obtenerUbicacion`, RN-17):

1. Pide permiso de ubicación en primer plano. Si se niega, aparece la alerta *Permiso requerido*.
2. Obtiene la posición con precisión `Balanced`.
3. Muestra latitud y longitud con 6 decimales y la precisión aproximada en metros (o "Desconocida").
4. Mientras consulta, el botón se desactiva y dice "Obteniendo ubicación...".

> **Brecha:** la ubicación **no se guarda en el reporte** (el objeto `nuevoReporte` no la incluye) y tampoco se limpia al enviar. Hoy es solo informativa.

**Detector de movimiento** (**Parcial**, `useEffect` con `Accelerometer`, RN-18):

1. Lee el acelerómetro cada 500 ms (no funciona en web).
2. Calcula la magnitud de la aceleración y la compara con la lectura anterior (fórmula en la sección 6.3).
3. Si la diferencia supera 0,35 g, muestra "Movimiento detectado"; si no, "Sin movimiento brusco". También muestra los valores X, Y y Z.

> **Brecha:** el resultado no influye en el reporte ni en ninguna regla; solo se muestra. **Propuesta:** usarlo para avisar *"Mantén el teléfono quieto"* antes de tomar la foto, para que la evidencia no salga movida, o guardar en el reporte que hubo movimiento brusco.

### 5.5 Supervisión de revisiones (Gestión) — **Implementada con datos de ejemplo**

**Archivo:** `src/screens/perfilScreen.jsx` (componente `GestionScreen`).

- Lista las revisiones de cada bodega con jefe de bodega, observaciones y estado.
- `getEstadoEstilo` decide el badge: **Revisado** en negro y **cualquier otro estado** con el estilo de *Pendiente* en rojo (RN-19).
- *Ver todas las bodegas* y *Ver ubicación en mapa →* todavía no tienen acción.

### 5.6 Procesos planificados

El detalle de pantallas, textos y alertas de estos procesos está en [`GUIA_DISENO_FIGMA.md`](./GUIA_DISENO_FIGMA.md). Aquí solo se resume su lógica.

| Proceso | Lógica resumida | Reglas | Guía |
|---|---|---|---|
| **Conteo de productos** | El operador registra la cantidad contada; la diferencia contra el sistema se calcula en vivo. Al finalizar, los productos sin contar pasan a faltantes. El conteo queda *Por revisar* | RN-20 a RN-27 | 7.1 |
| **Asignación de ubicaciones** | Se escanea el producto (EAN-13) y luego la etiqueta del estante, o se elige pasillo, estante y nivel. Se valida que el producto exista, sea de la bodega y esté activo | RN-28 a RN-30 | 7.2 |
| **Mapa de bodega** | Plano por estante; cada estante toma el color del peor estado de sus productos | RN-31 | 7.3 |
| **Programación de conteos** | El administrador define bodega, responsable, fecha, ventana horaria, alcance y conteo ciego, con validación de choques de horario | RN-32 a RN-35 | 8.3 |
| **Revisión y ajuste** | El administrador aprueba el ajuste (el stock pasa a ser lo contado, con auditoría) o pide reconteo con motivo | RN-36, RN-37 | 8.4 |
| **Aprobación de reportes** | Aprobar da de baja las unidades afectadas; rechazar exige un motivo | RN-38 a RN-40 | 8.5 |
| **Administración** | Catálogo con EAN-13 único; usuarios con correo institucional; bodegas con su distribución de ubicaciones | RN-41 a RN-45 | 8.7 a 8.9 |

---

## 6. Cálculos y fórmulas

### 6.1 Implementados

**Tiempo disponible** (RN-09, `solicitudScreen.jsx`)

```
porcentajeTiempo = (horas × 60 + minutos) / (8 × 60) × 100
Ejemplo: (2 × 60 + 15) / 480 × 100 = 135 / 480 × 100 = 28,1 %  → ancho de la barra
```

**Semáforo de discrepancia** (RN-08, `getDiscrepancyColor`)

| Discrepancia | Color | Significado |
|---|---|---|
| Menos de 10 % | Negro `#0a0a0a` | Aceptable |
| De 10 % a 19 % | Rojo claro `#f87171` | Requiere revisión |
| 20 % o más | Rojo `#dc2626` | Crítica |

La barra de cada bodega ocupa un ancho igual al porcentaje de discrepancia.

**Código de reporte** (RN-13, `enviarReporte`)

```
codigo = "REP-" + rellenar_con_ceros(cantidad_de_reportes + 1, 3 dígitos)
Con 2 reportes en la lista → REP-003
```

**Detector de movimiento** (RN-18)

```
magnitud = √(x² + y² + z²)                    (en g, cada 500 ms)
movimiento = abs(magnitud_actual − magnitud_anterior) > 0,35
```

Con el teléfono quieto, la magnitud se mantiene cerca de 1 g (la gravedad). Un movimiento brusco la cambia más de 0,35 g entre dos lecturas.

### 6.2 Planificados

**Diferencia y discrepancia de un producto** (RN-21)

```
diferencia = contado − sistema          (< 0 faltante · = 0 cuadra · > 0 sobrante)
discrepancia = abs(diferencia) / sistema × 100     (si sistema = 0 y contado > 0 → 100 %)
```

**Discrepancia de una bodega** (RN-22)

```
discrepancia_bodega = Σ abs(diferencias) / Σ sistema × 100
```

**Ejemplo (Bodega A, conteo cíclico de 5 productos):**

| Producto | Sistema | Contado | Diferencia |
|---|---|---|---|
| Monitor LED 24" | 40 | 34 | −6 |
| Teclado USB | 60 | 60 | 0 |
| Mouse inalámbrico | 50 | 38 | −12 |
| Cable HDMI 2 m | 30 | 39 | +9 |
| Audífonos Bluetooth | 20 | sin contar | — |

- **Parcial:** (6 + 0 + 12 + 9) / (40 + 60 + 50 + 30) = 27 / 180 = **15 %** → revisar.
- **Al finalizar sin contar los audífonos** (pasan a 0, RN-25): (27 + 20) / (180 + 20) = 47 / 200 = **23,5 %** → crítica.

**Discrepancia promedio** (Panel del administrador): promedio de la última discrepancia de cada bodega → (15 + 8 + 22 + 5) / 4 = **12,5 %**.

---

## 7. Estados y ciclos de vida

### 7.1 Reporte de defecto

```
                 (operador)               (administrador, planificado)
   [nuevo] ──▶ En revisión ──┬──▶ Aprobado   → se dan de baja las unidades afectadas
                             └──▶ Rechazado  → con motivo visible para el operador
```

| Estado | Badge | Estado en la app |
|---|---|---|
| En revisión | Fondo rojo suave, texto rojo | Implementado: lo asigna `enviarReporte` |
| Aprobado | Negro | Solo aparece en los datos de ejemplo; la aprobación está planificada |
| Rechazado | Contorno negro | Planificado; hoy caería en el badge gris por defecto |

### 7.2 Conteo — **Planificado**

```
Programado ──▶ En curso ──▶ Por revisar ──▶ Revisado
                  ▲              │
                  └── reconteo ──┘
```

| Transición | Disparador | Regla |
|---|---|---|
| Programado → En curso | Llega la hora de inicio | RN-32 |
| En curso → Por revisar | El operador finaliza o se agota el tiempo | RN-25, RN-26 |
| Por revisar → Revisado | El administrador aprueba el ajuste | RN-36 |
| Por revisar → En curso | El administrador pide reconteo con motivo | RN-37 |

En Gestión, el operador ve **Revisado** solo cuando el conteo está *Revisado*, y **Pendiente** en cualquier otro estado. Esto ya coincide con la lógica actual de `getEstadoEstilo` (RN-19).

---

## 8. Catálogo de reglas de negocio

| ID | Regla | Estado | Dónde |
|---|---|---|---|
| RN-01 | No se puede iniciar sesión con correo o contraseña vacíos (los espacios no cuentan) | Implementada | `loginScreen.jsx` · `iniciarSesion` |
| RN-02 | Solo entra la cuenta de prueba `estudiante@uleam.edu.ec` / `123456` | Implementada | `loginScreen.jsx` · constantes |
| RN-03 | El rol lo define la cuenta: operador → Inicio; administrador (`admin@uleam.edu.ec` / `admin123`) → Panel | Planificada | Guía 5.1 |
| RN-04 | Un usuario inactivo no puede iniciar sesión | Planificada | Guía 6.1 |
| RN-05 | Se puede cerrar sesión desde el perfil (operador) o desde *Más* (administrador) | Planificada | Guía 7.4 y 8.6 |
| RN-06 | Después del login se abre Inicio | Implementada | `App.js` · `pantallaActual = 'inicio'` |
| RN-07 | Se navega solo con el menú inferior; se muestra una pantalla a la vez | Implementada | `App.js`, `menuInferior.jsx` |
| RN-08 | Semáforo de discrepancia: menos de 10 % negro, de 10 % a 19 % rojo claro, 20 % o más rojo | Implementada | `solicitudScreen.jsx` · `getDiscrepancyColor` |
| RN-09 | El tiempo disponible se muestra como proporción de una jornada de 8 h | Parcial: valores fijos | `solicitudScreen.jsx` · `porcentajeTiempo` |
| RN-10 | Un reporte necesita producto, tipo de defecto y descripción no vacía | Implementada | `reporteScreen.jsx` · `enviarReporte` |
| RN-11 | Un reporte necesita una foto como evidencia | Implementada | `reporteScreen.jsx` · `enviarReporte` |
| RN-12 | Para usar la cámara o la galería se pide permiso. La foto se recorta en 4:3 con calidad 0.8. Si se cancela, no cambia nada | Implementada | `tomarFoto`, `seleccionarImagen` |
| RN-13 | El código del reporte es correlativo: `REP-` + (cantidad + 1), con tres dígitos | Implementada | `enviarReporte` |
| RN-14 | Todo reporte nuevo nace *En revisión* | Implementada | `enviarReporte` |
| RN-15 | Los reportes se listan del más reciente al más antiguo | Implementada | `setReportes([nuevo, ...reportes])` |
| RN-16 | Los reportes se conservan al cambiar de pestaña, pero no al cerrar la app. El formulario a medio llenar se pierde al salir | Implementada | Estado `reportes` en `App.js` |
| RN-17 | Se puede consultar la ubicación GPS con permiso; se muestran latitud, longitud y precisión | Parcial: no se guarda en el reporte | `reporteScreen.jsx` · `obtenerUbicacion` |
| RN-18 | Se detecta movimiento brusco si la magnitud de la aceleración cambia más de 0,35 g entre lecturas de 500 ms | Parcial: solo informativo | `reporteScreen.jsx` · `useEffect` |
| RN-19 | Una revisión es *Revisado* o *Pendiente*; cualquier estado distinto de Revisado se muestra como Pendiente | Implementada | `perfilScreen.jsx` · `getEstadoEstilo` |
| RN-20 | La cantidad en sistema es de solo lectura para el operador; con conteo ciego no se muestra | Planificada | Guía 7.1 |
| RN-21 | Diferencia = contado − sistema; faltante, cuadra o sobrante; discrepancia del producto en % | Planificada | Guía 7.1 · sección 6.2 |
| RN-22 | Discrepancia de bodega = Σ abs(diferencias) / Σ sistema | Planificada | Sección 6.2 |
| RN-23 | La observación es obligatoria si la discrepancia del producto es de 20 % o más | Planificada | Guía 7.1 |
| RN-24 | Recontar un producto reemplaza el valor anterior | Planificada | Guía 7.1 |
| RN-25 | Al finalizar, los productos sin contar se registran con 0 (faltante total) | Planificada | Guía 7.1 |
| RN-26 | Si se agota el tiempo, el conteo se cierra solo con la regla RN-25 | Planificada | Guía 7.1 |
| RN-27 | Las unidades defectuosas se cuentan igual; el reporte sirve para darlas de baja | Planificada | Guía 7.1 |
| RN-28 | Un producto se identifica por su código de barras EAN-13; si no existe, es de otra bodega o está inactivo, no se puede asignar | Planificada | Guía 7.2 |
| RN-29 | Una ubicación tiene el formato `P{pasillo}-E{estante}-N{nivel}` y solo existe si el administrador la configuró | Planificada | Guía 5.4 y 8.9 |
| RN-30 | Asignar la misma ubicación que ya tiene el producto no genera cambios. Cada asignación queda en el historial | Planificada | Guía 7.2 |
| RN-31 | En el mapa, cada estante toma el peor estado de sus productos: crítica > media > sin contar > sin novedad > vacío | Planificada | Guía 7.3 |
| RN-32 | Un conteo programado empieza a la hora de inicio y su cronómetro corre hasta la hora de fin | Planificada | Guía 8.3 |
| RN-33 | Un conteo dura como máximo 8 h y no puede programarse en una fecha pasada | Planificada | Guía 8.3 |
| RN-34 | Una bodega o un responsable no pueden tener dos conteos en el mismo horario | Planificada | Guía 8.3 |
| RN-35 | El alcance puede ser toda la bodega, una categoría o productos seleccionados (conteo cíclico) | Planificada | Guía 8.3 |
| RN-36 | Aprobar un ajuste reemplaza el stock del sistema por lo contado, no se puede deshacer y queda registrado quién lo hizo y cuándo | Planificada | Guía 8.4 |
| RN-37 | Un reconteo exige al menos un producto y un motivo; el conteo vuelve a *En curso* solo con esos productos | Planificada | Guía 8.4 |
| RN-38 | Un reporte indica las unidades afectadas: mínimo 1 y máximo el stock del producto | Planificada | Guía 6.4 |
| RN-39 | Aprobar un reporte da de baja sus unidades afectadas; si el stock no alcanza, no se aprueba | Planificada | Guía 8.5 |
| RN-40 | Rechazar un reporte exige motivo; un reporte decidido no se modifica | Planificada | Guía 8.5 |
| RN-41 | El stock de un producto solo se fija al crearlo; después cambia únicamente por ajustes de conteo o bajas aprobadas | Planificada | Guía 8.7 |
| RN-42 | El código de barras es obligatorio, de 13 dígitos y único | Planificada | Guía 8.7 |
| RN-43 | Un producto en un conteo en curso no se puede desactivar; uno inactivo no aparece en conteos ni en el escáner | Planificada | Guía 8.7 |
| RN-44 | El correo de un usuario debe ser `@uleam.edu.ec` y único. Nadie puede desactivarse a sí mismo y siempre debe quedar un administrador activo | Planificada | Guía 8.8 |
| RN-45 | No se puede reducir la distribución de una bodega si elimina ubicaciones con productos | Planificada | Guía 8.9 |

---

## 9. Validaciones y mensajes implementados

| Pantalla | Disparador | Título | Mensaje |
|---|---|---|---|
| Login | Correo o contraseña vacíos | Datos incompletos | Por favor ingresa correo y contraseña. |
| Login | Credenciales que no coinciden | Credenciales incorrectas | El correo o la contraseña son incorrectos. |
| Reporte | Falta producto, tipo o descripción | Campos incompletos. | Selecciona el producto, el tipo de defecto y escribe una descripción. |
| Reporte | Falta la foto | Falta la evidencia. | Toma o selecciona una foto del producto defectuoso. |
| Reporte | Envío correcto | Reporte enviado. | El reporte quedó en revisión. |
| Reporte | Permiso de galería denegado | Permiso denegado para acceder a la galería. | No se puede acceder a la galería de imágenes. |
| Reporte | Permiso de cámara denegado | Permiso denegado para acceder a la cámara. | No se puede acceder a la cámara. |
| Reporte | Error al elegir la imagen | Error al seleccionar la imagen. | Ocurrió un error al intentar seleccionar la imagen. |
| Reporte | Error al tomar la foto | Error al tomar la foto. | Ocurrió un error al intentar tomar la foto. |
| Reporte | Permiso de ubicación denegado | Permiso requerido | Autoriza el acceso a tu ubicacion para continuar |
| Reporte | Error al obtener la ubicación | Ubicacion no disponible | No se pudo obtener la ubicacion actual. |

Los mensajes de los procesos planificados están en la guía de Figma, en la sección de cada pantalla.

> Los textos de ubicación están sin tildes ("ubicacion") en el código. Conviene corregirlos para que coincidan con el resto de la app.

---

## 10. Datos de ejemplo y brechas conocidas

### 10.1 Datos de ejemplo actuales

| Dato | Archivo | Comentario |
|---|---|---|
| Cuenta de operador | `loginScreen.jsx` | Fija en el código |
| Métricas de Inicio (2, 3, 4), responsable y ventana 8:00 AM – 2:00 PM | `inicioScreen.jsx` | Texto fijo; las métricas no tienen definición de negocio |
| 4 bodegas con discrepancia (15 %, 8 %, 22 %, 5 %) | `solicitudScreen.jsx` | No salen de ningún conteo |
| 4 productos | `reporteScreen.jsx` | No están ligados a las bodegas de Inventarios |
| 2 reportes iniciales (REP-001 Aprobado, REP-002 En revisión) | `App.js` | Único dato compartido entre pantallas |
| 4 revisiones de bodega | `perfilScreen.jsx` | No se relacionan con los reportes |

### 10.2 Brechas y decisiones pendientes

| # | Brecha | Impacto en el negocio | Recomendación |
|---|---|---|---|
| 1 | **Jornada inconsistente.** Inicio dice "8:00 AM – 2:00 PM" (6 h), pero el cronómetro calcula sobre 8 h | El porcentaje de tiempo es engañoso (28,1 % en vez de 37,5 %) | Decidir la regla: calcular sobre la duración real de la ventana programada |
| 2 | La ubicación GPS no se guarda en el reporte ni se limpia al enviar | El reporte no tiene evidencia del lugar; el siguiente reporte muestra una ubicación vieja | Agregar `ubicacion` al objeto `nuevoReporte` y limpiarla con el resto del formulario |
| 3 | El detector de movimiento no afecta nada | Funcionalidad sin propósito de negocio | Usarlo para advertir antes de la foto, o registrarlo en el reporte |
| 4 | En `solicitudScreen.jsx`, `obtenerUbicacion` no está conectada a ningún botón y tiene errores: usa `PermissionStatus.status` (no definido) en vez de `location.status`, no importa `Alert` y no corta la ejecución con `return` si se niega el permiso | Hoy no se nota porque nunca se ejecuta; fallaría al conectarla | Corregir esos tres puntos o eliminar la función si no se va a usar |
| 5 | Los datos no están conectados entre pantallas | No se puede rastrear un producto del conteo al reporte o a la revisión | Centralizar productos y bodegas en `App.js`/`Context` o en un backend |
| 6 | La fecha del reporte usa `toLocaleDateString()` | El formato depende del idioma del teléfono y no coincide con el de los datos de ejemplo ("Oct 1") | Fijar un formato único |
| 7 | No hay cierre de sesión ni roles | No se puede demostrar el flujo del administrador | Implementar RN-03 a RN-05 |
| 8 | Todo se pierde al cerrar la app | No hay historial real de reportes | AsyncStorage para el prototipo; backend con autenticación para producción |
| 9 | `CreateProfile.jsx` no está conectada y tiene errores (falta importar `TextInput` y usa `result.cancelled` / `result.uri`) | Ninguno mientras no se use | Eliminarla o corregirla |

---

## 11. Glosario

| Término | Significado |
|---|---|
| **Ajuste** | Reemplazar el stock del sistema por la cantidad contada, después de que el administrador lo aprueba |
| **Baja** | Restar del stock las unidades de un reporte de defecto aprobado |
| **Conteo** | Proceso de contar físicamente los productos de una bodega dentro de una ventana horaria |
| **Conteo ciego** | Conteo en el que el operador no ve la cantidad del sistema, para no influir en lo que cuenta |
| **Conteo cíclico** | Conteo de un grupo de productos seleccionados en lugar de toda la bodega |
| **Cuadra** | Lo contado es igual a lo que marca el sistema |
| **Discrepancia** | Porcentaje de diferencia entre lo contado y lo registrado en el sistema |
| **EAN-13** | Estándar de código de barras de 13 dígitos que identifica un producto |
| **Faltante** | Lo contado es menor que lo que marca el sistema |
| **Reconteo** | Volver a contar productos puntuales por pedido del administrador |
| **Sobrante** | Lo contado es mayor que lo que marca el sistema |
| **Ubicación interna** | Lugar físico dentro de la bodega: pasillo, estante y nivel (`P2-E03-N1`) |
| **Ventana horaria** | Hora de inicio y de fin en que se puede realizar un conteo |
