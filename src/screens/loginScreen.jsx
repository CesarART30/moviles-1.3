import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView } from 'react-native';
import { colores, vidrio, textoAjustable } from '../theme';

export default function LoginScreen({ onLogin }) {
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');

    // Credenciales de prueba
    const correoCorrecto = 'estudiante@uleam.edu.ec';
    const claveCorrecta = '123456';

    const iniciarSesion = () => {
        // Alert.alert muestra título y mensaje; alert() solo mostraba el primer texto
        if (!correo.trim() || !clave.trim()) {
            Alert.alert('Datos incompletos', 'Por favor ingresa correo y contraseña.');
            return;
        }

        if (correo === correoCorrecto && clave === claveCorrecta) {
            onLogin();
        } else {
            Alert.alert('Credenciales incorrectas', 'El correo o la contraseña son incorrectos.');
        }
    };

    return (
        // ScrollView: en pantallas bajas o con letra grande el botón no queda fuera de la vista
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
                <View style={styles.etiqueta}>
                    <Text style={styles.etiquetaTexto}>ULEAM · INVENTARIOS</Text>
                </View>
                <Text style={styles.logo} {...textoAjustable}>
                    Inventrex<Text style={styles.acento}>.</Text>
                </Text>
                {/* <strong> es HTML y falla en Android/iOS: el resaltado se hace con un Text anidado */}
                <Text style={styles.titulo} maxFontSizeMultiplier={1.3}>
                    Gestiona tu inventario <Text style={styles.resaltado}>de forma eficiente</Text>
                </Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    value={correo}
                    onChangeText={setCorreo}
                    placeholder="Correo Electrónico"
                    placeholderTextColor={colores.gris}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    value={clave}
                    onChangeText={setClave}
                    placeholder="Contraseña"
                    placeholderTextColor={colores.gris}
                    secureTextEntry
                />

                <Pressable
                    style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
                    onPress={iniciarSesion}
                >
                    <Text style={styles.textBoton}>Iniciar Sesión</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 28,
    },
    etiqueta: {
        ...vidrio,
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginBottom: 18,
    },
    etiquetaTexto: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 2,
        color: colores.grisOscuro,
    },
    logo: {
        fontSize: 44,
        fontWeight: '800',
        letterSpacing: -1.5,
        color: colores.negro,
        marginBottom: 8,
    },
    acento: {
        color: colores.rojo,
    },
    titulo: {
        fontSize: 20,
        fontWeight: '600',
        color: colores.grisOscuro,
        textAlign: 'center',
        lineHeight: 28,
    },
    resaltado: {
        color: colores.rojo,
        fontWeight: '800',
    },
    form: {
        ...vidrio,
        width: '100%',
        maxWidth: 360,
        padding: 20,
        borderRadius: 24,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: colores.grisOscuro,
        marginBottom: 6,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        borderWidth: 1,
        borderColor: colores.grisClaro,
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 16,
        fontSize: 16,
        color: colores.negro,
    },
    boton: {
        backgroundColor: colores.rojo,
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 4,
        shadowColor: colores.rojo,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
    },
    presionado: {
        opacity: 0.85,
        transform: [{ scale: 0.98 }],
    },
    textBoton: {
        color: colores.blanco,
        fontSize: 16,
        fontWeight: '700',
    },
});
