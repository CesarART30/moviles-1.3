import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { colores, vidrio } from '../theme';
import { useSolicitudes } from '../context/SolicitudesContext';

// Solo muestra y elimina. El arreglo llega del contexto, no del formulario.
export default function ListaSolicitudes() {
    const { solicitudes, total, eliminarSolicitud } = useSolicitudes();

    function pedirEliminar(id) {
        Alert.alert('Eliminar solicitud', '¿Desea eliminar este registro?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: () => eliminarSolicitud(id),
            },
        ]);
    }

    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Lista de solicitudes</Text>
            <Text style={styles.total} accessibilityLiveRegion="polite">
                Total: {total}
            </Text>

            <FlatList
                data={solicitudes}
                keyExtractor={(item) => String(item.id)}
                scrollEnabled={false}
                ListEmptyComponent={<Text style={styles.vacio}>No existen solicitudes guardadas.</Text>}
                renderItem={({ item }) => (
                    <View style={styles.tarjeta}>
                        <Text style={styles.asunto}>{item.asunto}</Text>
                        <Text style={styles.descripcion}>{item.descripcion}</Text>
                        <Pressable
                            onPress={() => pedirEliminar(item.id)}
                            accessibilityRole="button"
                            accessibilityLabel={`Eliminar solicitud ${item.asunto}`}
                        >
                            <Text style={styles.eliminar}>Eliminar</Text>
                        </Pressable>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: { marginTop: 8 },
    titulo: {
        fontSize: 18,
        fontWeight: '800',
        color: colores.negro,
        marginBottom: 6,
    },
    total: {
        alignSelf: 'flex-start',
        overflow: 'hidden',
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginBottom: 12,
        fontSize: 12,
        fontWeight: '700',
        color: colores.negro,
        backgroundColor: colores.grisClaro,
    },
    vacio: { fontSize: 13, color: colores.gris, textAlign: 'center', paddingVertical: 8 },
    tarjeta: { ...vidrio, padding: 16, marginBottom: 12 },
    asunto: { fontWeight: '700', fontSize: 16, color: colores.negro, marginBottom: 6 },
    descripcion: { fontSize: 14, lineHeight: 20, color: colores.grisOscuro },
    eliminar: { marginTop: 12, fontSize: 13, fontWeight: '700', color: colores.rojo },
});
