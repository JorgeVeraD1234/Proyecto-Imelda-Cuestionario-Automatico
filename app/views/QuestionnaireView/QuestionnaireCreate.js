import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import globalStyles from '../../globalStyles';

export const CreateQuestionnaire = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tema, setTema] = useState('');
    const [dificultad, setDificultad] = useState('');
    const navigation = useNavigation();

    const handleSubmit = async () => {
        if (!titulo || !descripcion || !tema || !dificultad) {
            Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/cuestionarios", {
                titulo,
                descripcion,
                tema,
                dificultad
            });
            Alert.alert('Éxito', 'Cuestionario creado correctamente');
            setTitulo('');
            setDescripcion('');
            setTema('');
            setDificultad('');
            navigation.navigate("QuestionnaireMain");
        } catch (error) {
            Alert.alert('Error', error.response?.data?.error || 'Error al crear el cuestionario');
            console.log("ERROR STATUS:", error.response?.status);
            console.log("ERROR DATA:", error.response?.data);
        }
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.sectionTitle}>Título</Text>
                <TextInput
                    style={inputStyles}
                    value={titulo}
                    onChangeText={setTitulo}
                    placeholder="Ej. Cuestionario de ciencias"
                    placeholderTextColor="#000000"
                />

                <Text style={globalStyles.sectionTitle}>Descripción</Text>
                <TextInput
                    style={inputStyles}
                    value={descripcion}
                    onChangeText={setDescripcion}
                    placeholder="Breve descripción"
                    placeholderTextColor="#000000"
                />

                <Text style={globalStyles.sectionTitle}>Tema</Text>
                <Picker
                    selectedValue={tema}
                    onValueChange={setTema}
                    style={pickerStyles}
                >
                    <Picker.Item label="Selecciona un tema" value="" />
                    <Picker.Item label="Matemáticas" value="Matemáticas" />
                    <Picker.Item label="Historia" value="Historia" />
                    <Picker.Item label="Ciencia" value="Ciencia" />
                </Picker>

                <Text style={globalStyles.sectionTitle}>Nivel de dificultad</Text>
                <Picker
                    selectedValue={dificultad}
                    onValueChange={setDificultad}
                    style={pickerStyles}
                >
                    <Picker.Item label="Selecciona nivel" value="" />
                    <Picker.Item label="Básico" value="Básico" />
                    <Picker.Item label="Avanzado" value="Avanzado" />
                </Picker>

                <View style={{ marginTop: 20 }}>
                    <Button title="Crear Cuestionario" onPress={handleSubmit} color="#000000" />
                </View>
            </View>
        </ScrollView>
    );
};

const inputStyles = {
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    marginBottom: 15,
    color: "#000000"
};

const pickerStyles = {
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#ffffff",
    color: "#000000",
    marginBottom: 15
};
