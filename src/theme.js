// Paleta 60-30-10
// 60 % blanco: fondos y superficies de vidrio
// 30 % negro: texto, menú y elementos secundarios
// 10 % rojo: acción principal, estado activo y alertas
export const colores = {
    blanco: '#ffffff',
    fondo: '#f4f4f5',
    negro: '#0a0a0a',
    grisOscuro: '#3f3f46',
    gris: '#71717a',
    grisClaro: '#e4e4e7',
    rojo: '#dc2626',
    rojoClaro: '#f87171',
    rojoSuave: 'rgba(220, 38, 38, 0.10)',
};

// Superficie de vidrio (glassmorphism): blanco semitransparente, borde claro y sombra suave.
// Deja ver las manchas de color del fondo (componente Fondo).
export const vidrio = {
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    shadowColor: '#0a0a0a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
};

// Variante oscura para el menú y las tarjetas destacadas
export const vidrioOscuro = {
    backgroundColor: 'rgba(10, 10, 10, 0.88)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: 20,
    shadowColor: '#0a0a0a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
};

// Props para textos grandes (logo, títulos, números y menú): con la letra del sistema ampliada
// crecen como máximo un 20 % y, si no caben en el ancho de la pantalla, se encogen en una línea.
export const textoAjustable = { numberOfLines: 1, adjustsFontSizeToFit: true, maxFontSizeMultiplier: 1.2 };
