import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import globalStyles from '../../globalStyles';

export const CreateQuestion = () => {
    const [etiqueta, setEtiqueta] = useState('');
    const [nivel, setNivel] = useState('Básico');
    const [pregunta, setPregunta] = useState('');
    const [opciones, setOpciones] = useState(['', '', '', '']);
    const [respuestaCorrecta, setRespuestaCorrecta] = useState('');
    const navigation = useNavigation();

    const handleOpcionChange = (text, index) => {
        const nuevasOpciones = [...opciones];
        nuevasOpciones[index] = text;
        setOpciones(nuevasOpciones);
    };

    const enviarPregunta = async () => {
        const opcionesLimpias = opciones.map(op => op.trim()).filter(op => op !== '');

        if (!etiqueta.trim() || !nivel.trim() || !pregunta.trim() || !respuestaCorrecta) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        if (opcionesLimpias.length < 2) {
            Alert.alert('Error', 'Debes ingresar al menos dos opciones');
            return;
        }

        if (!opcionesLimpias.includes(respuestaCorrecta)) {
            Alert.alert('Error', 'La respuesta correcta debe coincidir con una de las opciones');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/preguntas', {
                etiqueta: etiqueta.trim(),
                nivel: nivel.trim(),
                pregunta: pregunta.trim(),
                opciones: opcionesLimpias,
                respuestaCorrecta
            });

            Alert.alert('Éxito', 'Pregunta creada correctamente');
            setEtiqueta('');
            setNivel('Básico');
            setPregunta('');
            setOpciones(['', '', '', '']);
            setRespuestaCorrecta('');
            navigation.navigate("Main");
        } catch (error) {
            Alert.alert('Error', 'No se pudo crear la pregunta');
        }
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.title}>Crear Nueva Pregunta</Text>

                <TextInput
                    style={inputStyles}
                    placeholder="Etiqueta (ej. Ciencia)"
                    placeholderTextColor="#000000"
                    value={etiqueta}
                    onChangeText={setEtiqueta}
                />

                <Text style={globalStyles.sectionTitle}>Nivel de dificultad</Text>
                <Picker
                    selectedValue={nivel}
                    onValueChange={(itemValue) => setNivel(itemValue)}
                    style={pickerStyles}
                >
                    <Picker.Item label="Básico" value="Básico" />
                    <Picker.Item label="Avanzado" value="Avanzado" />
                </Picker>

                <TextInput
                    style={inputStyles}
                    placeholder="Pregunta"
                    placeholderTextColor="#000000"
                    value={pregunta}
                    onChangeText={setPregunta}
                />

                <Text style={globalStyles.sectionTitle}>Opciones</Text>
                {opciones.map((opcion, index) => (
                    <TextInput
                        key={index}
                        style={inputStyles}
                        placeholder={`Opción ${index + 1}`}
                        placeholderTextColor="#000000"
                        value={opcion}
                        onChangeText={(text) => handleOpcionChange(text, index)}
                    />
                ))}

                <Text style={globalStyles.sectionTitle}>Selecciona la respuesta correcta</Text>
                <Picker
                    selectedValue={respuestaCorrecta}
                    onValueChange={(itemValue) => setRespuestaCorrecta(itemValue)}
                    style={pickerStyles}
                >
                    <Picker.Item label="Selecciona una opción" value="" />
                    {opciones
                        .filter(op => op.trim() !== '')
                        .map((opcion, index) => (
                            <Picker.Item key={index} label={opcion} value={opcion} />
                        ))}
                </Picker>

                <View style={{ marginTop: 20 }}>
                    <Button title="Guardar Pregunta" onPress={enviarPregunta} color="#000000" />
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
