import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { abrirBaseLocal } from '../data/baseLocal';

// Un solo arreglo de solicitudes para toda la funcionalidad.
// FormularioSolicitud y ListaSolicitudes lo leen desde aquí, sin pasarse props.
const SolicitudesContext = createContext(null);

export function SolicitudesProvider({ children }) {
    const [db, setDb] = useState(null);
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        let activo = true;

        async function iniciar() {
            try {
                const conexion = await abrirBaseLocal();
                const filas = await conexion.getAllAsync(
                    'SELECT * FROM solicitudes ORDER BY id DESC'
                );
                if (!activo) return;
                setDb(conexion);
                setSolicitudes(filas);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'No se pudo abrir la base de datos de solicitudes.');
            }
        }

        iniciar();
        return () => {
            activo = false;
        };
    }, []);

    // Agrega al arreglo compartido. Quien consuma el contexto se vuelve a dibujar solo.
    async function agregarSolicitud(asunto, descripcion) {
        const asuntoLimpio = asunto.trim();
        const descripcionLimpia = descripcion.trim();

        if (!asuntoLimpio || !descripcionLimpia) {
            Alert.alert('Validación', 'Complete asunto y descripción.');
            return false;
        }
        if (!db) return false;

        try {
            const resultado = await db.runAsync(
                'INSERT INTO solicitudes (asunto, descripcion, sincronizado) VALUES (?, ?, 0)',
                asuntoLimpio,
                descripcionLimpia
            );
            const nueva = {
                id: resultado.lastInsertRowId,
                asunto: asuntoLimpio,
                descripcion: descripcionLimpia,
                sincronizado: 0,
            };
            setSolicitudes((actuales) => [nueva, ...actuales]);
            return true;
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo guardar la solicitud.');
            return false;
        }
    }

    // Quita la solicitud del arreglo. La lista y el total cambian en el mismo render.
    async function eliminarSolicitud(id) {
        if (!db) return false;

        try {
            await db.runAsync('DELETE FROM solicitudes WHERE id = ?', id);
            setSolicitudes((actuales) => actuales.filter((item) => item.id !== id));
            return true;
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo eliminar la solicitud.');
            return false;
        }
    }

    const total = solicitudes.length;

    return (
        <SolicitudesContext.Provider value={{ solicitudes, total, dbLista: db !== null, agregarSolicitud, eliminarSolicitud }}>
            {children}
        </SolicitudesContext.Provider>
    );
}

export function useSolicitudes() {
    const contexto = useContext(SolicitudesContext);
    if (!contexto) {
        throw new Error('useSolicitudes debe usarse dentro de SolicitudesProvider.');
    }
    return contexto;
}
