import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function InventarioScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([]);

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

  const getDiscrepancyColor = (value) => {
    if (value < 10) return '#10b981';
    if (value < 20) return '#f59e0b';
    return '#ef4444';
  };

  const tiempoRestante = {
    horas: 2,
    minutos: 15,
  };

  const porcentajeTiempo = (tiempoRestante.horas * 60 + tiempoRestante.minutos) / (8 * 60) * 100;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Inventarios</Text>
        <Text style={styles.subtitulo}>Gestiona y monitorea tus procesos</Text>
      </View>

      {/* Timer Compacto */}
      <View style={styles.timerCard}>
        <View style={styles.timerContent}>
          <Text style={styles.timerLabel}>Tiempo disponible</Text>
          <Text style={styles.timerValue}>
            {tiempoRestante.horas}h {tiempoRestante.minutos}m
          </Text>
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
      <Pressable style={styles.crearBtn}>
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
              <Text style={styles.discrepancyValue}>{inv.discrepancias}%</Text>
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
