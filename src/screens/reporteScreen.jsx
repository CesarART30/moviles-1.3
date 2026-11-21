import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Image, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Accelerometer } from "expo-sensors";
import Titulo from "../components/titulo";
import { colores, vidrio, textoAjustable } from "../theme";
import  * as Location from "expo-location"


// reportes y setReportes llegan desde App.js para que la lista no se pierda al cambiar de pantalla
export default function ReporteScreen({ reportes, setReportes }) {

    // productos del inventario que se pueden reportar
    const [productos] = React.useState([
        { id: 1, codigo: "PRD-001", nombre: "Monitor LED 24\"", bodega: "Bodega A" },
        { id: 2, codigo: "PRD-002", nombre: "Camiseta algodón", bodega: "Bodega B" },
        { id: 3, codigo: "PRD-003", nombre: "Caja de cereal", bodega: "Almacén C" },
        { id: 4, codigo: "PRD-004", nombre: "Resma de papel", bodega: "Oficina D" },
    ]);
    const tiposDefecto = ["Dañado", "Vencido", "Incompleto", "Otro"];
    
    const [ubicacion, setUbicacion] = useState(null);
    const [consultandoUbicacion, setConsultandoUbicacion] = useState(false);
    const [aceleracion, setAceleracion] = useState({ x: 0, y: 0, z: 0 });
    const [movimientoDetectado, setMovimientoDetectado] = useState(false);
    const [sensorDisponible, setSensorDisponible] = useState(Platform.OS !== "web");
    const magnitudAnterior = useRef(null);
  
    const [productoSeleccionado, setProductoSeleccionado] = React.useState(null);
    const [tipoDefecto, setTipoDefecto] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");
    const [imagen, setImagen] = React.useState(null);

    useEffect(() => {
        if (Platform.OS === "web") {
            return;
        }

        Accelerometer.setUpdateInterval(500);

        const suscripcion = Accelerometer.addListener((datos) => {
            const magnitud = Math.sqrt(
                datos.x ** 2 + datos.y ** 2 + datos.z ** 2
            );
            const huboMovimiento =
                magnitudAnterior.current !== null &&
                Math.abs(magnitud - magnitudAnterior.current) > 0.35;

            setAceleracion(datos);
            setMovimientoDetectado(huboMovimiento);
            magnitudAnterior.current = magnitud;
        });

        return () => suscripcion.remove();
    }, []);

    const seleccionarImagen = async () => {
        try {
            // Solicitar permisos para acceder a la galería
            const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
            // si el permiso es denegado, mostrar un mensaje y salir de la función
            if (!permiso.granted) {
                Alert.alert(
                    "Permiso denegado para acceder a la galería.",
                    "No se puede acceder a la galería de imágenes."
                );
                return;
            }
            // Abrir la galería para seleccionar una imagen
            const resultado = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });
            // si el usuario cancela la selección, salir de la función
            // guardar la URI de la imagen seleccionada en el estado
            if (!resultado.canceled) {
                setImagen(resultado.assets[0].uri);
            }
        } catch (error) {
            console.error("Error al seleccionar la imagen:", error);
            Alert.alert(
                "Error al seleccionar la imagen.",
                "Ocurrió un error al intentar seleccionar la imagen."
            );
        }
    };

    const tomarFoto = async () => {
        try {
            // solicitar permisos para acceder a la cámara
            const permiso = await ImagePicker.requestCameraPermissionsAsync();
            // si el permiso es denegado, mostrar un mensaje y salir de la función
            if (!permiso.granted) {
                Alert.alert(
                    "Permiso denegado para acceder a la cámara.",
                    "No se puede acceder a la cámara."
                );
                return;
            }
            // abrir la cámara para tomar una foto
            const resultado = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });
            // si el usuario cancela la toma de foto, salir de la función
            // guardar la URI de la foto tomada en el estado
            if (!resultado.canceled) {
                setImagen(resultado.assets[0].uri);
            }
        } catch (error) {
            console.error("Error al tomar la foto:", error);
            Alert.alert(
                "Error al tomar la foto.",
                "Ocurrió un error al intentar tomar la foto."
            );
        }
    };

    
    
    
      const obtenerUbicacion = async () => {
        try{
          setConsultandoUbicacion(true);
          const location = await Location.requestForegroundPermissionsAsync();
    
          if (location.status !== "granted") {
            Alert.alert (
              "Permiso requerido",
              "Autoriza el acceso a tu ubicacion para continuar"
            );
            return;
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

    const enviarReporte = () => {
        // validar que el formulario esté completo
        if (!productoSeleccionado || !tipoDefecto || !descripcion.trim()) {
            Alert.alert(
                "Campos incompletos.",
                "Selecciona el producto, el tipo de defecto y escribe una descripción."
            );
            return;
        }
        // validar que exista una foto como evidencia
        if (!imagen) {
            Alert.alert(
                "Falta la evidencia.",
                "Toma o selecciona una foto del producto defectuoso."
            );
            return;
        }
        // crear el nuevo reporte con estado inicial "En revisión"
        const nuevoReporte = {
            id: Date.now(),
            codigo: `REP-${String(reportes.length + 1).padStart(3, "0")}`,
            producto: productoSeleccionado.nombre,
            tipo: tipoDefecto,
            descripcion: descripcion.trim(),
            imagen: imagen,
            fecha: new Date().toLocaleDateString(),
            estado: "En revisión",
        };
        // agregar el reporte al inicio de la lista (el estado vive en App.js)
        setReportes([nuevoReporte, ...reportes]);
        // limpiar el formulario
        setProductoSeleccionado(null);
        setTipoDefecto("");
        setDescripcion("");
        setImagen(null);
        Alert.alert("Reporte enviado.", "El reporte quedó en revisión.");
    };

    // elegir los estilos del badge según el estado del reporte
    const estiloBadge = (estado) => {
        if (estado === "Aprobado") return { fondo: styles.badgeAprobada, texto: styles.badgeTextoAprobada };
        if (estado === "En revisión") return { fondo: styles.badgeRevision, texto: styles.badgeTextoRevision };
        return { fondo: styles.badgeDefault, texto: null };
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contenido}>
            <Titulo
                texto="Reportar defecto"
                subtitulo="Registra productos defectuosos con evidencia"
            />

            {/* SELECCIÓN DE PRODUCTO */}
            <Text style={styles.etiqueta}>Producto</Text>
            <View style={styles.chips}>
                {productos.map((producto) => {
                    const activo = productoSeleccionado?.id === producto.id;
                    return (
                        <Pressable
                            key={producto.id}
                            style={[styles.chip, activo && styles.chipActivo]}
                            onPress={() => setProductoSeleccionado(producto)}
                        >
                            <Text style={[styles.chipTexto, activo && styles.chipTextoActivo]}>
                                {producto.nombre}
                            </Text>
                            <Text style={[styles.chipCodigo, activo && styles.chipCodigoActivo]}>
                                {producto.codigo} · {producto.bodega}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            {/* TIPO DE DEFECTO */}
            <Text style={styles.etiqueta}>Tipo de defecto</Text>
            <View style={styles.chips}>
                {tiposDefecto.map((tipo) => (
                    <Pressable
                        key={tipo}
                        style={[styles.chip, tipoDefecto === tipo && styles.chipActivo]}
                        onPress={() => setTipoDefecto(tipo)}
                    >
                        <Text style={[styles.chipTexto, tipoDefecto === tipo && styles.chipTextoActivo]}>
                            {tipo}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {/* CAMPO DE DESCRIPCIÓN */}
            <Text style={styles.etiqueta}>Descripción</Text>
            <TextInput
                placeholder="Describe el defecto encontrado"
                placeholderTextColor={colores.gris}
                value={descripcion}
                onChangeText={setDescripcion}
                style={[styles.input, styles.areaDeTexto]}
                multiline
            />

            {/* EVIDENCIA FOTOGRÁFICA */}
            <Text style={styles.etiqueta}>Evidencia fotográfica</Text>
            <View style={styles.filaBotones}>
                <Pressable
                    style={({ pressed }) => [styles.botonSecundario, pressed && styles.presionado]}
                    onPress={tomarFoto}
                >
                    <Text style={styles.botonSecundarioTexto}>Tomar foto</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [styles.botonSecundario, pressed && styles.presionado]}
                    onPress={seleccionarImagen}
                >
                    <Text style={styles.botonSecundarioTexto}>Galería</Text>
                </Pressable>
            </View>
            {imagen && (
                <View style={styles.imagenContainer}>
                    <Text style={styles.imagenTexto}>Imagen seleccionada</Text>
                    <Image source={{ uri: imagen }} style={styles.imagen} />
                    <Pressable onPress={() => setImagen(null)}>
                        <Text style={styles.quitarTexto}>✕ Quitar imagen</Text>
                    </Pressable>
                </View>
            )}

            <Pressable
                style={({ pressed }) => [styles.botonSecundario, pressed && styles.presionado]}
                onPress={obtenerUbicacion}
                disabled={consultandoUbicacion}
            >
                <Text style={styles.botonSecundarioTexto}>
                    {consultandoUbicacion ? "Obteniendo ubicación..." : "Obtener ubicación"}
                </Text>
            </Pressable>
                {ubicacion && (
                    <View style={styles.tarjetaUbicacion}>
                        <Text style={styles.ubicacionTexto}> Latitud:{ubicacion.latitud.toFixed(6)}</Text>
                        <Text style={styles.ubicacionTexto}> Longitud:{ubicacion.longitud.toFixed(6)}</Text>
                        <Text style={styles.ubicacionTexto}> Precision aproximada: {
                            ubicacion.precision == null
                            ? "Desconocida":`${Math.round(ubicacion.precision)} metros`}
                        </Text>
                    </View>
                )}

            <View style={styles.tarjetaAcelerometro}>
                <Text style={styles.ubicacionTexto}>Detector de movimiento</Text>
                <Text style={styles.sensorTexto}>
                    {!sensorDisponible
                        ? "No disponible en navegador"
                        : movimientoDetectado
                        ? "Movimiento detectado"
                        : "Sin movimiento brusco"}
                </Text>
                {sensorDisponible && (
                    <Text style={styles.sensorDetalle}>
                        X: {aceleracion.x.toFixed(2)} · Y: {aceleracion.y.toFixed(2)} · Z: {aceleracion.z.toFixed(2)} g
                    </Text>
                )}
            </View>
            

            {/* BOTÓN ENVIAR */}
            <Pressable
                style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
                onPress={enviarReporte}
            >
                <Text style={styles.botonTexto}>Enviar reporte</Text>
            </Pressable>

            {/* LISTA DE REPORTES */}
            <Text style={styles.seccion} {...textoAjustable}>Reportes enviados</Text>
            {reportes.map((reporte) => {
                const badge = estiloBadge(reporte.estado);
                return (
                    <View key={reporte.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.codigo}>{reporte.codigo}</Text>
                            <View style={[styles.badge, badge.fondo]}>
                                <Text style={[styles.badgeTexto, badge.texto]}>{reporte.estado}</Text>
                            </View>
                        </View>
                        <Text style={styles.tipo}>{reporte.producto} · {reporte.tipo}</Text>
                        <Text style={styles.descripcionCard}>{reporte.descripcion}</Text>
                        {reporte.imagen && (
                            <Image source={{ uri: reporte.imagen }} style={styles.miniatura} />
                        )}
                        <Text style={styles.fecha}>{reporte.fecha}</Text>
                    </View>
                );
            })}
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
    etiqueta: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: colores.gris,
        marginBottom: 8,
    },

    // Chips de selección: negro cuando están activos
    chips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 18,
    },
    chip: {
        ...vidrio,
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 9,
    },
    chipActivo: {
        backgroundColor: colores.negro,
        borderColor: colores.negro,
    },
    chipTexto: {
        fontSize: 14,
        fontWeight: '600',
        color: colores.negro,
    },
    ubicacionTexto: {
        fontSize: 14,
        fontWeight: '600',
        color: colores.negro,
    },
    chipTextoActivo: {
        color: colores.blanco,
    },
    chipCodigo: {
        fontSize: 11,
        color: colores.gris,
        marginTop: 2,
    },
    chipCodigoActivo: {
        color: 'rgba(255, 255, 255, 0.6)',
    },

    // Campo de texto
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 18,
        fontSize: 14,
        color: colores.negro,
        borderWidth: 1,
        borderColor: colores.grisClaro,
    },
    areaDeTexto: {
        height: 100,
        textAlignVertical: 'top',
    },

    // Botones de foto
    filaBotones: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 12,
    },
    botonSecundario: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 14,
        paddingVertical: 13,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: colores.negro,
    },
    botonSecundarioTexto: {
        color: colores.negro,
        fontSize: 14,
        fontWeight: '700',
    },
    presionado: {
        opacity: 0.85,
        transform: [{ scale: 0.98 }],
    },

    // Vista previa de la imagen
    imagenContainer: {
        ...vidrio,
        padding: 12,
        marginBottom: 12,
    },
    imagenTexto: {
        fontSize: 12,
        color: colores.gris,
        marginBottom: 8,
    },
    imagen: {
        width: '100%',
        aspectRatio: 4 / 3,
        borderRadius: 12,
        marginBottom: 10,
    },
    quitarTexto: {
        fontSize: 13,
        fontWeight: '700',
        color: colores.rojo,
        textAlign: 'center',
    },

    // Botón principal (rojo = acento del 10 %)
    boton: {
        backgroundColor: colores.rojo,
        borderRadius: 16,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 28,
        shadowColor: colores.rojo,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
    },
    botonTexto: {
        color: colores.blanco,
        fontSize: 15,
        fontWeight: '700',
    },

    // Lista de reportes
    seccion: {
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: -0.3,
        color: colores.negro,
        marginBottom: 12,
    },
    card: {
        ...vidrio,
        padding: 16,
        marginBottom: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    tarjetaUbicacion: {
        backgroundColor: colores.grisClaro,
        borderColor: colores.gris,
        alignItems: 'center',
        marginBottom: 8,
    },
    tarjetaAcelerometro: {
        ...vidrio,
        padding: 12,
        alignItems: 'center',
        marginBottom: 8,
    },
    sensorTexto: {
        fontSize: 13,
        fontWeight: '700',
        color: colores.rojo,
        marginTop: 4,
    },
    sensorDetalle: {
        fontSize: 11,
        color: colores.gris,
        marginTop: 4,
    },
    codigo: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
        color: colores.gris,
    },
    tipo: {
        fontSize: 16,
        fontWeight: '700',
        color: colores.negro,
        marginBottom: 6,
    },
    descripcionCard: {
        fontSize: 14,
        lineHeight: 20,
        color: colores.grisOscuro,
        marginBottom: 8,
    },
    miniatura: {
        width: '100%',
        height: 140,
        borderRadius: 12,
        marginBottom: 8,
    },
    fecha: {
        fontSize: 12,
        color: colores.gris,
    },

    // Badges de estado: negro = aprobado, rojo = en revisión
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },
    badgeAprobada: {
        backgroundColor: colores.negro,
    },
    badgeRevision: {
        backgroundColor: colores.rojoSuave,
    },
    badgeDefault: {
        backgroundColor: colores.grisClaro,
    },
    badgeTexto: {
        fontSize: 11,
        fontWeight: '700',
        color: colores.negro,
    },
    badgeTextoAprobada: {
        color: colores.blanco,
    },
    badgeTextoRevision: {
        color: colores.rojo,
    },
});
