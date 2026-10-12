import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';

export default function InicioScreen() {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header con Botón de Perfil */}
            <View style={styles.headerWrapper}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Pantalla de Inicio</Text>
                    <Text style={styles.subtitulo}>Bienvenido al sistema de solicitudes</Text>
                </View>
                <Pressable style={styles.botonPerfil}>
                    <Text style={styles.iconoPerfil}>👤</Text>
                </Pressable>
            </View>

            {/* Grid de Tarjetas */}
            <View style={styles.gridSection}>
                <View style={styles.grid}>
                    <View style={styles.tarjeta}>
                        <Text style={styles.numero}>2</Text>
                        <Text style={styles.texto}>Inventarios seguidos</Text>
                    </View>
                    <View style={styles.tarjeta}>
                        <Text style={styles.numero}>3</Text>
                        <Text style={styles.texto}>Inventarios normales</Text>
                    </View>
                    <View style={styles.tarjeta}>
                        <Text style={styles.numero}>4</Text>
                        <Text style={styles.texto}>Inventarios concretados</Text>
                    </View>
                    <Pressable style={styles.tarjetaBoton}>
                        <Text style={styles.icono}>+</Text>
                        <Text style={styles.textoBoton}>Más información</Text>
                    </Pressable>
                </View>
            </View>

            {/* Sección de Asistencia */}
            <View style={styles.contentSection}>
                <Text style={styles.sectionTitle}>Información Hoy</Text>
                <View style={styles.lastAsistent}>
                    <Text style={styles.asistentName}>Pacheco Chalen Jose David</Text>
                    <Text style={styles.asistentLabel}>a cargo hoy</Text>
                </View>
                <View style={styles.lastAsistent}>
                    <Text style={styles.asistentName}>8:00 AM - 2:00 PM</Text>
                    <Text style={styles.asistentLabel}>Ventana Horaria</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    
    /* Header */
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
    header: {
        flex: 1,
    },
    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 4,
    },
    subtitulo: {
        fontSize: 13,
        color: '#64748b',
    },
    botonPerfil: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    iconoPerfil: {
        fontSize: 24,
    },

    /* Grid Section */
    gridSection: {
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    tarjeta: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 2,
    },
    tarjetaBoton: {
        width: '48%',
        backgroundColor: '#eff6ff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#2563eb',
        borderStyle: 'dashed',
    },
    numero: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2563eb',
        marginBottom: 8,
    },
    icono: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#2563eb',
        marginBottom: 8,
    },
    texto: {
        fontSize: 13,
        color: '#64748b',
        lineHeight: 18,
        fontWeight: '500',
    },
    textoBoton: {
        fontSize: 13,
        color: '#2563eb',
        fontWeight: '600',
        textAlign: 'center',
    },

    /* Content Section */
    contentSection: {
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 12,
    },
    lastAsistent: {
        width: '100%',
        backgroundColor: '#e2ebf0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    asistentName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 4,
    },
    asistentLabel: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500',
    },
});
