import { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import Titulo from '../components/titulo';
import { colores, vidrio } from '../theme';

// Muestra el aviso como banner aunque la app esté abierta (primer plano).
// Se registra una sola vez, cuando App.js importa este archivo.
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

// Para las capturas: deja ver solo el inicio y el final del token
const ocultarToken = (t) => `${t.slice(0, 22)}••••••${t.slice(-4)}`;

export default function NotificacionesPush() {
    const [token, setToken] = useState('');
    const [verToken, setVerToken] = useState(false);
    const [ultimoAviso, setUltimoAviso] = useState('Sin notificaciones');
    const [estado, setEstado] = useState('Pendiente');

    useEffect(() => {
        // Llega un aviso (local o push) con la app abierta
        const recibida = Notifications.addNotificationReceivedListener((n) => {
            setUltimoAviso(n.request.content.title || 'Notificación recibida');
        });
        // El usuario toca el aviso: aquí llegan los datos extra (data)
        const pulsada = Notifications.addNotificationResponseReceivedListener((r) => {
            console.log('Datos al pulsar:', r.notification.request.content.data);
        });
        return () => {
            recibida.remove();
            pulsada.remove();
        };
    }, []);

    async function registrarDispositivo() {
        try {
            // Android 13+: el canal debe existir antes de pedir el permiso
            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'Avisos de Inventrex',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                });
            }
            if (!Device.isDevice) {
                setEstado('La prueba push requiere un dispositivo físico');
                return;
            }
            // 1. ¿Ya hay permiso?  2. Si no, se le pide al usuario
            const actual = await Notifications.getPermissionsAsync();
            let concedido = actual.granted;
            if (!concedido) {
                const nuevo = await Notifications.requestPermissionsAsync();
                concedido = nuevo.granted;
            }
            if (!concedido) {
                setEstado('Permiso denegado; revisar ajustes del teléfono');
                return;
            }
            // 3. Token que identifica este teléfono dentro de Expo Push Service
            const projectId =
                Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
            if (!projectId) throw new Error('Falta extra.eas.projectId');
            const resultado = await Notifications.getExpoPushTokenAsync({ projectId });
            setToken(resultado.data);
            // Sale en la terminal de Metro, para copiarlo en expo.dev/notifications
            console.log('ExpoPushToken:', resultado.data);
            setEstado('Token obtenido correctamente');
        } catch (e) {
            setEstado('Error: ' + e.message);
            Alert.alert('Registro fallido', e.message);
        }
    }

    async function probarNotificacionLocal() {
        try {
            // Sin permiso, Android 13+ no muestra nada: se avisa en vez de fallar en silencio
            const { granted } = await Notifications.getPermissionsAsync();
            if (!granted) {
                Alert.alert('Falta el permiso', 'Pulsa primero "Solicitar permisos y obtener token".');
                return;
            }
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Solicitud registrada',
                    body: 'Tu solicitud fue registrada correctamente.',
                    data: { pantalla: 'solicitudes', tipo: 'registro' },
                },
                trigger: null, // null = se muestra de inmediato, sin servidor
            });
        } catch (e) {
            Alert.alert('Error local', e.message);
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contenido}>
            <Titulo texto="Notificaciones" subtitulo="Permisos, token de Expo y avisos de prueba" />

            <Pressable
                style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
                onPress={registrarDispositivo}
            >
                <Text style={styles.botonTexto}>Solicitar permisos y obtener token</Text>
            </Pressable>

            <View style={styles.tarjeta}>
                <Text style={styles.etiqueta}>Estado</Text>
                <Text style={styles.valor}>{estado}</Text>
            </View>

            <View style={styles.tarjeta}>
                <Text style={styles.etiqueta}>Expo Push Token</Text>
                <Text style={styles.token} selectable>
                    {!token ? 'Aún no disponible' : verToken ? token : ocultarToken(token)}
                </Text>
                {!!token && (
                    <Pressable onPress={() => setVerToken(!verToken)}>
                        <Text style={styles.enlace}>
                            {verToken ? 'Ocultar token' : 'Mostrar token completo'}
                        </Text>
                    </Pressable>
                )}
            </View>

            <Pressable
                style={({ pressed }) => [styles.botonOscuro, pressed && styles.presionado]}
                onPress={probarNotificacionLocal}
            >
                <Text style={styles.botonTexto}>Probar notificación local</Text>
            </Pressable>

            <View style={styles.tarjeta}>
                <Text style={styles.etiqueta}>Último aviso</Text>
                <Text style={styles.valor}>{ultimoAviso}</Text>
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
    tarjeta: {
        ...vidrio,
        padding: 16,
        marginBottom: 12,
    },
    etiqueta: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: colores.gris,
        marginBottom: 6,
    },
    valor: {
        fontSize: 15,
        fontWeight: '600',
        color: colores.negro,
    },
    token: {
        fontSize: 13,
        color: colores.grisOscuro,
    },
    enlace: {
        fontSize: 13,
        fontWeight: '700',
        color: colores.negro,
        marginTop: 10,
    },
    // Acción principal (rojo = acento del 10 %)
    boton: {
        backgroundColor: colores.rojo,
        borderRadius: 16,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 14,
        shadowColor: colores.rojo,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
    },
    botonOscuro: {
        backgroundColor: colores.negro,
        borderRadius: 16,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 2,
        marginBottom: 14,
    },
    botonTexto: {
        color: colores.blanco,
        fontSize: 15,
        fontWeight: '700',
    },
    presionado: {
        opacity: 0.85,
        transform: [{ scale: 0.98 }],
    },
});
