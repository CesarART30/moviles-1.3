# Documentación de Inventrex

Inventrex es una app móvil híbrida (React Native + Expo) para el control de inventario físico en bodegas, desarrollada para la asignatura *Aplicaciones Móviles Híbridas* de la ULEAM.

Esta carpeta reúne toda la documentación del proyecto.

## Documentos

| Documento | Qué contiene | Para quién |
|---|---|---|
| [`LOGICA_DE_NEGOCIO.md`](./LOGICA_DE_NEGOCIO.md) | Las reglas del negocio y cómo funcionan en el código: actores y permisos, modelo de datos, procesos, fórmulas, estados, catálogo de reglas `RN-01` a `RN-45`, validaciones y brechas conocidas | Quien vaya a programar, revisar o presentar el proyecto |
| [`CONTEXTO_PROYECTO.md`](./CONTEXTO_PROYECTO.md) | Recorrido técnico: estructura de carpetas, arranque, navegación, qué hace cada pantalla y cómo ejecutar la app | Quien llega al proyecto por primera vez |
| [`GUIA_DISENO_FIGMA.md`](./GUIA_DISENO_FIGMA.md) | Especificación de diseño para construir la app en Figma: paleta 60-30-10, glassmorphism, componentes, las pantallas actuales y las 16 planificadas (incluido el rol administrador) | El modelo o diseñador que trabaje en Figma |

**Orden de lectura sugerido:** `CONTEXTO_PROYECTO.md` → `LOGICA_DE_NEGOCIO.md` → `GUIA_DISENO_FIGMA.md`.

## Estado del proyecto

| Área | Estado |
|---|---|
| Login, Inicio, Inventarios, Reportar defecto y Gestión | Implementado con datos de ejemplo y diseño glassmorphism |
| Reportes de defecto con foto, ubicación GPS y detector de movimiento | Implementado. La ubicación y el movimiento todavía no se guardan en el reporte |
| Conteo, Escáner, Mapa de bodega y rol administrador | Planificado (guía de Figma, secciones 7 y 8) |
| Persistencia de datos y backend | Pendiente: hoy todo vive en memoria |

Las brechas y decisiones pendientes están en `LOGICA_DE_NEGOCIO.md`, sección 10.2.

## Cómo ejecutar

```bash
npm install
npx expo start -c
```

Abre la app en **Expo Go** e inicia sesión con `estudiante@uleam.edu.ec` / `123456`. La cámara, la ubicación y el acelerómetro funcionan en un teléfono físico; en el navegador (`npm run web`) el acelerómetro no está disponible y las alertas no se muestran.

## Convenciones de la documentación

- **Estados:** *Implementada* (funciona hoy), *Parcial* (existe pero incompleta) y *Planificada* (diseñada, sin programar).
- **Reglas:** se citan por su identificador (`RN-17`) en todos los documentos.
- **Nombres:** las pantallas se nombran como en el código (`ReporteScreen`, `GestionScreen`). Ojo: `solicitudScreen.jsx` contiene **Inventarios** y `perfilScreen.jsx` contiene **Gestión**.

*Última actualización: 25 de octubre de 2026.*
