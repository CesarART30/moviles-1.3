import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colores, textoAjustable } from '../theme';
import { useSolicitudes } from '../context/SolicitudesContext';

// Solo registra. No guarda la lista: la lee del contexto para mostrar el total.
export default function FormularioSolicitud() {
    const { total, dbLista, agregarSolicitud } = useSolicitudes();
    const [asunto, setAsunto] = useState('');
    const [descripcion, setDescripcion] = useState('');

    async function registrar() {
        const guardada = await agregarSolicitud(asunto, descripcion);
        if (!guardada) return;
        setAsunto('');
        setDescripcion('');
    }

    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo} {...textoAjustable}>Registrar solicitud</Text>
            <Text style={styles.total} accessibilityLiveRegion="polite">
                Total actual: {total}
            </Text>

            <TextInput
                style={styles.campo}
                placeholder="Asunto"
                placeholderTextColor={colores.gris}
                value={asunto}
                onChangeText={setAsunto}
                accessibilityLabel="Asunto de la solicitud"
            />
            <TextInput
                style={[styles.campo, styles.campoMultilinea]}
                placeholder="Descripción"
                placeholderTextColor={colores.gris}
                value={descripcion}
                onChangeText={setDescripcion}
                multiline
                accessibilityLabel="Descripción de la solicitud"
            />
            <Pressable
                style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
                onPress={registrar}
                disabled={!dbLista}
                accessibilityRole="button"
                accessibilityLabel="Guardar solicitud"
            >
                <Text style={styles.botonTexto}>Guardar solicitud</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: { marginTop: 28 },
    titulo: {
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: -0.3,
        color: colores.negro,
        marginBottom: 6,
    },
    total: {
        alignSelf: 'flex-start',
        overflow: 'hidden',
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginBottom: 4,
        fontSize: 12,
        fontWeight: '700',
        color: colores.rojo,
        backgroundColor: colores.rojoSuave,
    },
    campo: {
        borderWidth: 1,
        borderColor: colores.grisClaro,
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        fontSize: 14,
        color: colores.negro,
        marginTop: 10,
    },
    campoMultilinea: { minHeight: 80, textAlignVertical: 'top' },
    boton: {
        backgroundColor: colores.rojo,
        paddingVertical: 15,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 14,
        shadowColor: colores.rojo,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
    },
    botonTexto: { color: colores.blanco, fontSize: 15, fontWeight: '700' },
    presionado: { opacity: 0.85, transform: [{ scale: 0.98 }] },
});
