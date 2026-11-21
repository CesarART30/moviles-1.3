import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, FlatList } from 'react-native';
import { colores, vidrio, textoAjustable } from '../theme';

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

  // Revisado = negro, Pendiente = rojo (acento de alerta)
  const getEstadoEstilo = (estado) => {
    return estado === 'Revisado'
      ? { fondo: styles.estadoRevisado, texto: styles.estadoTextRevisado }
      : { fondo: styles.estadoPendiente, texto: styles.estadoTextPendiente };
  };

  const renderCard = ({ item }) => {
    const estado = getEstadoEstilo(item.estado);
    return (
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <Text style={styles.cardNombre}>{item.nombre}</Text>
            <Text style={styles.cardFecha}>{item.fecha}</Text>
          </View>
          <View style={[styles.estadoBadge, estado.fondo]}>
            <Text style={[styles.estadoText, estado.texto]}>{item.estado}</Text>
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
        <Pressable style={({ pressed }) => [styles.mapBtn, pressed && styles.presionado]}>
          <Text style={styles.mapBtnText}>Ver ubicación en mapa →</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contenido}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo} {...textoAjustable}>Gestión</Text>
        <Text style={styles.subtitulo}>Monitorea revisiones de bodegas</Text>
      </View>

      {/* Botón Ver Todas Bodegas */}
      <Pressable style={({ pressed }) => [styles.allBodegasBtn, pressed && styles.presionado]}>
        <Text style={styles.allBodegasBtnText}>Ver todas las bodegas</Text>
      </Pressable>

      {/* Lista de Inventarios */}
      <FlatList
        data={inventariosGestionados}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />
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

  // Botón Ver Todas Bodegas (negro: el rojo se reserva para la acción principal)
  allBodegasBtn: {
    backgroundColor: colores.negro,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  allBodegasBtnText: {
    color: colores.blanco,
    fontSize: 15,
    fontWeight: '700',
  },
  presionado: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  // Card
  card: {
    ...vidrio,
    padding: 16,
    marginBottom: 12,
  },

  // Card Header
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  headerLeft: {
    flex: 1,
    marginRight: 10,
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

  // Estado Badge
  estadoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  estadoRevisado: {
    backgroundColor: colores.negro,
  },
  estadoPendiente: {
    backgroundColor: colores.rojoSuave,
  },
  estadoText: {
    fontSize: 11,
    fontWeight: '700',
  },
  estadoTextRevisado: {
    color: colores.blanco,
  },
  estadoTextPendiente: {
    color: colores.rojo,
  },

  // Sections
  section: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(10, 10, 10, 0.06)',
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colores.gris,
    marginBottom: 4,
  },
  sectionValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colores.negro,
  },
  observaciones: {
    fontSize: 13,
    color: colores.grisOscuro,
    lineHeight: 19,
  },

  // Botón Mapa
  mapBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colores.negro,
  },
  mapBtnText: {
    color: colores.negro,
    fontSize: 13,
    fontWeight: '700',
  },
});
