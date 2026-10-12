import { StyleSheet, Text, View } from "react-native";

export default function Titulo({ texto, subtitulo }) {

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
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
        marginBottom: 25
    },

    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1e293b'
    },

    subtitulo: {
        fontSize: 15,
        fontWeight: '500',
        color: '#64748b'
    }
})
