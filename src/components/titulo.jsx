import { StyleSheet, Text, View } from "react-native";
import { colores, textoAjustable } from "../theme";

export default function Titulo({ texto, subtitulo }) {

    return (
        <View style={styles.container}>
            <Text style={styles.titulo} {...textoAjustable}>
                {texto}
            </Text>

            {subtitulo && (

                <Text style={styles.subtitulo}>
                    {subtitulo}
                </Text>
            )}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24
    },

    titulo: {
        fontSize: 30,
        fontWeight: '800',
        color: colores.negro,
        letterSpacing: -0.5
    },

    subtitulo: {
        fontSize: 14,
        fontWeight: '500',
        color: colores.gris,
        marginTop: 4
    }
})
