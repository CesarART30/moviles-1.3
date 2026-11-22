import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Titulo from '../components/titulo';
import { colores, vidrio } from '../theme';

const endpoint = 'https://jsonplaceholder.typicode.com/posts?_limit=5';
const estadoInicial = { cargando: true, error: '', posts: [] };

export default function ConsultaExterna({ volver }) {
    const [intento, setIntento] = useState(0);
    const [{ cargando, error, posts }, setConsulta] = useState(estadoInicial);

    useEffect(() => {
        const controlador = new AbortController();
        const limite = setTimeout(() => controlador.abort(), 10000);
        let activa = true;

        async function cargarPosts() {
            try {
                const respuesta = await fetch(endpoint, { signal: controlador.signal });
                if (!respuesta.ok) {
                    if (activa) {
                        setConsulta({
                            cargando: false,
                            error: `El servicio respondió con un error (HTTP ${respuesta.status}).`,
                            posts: [],
                        });
                    }
                    return;
                }

                const datos = await respuesta.json();
                if (!Array.isArray(datos) || !datos.every((post) => (
                    Number.isInteger(post?.id) && typeof post.title === 'string'
                ))) {
                    throw new Error('Formato de publicaciones inválido');
                }
                if (activa) setConsulta({ cargando: false, error: '', posts: datos });
            } catch {
                if (activa) {
                    const mensaje = controlador.signal.aborted
                        ? 'El servicio tardó demasiado en responder.'
                        : 'No se pudo consultar el servicio. Revisa tu conexión e inténtalo de nuevo.';
                    setConsulta({ cargando: false, error: mensaje, posts: [] });
                }
            } finally {
                clearTimeout(limite);
            }
        }

        cargarPosts();
        return () => {
            activa = false;
            clearTimeout(limite);
            controlador.abort();
        };
    }, [intento]);

    function reintentar() {
        setConsulta(estadoInicial);
        setIntento((actual) => actual + 1);
    }

    return (
        <ScrollView contentContainerStyle={styles.contenido}>
            <Pressable style={styles.volver} onPress={volver} accessibilityRole="button">
                <Text style={styles.volverTexto}>‹ Volver a Inicio</Text>
            </Pressable>
            <Titulo texto="Consulta externa" subtitulo="Publicaciones de demostración de JSONPlaceholder" />

            {cargando ? (
                <View style={styles.tarjeta} accessibilityLiveRegion="polite">
                    <ActivityIndicator color={colores.rojo} />
                    <Text style={styles.texto}>Cargando publicaciones…</Text>
                </View>
            ) : error ? (
                <View style={styles.tarjeta}>
                    <Text style={styles.texto} accessibilityRole="alert">{error}</Text>
                    <Pressable style={styles.boton} onPress={reintentar} accessibilityRole="button">
                        <Text style={styles.botonTexto}>Reintentar</Text>
                    </Pressable>
                </View>
            ) : (
                <View role="list" style={styles.lista}>
                    {posts.length === 0 && <Text style={styles.texto}>No hay publicaciones disponibles.</Text>}
                    {posts.map(({ id, title }) => (
                        <View key={id} style={styles.tarjeta} role="listitem">
                            <Text style={styles.texto}>{title}</Text>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contenido: { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 120 },
    volver: { alignSelf: 'flex-start', paddingVertical: 10, marginBottom: 8 },
    volverTexto: { fontWeight: '700', color: colores.negro },
    lista: { gap: 10 },
    tarjeta: { ...vidrio, padding: 16, gap: 12 },
    texto: { color: colores.grisOscuro, fontSize: 15, lineHeight: 22 },
    boton: { alignSelf: 'flex-start', backgroundColor: colores.rojo, padding: 12, borderRadius: 12 },
    botonTexto: { color: colores.blanco, fontWeight: '700' },
});
