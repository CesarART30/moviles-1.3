import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, FlatList } from 'react-native';

export default function GestionScreen() {
  const [inventariosGestionados] = useState([
    {
      id: 1,
      nombre: 'Bodega A - Inventario Oct 2',
      bodega: 'Bodega A',
      estado: 'Revisado',
      observaciones: 'Discrepancia detectada en sección electrónica. Revisar códigos de barras.',
      fecha: 'Oct 2, 2026',
      jefeBodega: 'Carlos López',
    },
    {
      id: 2,
      nombre: 'Bodega B - Inventario Oct 1',
      bodega: 'Bodega B',
      estado: 'Pendiente',
      observaciones: 'Conteo en progreso. Falta revisar sección textil.',
      fecha: 'Oct 1, 2026',
      jefeBodega: 'María García',
    },
    {
      id: 3,
      nombre: 'Almacén C - Inventario Sep 30',
      bodega: 'Almacén C',
      estado: 'Revisado',
      observaciones: 'Todo conforme. Stock coincide con sistema.',
      fecha: 'Sep 30, 2026',
      jefeBodega: 'Juan Pérez',
    },
    {
      id: 4,
      nombre: 'Oficina D - Inventario Sep 28',
      bodega: 'Oficina D',
      estado: 'Revisado',
      observaciones: 'Falta un equipo de cómputo. Reportar a sistemas.',
      fecha: 'Sep 28, 2026',
      jefeBodega: 'Ana Martínez',
    },
  ]);

  const getEstadoColor = (estado) => {
    return estado === 'Revisado' ? '#10b981' : '#f59e0b';
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.cardNombre}>{item.nombre}</Text>
          <Text style={styles.cardFecha}>{item.fecha}</Text>
        </View>
        <View
          style={[
            styles.estadoBadge,
            { backgroundColor: getEstadoColor(item.estado) },
          ]}
        >
          <Text style={styles.estadoText}>{item.estado}</Text>
        </View>
      </View>

      {/* Jefe Bodega */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Jefe de Bodega</Text>
        <Text style={styles.sectionValue}>{item.jefeBodega}</Text>
      </View>

      {/* Observaciones */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Observaciones</Text>
        <Text style={styles.observaciones}>{item.observaciones}</Text>
      </View>

      {/* Ver Mapa Button */}
      <Pressable style={styles.mapBtn}>
        <Text style={styles.mapBtnText}>📍 Ver Ubicación en Mapa</Text>
      </Pressable>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Gestión</Text>
        <Text style={styles.subtitulo}>Monitorea revisiones de bodegas</Text>
      </View>

      {/* Botón Ver Todas Bodegas */}
      <Pressable style={styles.allBodegasBtn}>
        <Text style={styles.allBodegasBtnText}>🏭 Ver Todas las Bodegas</Text>
      </Pressable>

      {/* Lista de Inventarios */}
      <FlatList
        data={inventariosGestionados}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        style={styles.listContainer}
      />
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

  // Botón Ver Todas Bodegas
  allBodegasBtn: {
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
  allBodegasBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Lista
  listContainer: {
    marginBottom: 30,
  },

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  // Card Header
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
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

  // Estado Badge
  estadoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  estadoText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },

  // Sections
  section: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  sectionLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionValue: {
    fontSize: 12,
    color: '#1e293b',
    fontWeight: '500',
  },
  observaciones: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },

  // Botón Mapa
  mapBtn: {
    backgroundColor: '#f0f4f8',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  mapBtnText: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '600',
  },
});
