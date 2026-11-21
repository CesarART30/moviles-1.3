import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { colores, vidrio, vidrioOscuro, textoAjustable } from '../theme';

export default function InicioScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contenido} showsVerticalScrollIndicator={false}>
            {/* Header con Botón de Perfil */}
            <View style={styles.headerWrapper}>
                <View style={styles.header}>
                    <Text style={styles.titulo} {...textoAjustable}>Pantalla de Inicio</Text>
                    <Text style={styles.subtitulo}>Bienvenido al sistema de solicitudes</Text>
                </View>
                <Pressable style={styles.botonPerfil}>
                    <Text style={styles.iconoPerfil}>JP</Text>
                </Pressable>
            </View>

            {/* Grid de Tarjetas */}
            <View style={styles.grid}>
                <View style={styles.tarjeta}>
                    <Text style={styles.numero} {...textoAjustable}>2</Text>
                    <Text style={styles.texto}>Inventarios seguidos</Text>
                </View>
                <View style={styles.tarjeta}>
                    <Text style={styles.numero} {...textoAjustable}>3</Text>
                    <Text style={styles.texto}>Inventarios normales</Text>
                </View>
                <View style={styles.tarjeta}>
                    <Text style={styles.numero} {...textoAjustable}>4</Text>
                    <Text style={styles.texto}>Inventarios concretados</Text>
                </View>
                <Pressable style={styles.tarjetaBoton}>
                    <View style={styles.iconoCirculo}>
                        <Text style={styles.icono}>+</Text>
                    </View>
                    <Text style={styles.textoBoton}>Más información</Text>
                </Pressable>
            </View>

            {/* Sección de Asistencia */}
            <Text style={styles.sectionTitle}>Información Hoy</Text>
            <View style={styles.infoCard}>
                <Text style={styles.asistentName}>Pacheco Chalen Jose David</Text>
                <Text style={styles.asistentLabel}>a cargo hoy</Text>
                <View style={styles.divisor} />
                <Text style={styles.asistentName}>8:00 AM - 2:00 PM</Text>
                <Text style={styles.asistentLabel}>Ventana Horaria</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contenido: {
        paddingHorizontal: 20,
        paddingTop: 56,
        paddingBottom: 120,
    },

    /* Header */
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    header: {
        flex: 1,
    },
    titulo: {
        fontSize: 30,
        fontWeight: '800',
        letterSpacing: -0.5,
        color: colores.negro,
    },
    subtitulo: {
        fontSize: 14,
        color: colores.gris,
        marginTop: 4,
    },
    botonPerfil: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colores.negro,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    iconoPerfil: {
        fontSize: 15,
        fontWeight: '700',
        color: colores.blanco,
    },

    /* Grid */
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 12,
        marginBottom: 28,
    },
    tarjeta: {
        ...vidrio,
        width: '48%',
        minHeight: 120,
        padding: 18,
        justifyContent: 'space-between',
    },
    tarjetaBoton: {
        ...vidrioOscuro,
        width: '48%',
        minHeight: 120,
        padding: 18,
        justifyContent: 'space-between',
    },
    numero: {
        fontSize: 36,
        fontWeight: '800',
        letterSpacing: -1,
        color: colores.negro,
    },
    texto: {
        fontSize: 13,
        color: colores.grisOscuro,
        lineHeight: 18,
        fontWeight: '500',
    },
    iconoCirculo: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colores.rojo,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icono: {
        fontSize: 22,
        lineHeight: 24,
        fontWeight: '700',
        color: colores.blanco,
    },
    textoBoton: {
        fontSize: 13,
        fontWeight: '600',
        color: colores.blanco,
    },

    /* Información Hoy */
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: colores.gris,
        marginBottom: 12,
    },
    infoCard: {
        ...vidrio,
        padding: 18,
    },
    divisor: {
        height: 1,
        backgroundColor: 'rgba(10, 10, 10, 0.06)',
        marginVertical: 14,
    },
    asistentName: {
        fontSize: 17,
        fontWeight: '700',
        color: colores.negro,
        marginBottom: 2,
    },
    asistentLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: colores.gris,
    },
});
