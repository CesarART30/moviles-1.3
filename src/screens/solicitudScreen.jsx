import React, { useState } from 'react';
import { Modal, View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { colores, vidrio, vidrioOscuro, textoAjustable } from '../theme';
import  * as Location from "expo-location"
import { SolicitudesProvider } from '../context/SolicitudesContext';
import FormularioSolicitud from '../components/FormularioSolicitud';
import ListaSolicitudes from '../components/ListaSolicitudes';

function estadoDiscrepancia(valor) {
  if (valor < 10) return { color: colores.negro, texto: 'Aceptable' };
  if (valor < 20) return { color: colores.rojoClaro, texto: 'Requiere revisión' };
  return { color: colores.rojo, texto: 'Crítica' };
}

export default function InventarioScreen() {
  const [inventarioSeleccionado, setInventarioSeleccionado] = useState(null);
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

  function cerrarDetalle() {
    setInventarioSeleccionado(null);
  }

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
                    { width: `${inv.discrepancias}%`, backgroundColor: estadoDiscrepancia(inv.discrepancias).color },
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
            <Pressable
              style={styles.cardFooter}
              onPress={() => setInventarioSeleccionado(inv)}
              accessibilityRole="button"
              accessibilityLabel={`Ver detalles de ${inv.nombre}`}
            >
              <Text style={styles.cardFooterText}>Ver detalles →</Text>
            </Pressable>
          </View>
        ))}
      </View>

      {inventarioSeleccionado && (
        <Modal animationType="fade" transparent onRequestClose={cerrarDetalle}>
          <View style={styles.modalFondo}>
            <ScrollView style={styles.modalVentana} contentContainerStyle={styles.modalContenido}>
              <Text style={styles.titulo} accessibilityRole="header">{inventarioSeleccionado.nombre}</Text>
              <Text style={styles.detalleTexto}>Categoría: {inventarioSeleccionado.categoria}</Text>
              <Text style={styles.detalleTexto}>Último conteo: {inventarioSeleccionado.fecha}</Text>
              <Text style={styles.detalleTexto}>Productos contados: {inventarioSeleccionado.productosContados}</Text>
              <Text style={styles.detalleTexto}>
                Discrepancia: {inventarioSeleccionado.discrepancias}%
                {' · '}{estadoDiscrepancia(inventarioSeleccionado.discrepancias).texto}
              </Text>
              <Pressable style={styles.modalBoton} onPress={cerrarDetalle} accessibilityRole="button">
                <Text style={styles.crearBtnText}>Cerrar detalles</Text>
              </Pressable>
            </ScrollView>
          </View>
        </Modal>
      )}

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
  modalFondo: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(10, 10, 10, 0.5)',
  },
  modalVentana: {
    flexGrow: 0,
    width: '100%',
    maxWidth: 480,
    maxHeight: '90%',
    alignSelf: 'center',
    backgroundColor: colores.blanco,
    borderRadius: 20,
  },
  modalContenido: { padding: 20, gap: 12 },
  detalleTexto: { fontSize: 15, lineHeight: 22, color: colores.grisOscuro },
  modalBoton: {
    alignSelf: 'flex-start',
    backgroundColor: colores.negro,
    borderRadius: 12,
    padding: 12,
    marginTop: 4,
  },
});
