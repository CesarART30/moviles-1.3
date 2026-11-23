import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

// Servicio externo: cinco publicaciones de demostración (método GET)
const URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5';

export default function ConsultaExterna() {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [intento, setIntento] = useState(0);

  // Se ejecuta al abrir la pantalla y cada vez que cambia "intento"
  useEffect(() => {
    async function cargarPosts() {
      try {
        const respuesta = await fetch(URL);

        // fetch no falla con 404 o 503: hay que revisar el código nosotros
        if (!respuesta.ok) {
          setError(`El servicio respondió con un error (HTTP ${respuesta.status}).`);
          return;
        }

        const datos = await respuesta.json();
        setPosts(datos);
      } catch {
        // Sin conexión no llega ninguna respuesta HTTP
        setError('No se pudo consultar el servicio. Revisa tu conexión e inténtalo de nuevo.');
      } finally {
        setCargando(false);
      }
    }

    cargarPosts();
  }, [intento]);

  function reintentar() {
    setError('');
    setCargando(true);
    setIntento((actual) => actual + 1);
  }

  return (
    <ScrollView contentContainerStyle={styles.contenido}>
      <Text style={styles.titulo}>Consulta externa</Text>
      <Text style={styles.subtitulo}>Publicaciones de JSONPlaceholder</Text>

      {cargando ? (
        <View style={styles.tarjeta}>
          <ActivityIndicator color="#dc2626" />
          <Text style={styles.texto}>Cargando publicaciones…</Text>
        </View>
      ) : error ? (
        <View style={styles.tarjeta}>
          <Text style={styles.texto}>{error}</Text>
          <Pressable style={styles.boton} onPress={reintentar} accessibilityRole="button">
            <Text style={styles.botonTexto}>Reintentar</Text>
          </Pressable>
        </View>
      ) : (
        posts.map((post) => (
          <View key={post.id} style={styles.tarjeta}>
            <Text style={styles.texto}>{post.title}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 20, paddingTop: 56, gap: 10, backgroundColor: '#f4f4f5', flexGrow: 1 },
  titulo: { fontSize: 28, fontWeight: '800', color: '#0a0a0a' },
  subtitulo: { fontSize: 14, color: '#71717a', marginBottom: 10 },
  tarjeta: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, gap: 12 },
  texto: { fontSize: 15, lineHeight: 22, color: '#3f3f46' },
  boton: { alignSelf: 'flex-start', backgroundColor: '#dc2626', padding: 12, borderRadius: 12 },
  botonTexto: { color: '#ffffff', fontWeight: '700' },
});
