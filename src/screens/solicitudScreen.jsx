import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { colores, vidrio, vidrioOscuro, textoAjustable } from '../theme';
import  * as Location from "expo-location"
import { SolicitudesProvider } from '../context/SolicitudesContext';
import FormularioSolicitud from '../components/FormularioSolicitud';
import ListaSolicitudes from '../components/ListaSolicitudes';

export default function InventarioScreen() {
  const [inventarios] = useState([
    {
      id: 1,
      nombre: 'Bodega A',
      discrepancias: 15,
      productosContados: 245,
      categoria: 'Electrónica',
      fecha: 'Oct 2',
    },
    {
      id: 2,
      nombre: 'Bodega B',
      discrepancias: 8,
      productosContados: 187,
      categoria: 'Textil',
      fecha: 'Oct 1',
    },
    {
      id: 3,
      nombre: 'Almacén C',
      discrepancias: 22,
      productosContados: 512,
      categoria: 'Alimentos',
      fecha: 'Sep 30',
    },
    {
      id: 4,
      nombre: 'Oficina D',
      discrepancias: 5,
      productosContados: 89,
      categoria: 'Suministros',
      fecha: 'Sep 28',
    },
  ]);

  // negro = aceptable, rojo claro = revisar, rojo = crítico
  const getDiscrepancyColor = (value) => {
    if (value < 10) return colores.negro;
    if (value < 20) return colores.rojoClaro;
    return colores.rojo;
  };

  const tiempoRestante = {
    horas: 2,
    minutos: 15,
  };
  const [ubicacion, setUbicacion] = useState(null);
  const [consultandoUbicacion, setConsultandoUbicacion] = useState(false)
  const porcentajeTiempo = (tiempoRestante.horas * 60 + tiempoRestante.minutos) / (8 * 60) * 100;




  const obtenerUbicacion = async () => {
    try{
      setConsultandoUbicacion(true);
      const location = await Location.requestForegroundPermissionsAsync();

      if(PermissionStatus.status!== "granted"){
        Alert.alert (
          "Permiso requerido",
          "Autoriza el acceso a tu ubicacion para continuar"
        )
      }

      const posicion = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced
      })
      setUbicacion({
        latitud: posicion.coords.latitude,
        longitud: posicion.coords.longitude,
        precision: posicion.coords.accuracy
      });
    }catch (error){
      Alert.alert (
        "Ubicacion no disponible",
        "No se pudo obtener la ubicacion actual."
      )
    } finally {
      setConsultandoUbicacion(false);
    }

  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo} {...textoAjustable}>Inventarios</Text>
        <Text style={styles.subtitulo}>Gestiona y monitorea tus procesos</Text>
      </View>

      {/* Timer Compacto */}
      <View style={styles.timerCard}>
        <View style={styles.timerContent}>
          <View>
            <Text style={styles.timerLabel}>Tiempo disponible</Text>
            <Text style={styles.timerValue} {...textoAjustable}>
              {tiempoRestante.horas}h {tiempoRestante.minutos}m
            </Text>
          </View>
          <Text style={styles.timerMeta}>de 8 h</Text>
        </View>
        <View style={styles.timerBar}>
          <View
            style={[
              styles.timerProgress,
              { width: `${porcentajeTiempo}%` },
            ]}
          />
        </View>
      </View>

      {/* Botón Crear */}
      <Pressable style={({ pressed }) => [styles.crearBtn, pressed && styles.presionado]}>
        <Text style={styles.crearBtnText}>+ Crear Inventario</Text>
      </Pressable>

      {/* Grid 2 Columnas */}
      <View style={styles.gridContainer}>
        {inventarios.map((inv) => (
          <View key={inv.id} style={styles.card}>
            {/* Header Card */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardNombre}>{inv.nombre}</Text>
              <Text style={styles.cardFecha}>{inv.fecha}</Text>
            </View>

            {/* Discrepancias */}
            <View style={styles.discrepancySection}>
              <View style={styles.discrepancyFila}>
                <Text style={styles.discrepancyValue} maxFontSizeMultiplier={1.2}>{inv.discrepancias}%</Text>
                <Text style={styles.discrepancyLabel}>discrepancia</Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${inv.discrepancias}%`, backgroundColor: getDiscrepancyColor(inv.discrepancias) },
                  ]}
                />
              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{inv.productosContados}</Text>
                <Text style={styles.statLabel}>Productos</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>{inv.categoria}</Text>
              </View>
            </View>

            {/* Footer */}
            <Pressable style={styles.cardFooter}>
              <Text style={styles.cardFooterText}>Ver detalles →</Text>
            </Pressable>
          </View>
        ))}
      </View>

      {/* Context API: el formulario y la lista comparten el mismo arreglo */}
      <SolicitudesProvider>
        <FormularioSolicitud />
        <ListaSolicitudes />
      </SolicitudesProvider>
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
  header: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: colores.negro,
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: colores.gris,
  },

  // Timer Compacto (vidrio oscuro)
  timerCard: {
    ...vidrioOscuro,
    padding: 18,
    marginBottom: 14,
  },
  timerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  timerLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
  },
  timerValue: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: colores.blanco,
  },
  timerMeta: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  timerBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  timerProgress: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: colores.rojo,
  },

  // Botón Crear
  crearBtn: {
    backgroundColor: colores.rojo,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colores.rojo,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  crearBtnText: {
    color: colores.blanco,
    fontSize: 15,
    fontWeight: '700',
  },
  presionado: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  // Grid 2 Columnas
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  card: {
    ...vidrio,
    width: '48%',
    padding: 14,
    borderRadius: 18,
  },

  // Card Header
  cardHeader: {
    marginBottom: 12,
  },
  cardNombre: {
    fontSize: 14,
    fontWeight: '700',
    color: colores.negro,
    marginBottom: 2,
  },
  cardFecha: {
    fontSize: 11,
    color: colores.gris,
  },

  // Discrepancia Section
  discrepancySection: {
    marginBottom: 12,
  },
  discrepancyFila: {
    flexDirection: 'row',
    flexWrap: 'wrap', // en pantallas angostas "discrepancia" baja a la siguiente línea
    alignItems: 'baseline',
    marginBottom: 6,
  },
  discrepancyValue: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: colores.negro,
    marginRight: 6,
  },
  discrepancyLabel: {
    fontSize: 11,
    color: colores.gris,
  },
  progressBar: {
    height: 5,
    backgroundColor: 'rgba(10, 10, 10, 0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(10, 10, 10, 0.06)',
    marginBottom: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colores.negro,
  },
  statLabel: {
    fontSize: 10,
    color: colores.gris,
  },
  divider: {
    width: 1,
    height: 22,
    backgroundColor: 'rgba(10, 10, 10, 0.08)',
  },

  // Card Footer
  cardFooter: {
    paddingTop: 2,
  },
  cardFooterText: {
    fontSize: 12,
    fontWeight: '700',
    color: colores.negro,
  },
});
