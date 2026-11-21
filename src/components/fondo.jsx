import { View, StyleSheet } from 'react-native';
import { colores } from '../theme';

// Mancha de color difuminada: siete círculos concéntricos con la misma opacidad
// se superponen y simulan un degradado radial (React Native no trae blur nativo)
function Mancha({ tamano, color, posicion }) {
    return (
        <View style={[styles.mancha, { width: tamano, height: tamano }, posicion]}>
            {[1, 0.88, 0.76, 0.64, 0.52, 0.4, 0.28].map((escala) => (
                <View
                    key={escala}
                    style={{
                        position: 'absolute',
                        width: tamano * escala,
                        height: tamano * escala,
                        borderRadius: tamano,
                        backgroundColor: color,
                    }}
                />
            ))}
        </View>
    );
}

// Fondo de toda la app: las tarjetas de vidrio semitransparentes dejan ver estas manchas
export default function Fondo() {
    return (
        <View style={styles.fondo}>
            <Mancha tamano={360} color="rgba(220, 38, 38, 0.025)" posicion={{ top: -140, right: -120 }} />
            <Mancha tamano={300} color="rgba(10, 10, 10, 0.014)" posicion={{ top: 260, left: -150 }} />
            <Mancha tamano={260} color="rgba(220, 38, 38, 0.018)" posicion={{ bottom: -60, right: -80 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    fondo: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colores.fondo,
        overflow: 'hidden',
    },
    mancha: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
