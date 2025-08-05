import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
import { useRoute, useNavigation } from "@react-navigation/native"

export const CreateQuestionnaire = () => {
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [tema, setTema] = useState('')
    const [dificultad, setDificultad] = useState('')
    const navigation = useNavigation()

    const handleSubmit = async () => {
        if (!titulo || !descripcion || !tema || !dificultad) {
            Alert.alert('Campos incompletos', 'Por favor completa todos los campos.')
            return
        }

        try {
            const response = await axios.post("http://localhost:3000/api/cuestionarios", {
                titulo,
                descripcion,
                tema,
                dificultad
            })
            Alert.alert('Éxito', 'Cuestionario creado correctamente')
            setTitulo('')
            setDescripcion('')
            setTema('')
            setDificultad('')
            navigation.navigate("QuestionnaireMain")
        } catch (error) {
            Alert.alert('Error', error.response?.data?.error || 'Error al crear el cuestionario')
            console.log("ERROR STATUS:", error.response?.status)
            console.log("ERROR DATA:", error.response?.data)

        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Título</Text>
            <TextInput
                style={styles.input}
                value={titulo}
                onChangeText={setTitulo}
                placeholder="Ej. Cuestionario de ciencias"
            />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
                style={styles.input}
                value={descripcion}
                onChangeText={setDescripcion}
                placeholder="Breve descripción"
            />

            <Text style={styles.label}>Tema</Text>
            <Picker
                selectedValue={tema}
                onValueChange={setTema}
                style={styles.picker}
            >
                <Picker.Item label="Selecciona un tema" value="" />
                <Picker.Item label="Matemáticas" value="Matemáticas" />
                <Picker.Item label="Historia" value="Historia" />
                <Picker.Item label="Ciencia" value="Ciencia" />
                {/* Puedes cargar temas desde la API si lo deseas */}
            </Picker>

            <Text style={styles.label}>Nivel de dificultad</Text>
            <Picker
                selectedValue={dificultad}
                onValueChange={setDificultad}
                style={styles.picker}
            >
                <Picker.Item label="Selecciona nivel" value="" />
                <Picker.Item label="Básico" value="Básico" />
                <Picker.Item label="Avanzado" value="Avanzado" />
            </Picker>

            <Button title="Crear Cuestionario" onPress={handleSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1
    },
    label: {
        marginTop: 10,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 4
    },
    picker: {
        marginTop: 5,
        marginBottom: 10
    }
})
