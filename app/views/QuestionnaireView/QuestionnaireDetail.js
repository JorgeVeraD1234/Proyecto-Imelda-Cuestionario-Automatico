import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Button, Alert, ScrollView } from "react-native"
import axios from "axios"
import { useRoute, useNavigation } from "@react-navigation/native"

export const QuestionnaireDetail = () => {
    const { params } = useRoute()
    const navigation = useNavigation()
    const { cuestionarioId } = params

    const [cuestionario, setCuestionario] = useState(null)
    const [loading, setLoading] = useState(true)
    const [tituloEditado, setTituloEditado] = useState("")
    const [descripcionEditada, setDescripcionEditada] = useState("")

    useEffect(() => {
        const fetchCuestionario = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/cuestionarios/${cuestionarioId}`)
                setCuestionario(res.data)
                setTituloEditado(res.data.titulo)
                setDescripcionEditada(res.data.descripcion)
            } catch (err) {
                Alert.alert("Error", "No se pudo cargar el cuestionario")
            } finally {
                setLoading(false)
            }
        }

        fetchCuestionario()
    }, [cuestionarioId])

    const actualizarCuestionario = async () => {
        try {
            await axios.put(`http://localhost:3000/api/cuestionarios/${cuestionarioId}`, {
                titulo: tituloEditado,
                descripcion: descripcionEditada
            })
            Alert.alert("Éxito", "Cuestionario actualizado")
            navigation.navigate("QuestionnaireMain", { refresh: true })
        } catch (err) {
            Alert.alert("Error", "No se pudo actualizar")
        }
    }

    const eliminarCuestionario = async () => {
        try {
            console.log("Intentando eliminar") 
            console.log("cuestionarioId:", cuestionarioId)
            await axios.delete(`http://localhost:3000/api/cuestionarios/${cuestionarioId}`)
            Alert.alert("Eliminado", "Cuestionario eliminado")
            navigation.navigate("QuestionnaireMain", { refresh: true })
        } catch (err) {
            Alert.alert("Error", "No se pudo eliminar")
        }
    }


if (loading) return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />

return (
    <ScrollView style={styles.container}>
        <Text style={styles.header}>📘 Detalles del Cuestionario</Text>

        <TextInput
            style={styles.input}
            value={tituloEditado}
            onChangeText={setTituloEditado}
            placeholder="Título"
        />
        <TextInput
            style={[styles.input, styles.textArea]}
            value={descripcionEditada}
            onChangeText={setDescripcionEditada}
            placeholder="Descripción"
            multiline
        />

        <Button title="Actualizar" onPress={actualizarCuestionario} color="#4CAF50" />
        <View style={{ marginTop: 10 }}>
            <Button title="Eliminar Cuestionario" onPress={eliminarCuestionario} color="#F44336" />
        </View>

        <Text style={styles.subHeader}>📝 Preguntas</Text>
        {cuestionario.preguntas.map((pregunta, idx) => (
            <View key={idx} style={styles.card}>
                <Text style={styles.question}>Pregunta {idx + 1}: {pregunta.pregunta}</Text>
                {pregunta.opciones.map((opcion, i) => (
                    <Text key={i} style={styles.option}>• {opcion}</Text>
                ))}
                <Text style={styles.answer}>✅ Respuesta correcta: {pregunta.respuestaCorrecta}</Text>
            </View>
        ))}
    </ScrollView>
)
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff"
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15
    },
    subHeader: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10
    },
    textArea: {
        height: 80,
        textAlignVertical: "top"
    },
    card: {
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10
    },
    question: {
        fontWeight: "bold",
        marginBottom: 5
    },
    option: {
        marginLeft: 10,
        fontSize: 14
    },
    answer: {
        marginTop: 5,
        fontStyle: "italic",
        color: "green"
    }
})
