import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function MenuInferior({ pantallaActual, cambiarPantalla }) {
    return (
        <View style={styles.menu}>
            <Pressable
                style={[styles.boton, pantallaActual === 'inicio' && styles.botonActivo]}
                onPress={() => cambiarPantalla('inicio')}
            >
                <Text style={styles.icono}>🏠</Text>
            </Pressable>

            <Pressable
                style={[styles.boton, pantallaActual === 'inventario' && styles.botonActivo]}
                onPress={() => cambiarPantalla('inventario')}
            >
                <Text style={styles.icono}>📋</Text>
            </Pressable>

            <Pressable
                style={[styles.boton, pantallaActual === 'reporte' && styles.botonActivo]}
                onPress={() => cambiarPantalla('reporte')}
            >
                <Text style={styles.icono}>⚠️</Text>
            </Pressable>

            <Pressable
                style={[styles.boton, pantallaActual === 'gestion' && styles.botonActivo]}
                onPress={() => cambiarPantalla('gestion')}
            >
                <Text style={styles.icono}>👤</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    boton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    botonActivo: {
        backgroundColor: '#eff6ff',
    },
    icono: {
        fontSize: 24,
    },
});
