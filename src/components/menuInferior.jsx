import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colores, vidrioOscuro, textoAjustable } from '../theme';

// Los emojis se reemplazaron por texto: sus colores rompían la paleta blanco / negro / rojo
const opciones = [
    { ruta: 'inicio', texto: 'Inicio' },
    { ruta: 'inventario', texto: 'Inventario' },
    { ruta: 'reporte', texto: 'Reportes' },
    { ruta: 'gestion', texto: 'Gestión' },
    { ruta: 'notificaciones', texto: 'Avisos' },
];

export default function MenuInferior({ pantallaActual, cambiarPantalla }) {
    return (
        <View style={styles.menu}>
            {opciones.map((opcion) => {
                const activo = pantallaActual === opcion.ruta;
                return (
                    <Pressable
                        key={opcion.ruta}
                        style={[styles.boton, activo && styles.botonActivo]}
                        onPress={() => cambiarPantalla(opcion.ruta)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: activo }}
                    >
                        <View style={[styles.punto, activo && styles.puntoActivo]} />
                        <Text style={[styles.texto, activo && styles.textoActivo]} {...textoAjustable}>{opcion.texto}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    // barra flotante de vidrio oscuro: el contenido se desplaza por debajo
    menu: {
        ...vidrioOscuro,
        // opaco a propósito: sin blur real, el texto que pasa por debajo se veía a través del menú
        backgroundColor: colores.negro,
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 20,
        flexDirection: 'row',
        padding: 6,
        borderRadius: 24,
    },
    boton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 18,
    },
    botonActivo: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    punto: {
        width: 5,
        height: 5,
        borderRadius: 3,
        marginBottom: 5,
    },
    puntoActivo: {
        backgroundColor: colores.rojo,
    },
    texto: {
        fontSize: 12,
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.5)',
    },
    textoActivo: {
        color: colores.blanco,
    },
});
