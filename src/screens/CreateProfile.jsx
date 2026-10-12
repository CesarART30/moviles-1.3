import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcionPersonal, setDescripcionPersonal] = useState('');
  const [imagenes, setImagenes] = useState([]);


    const tomarFoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Se necesita permiso para acceder a la cámara');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            setSelectedImage(result.uri);
        }
    };
    const seleccionarImagen = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Se necesita permiso para acceder a la biblioteca de imágenes');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            setSelectedImage(result.uri);
        }
    };
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Crea tu perfil</Text>
        <Text style={styles.subtitulo}>Gestiona tu perfil personal, cuentanos de ti</Text>
      </View>
        <View style={styles.form}>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Ingresa tu nombre"
                keyboardType="default"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                value={descripcionPersonal}
                onChangeText={setDescripcionPersonal}
                placeholder="Describe tu perfil"
                multiline
                numberOfLines={4}
            />
            <Pressable style={styles.boton} onPress={tomarFoto}>
                <Text style={styles.textBoton}>Tomar Foto</Text>
            </Pressable>
            <Pressable style={styles.boton} onPress={seleccionarImagen}>
                <Text style={styles.textBoton}>Seleccionar desde Galeria</Text>
            </Pressable>
        </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748b',
  },

  // Timer Compacto
  timerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  timerContent: {
    marginBottom: 8,
  },
  timerLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 2,
  },
  timerValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  timerBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  timerProgress: {
    height: '100%',
    backgroundColor: '#2563eb',
  },

  // Botón Crear
  crearBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  crearBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Grid 2 Columnas
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  // Card Header
  cardHeader: {
    marginBottom: 10,
  },
  cardNombre: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  cardFecha: {
    fontSize: 11,
    color: '#94a3b8',
  },

  // Discrepancia Section
  discrepancySection: {
    marginBottom: 10,
  },
  discrepancyValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563eb',
  },
  statLabel: {
    fontSize: 10,
    color: '#64748b',
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#e2e8f0',
  },

  // Card Footer
  cardFooter: {
    paddingTop: 8,
  },
  cardFooterText: {
    fontSize: 11,
    color: '#2563eb',
    fontWeight: '500',
  },
});
