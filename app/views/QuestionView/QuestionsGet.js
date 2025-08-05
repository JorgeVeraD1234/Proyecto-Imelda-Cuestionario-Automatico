import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import globalStyles from '../../globalStyles';

export const GetQuestions = () => {
    const [preguntas, setPreguntas] = useState([]);
    const [filtroEtiqueta, setFiltroEtiqueta] = useState('');
    const [filtroNivel, setFiltroNivel] = useState('');
    const navigation = useNavigation();

    const obtenerPreguntas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/preguntas/todas');
            setPreguntas(response.data);
        } catch (error) {
            console.error('Error al obtener preguntas:', error.message);
        }
    };

    useEffect(() => {
        obtenerPreguntas();
    }, []);

    const preguntasFiltradas = preguntas.filter(p => {
        const coincideEtiqueta = filtroEtiqueta ? p.etiqueta === filtroEtiqueta : true;
        const coincideNivel = filtroNivel ? p.nivel === filtroNivel : true;
        return coincideEtiqueta && coincideNivel;
    });

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.title}>📋 Lista de Preguntas</Text>

                <Text style={globalStyles.sectionTitle}>Filtrar por etiqueta</Text>
                <Picker
                    selectedValue={filtroEtiqueta}
                    onValueChange={(itemValue) => setFiltroEtiqueta(itemValue)}
                    style={pickerStyles}
                >
                    <Picker.Item label="Todas" value="" />
                    <Picker.Item label="Ciencia" value="Ciencia" />
                    <Picker.Item label="Historia" value="Historia" />
                    <Picker.Item label="Matemáticas" value="Matemáticas" />
                    <Picker.Item label="Geografía" value="Geografía" />
                </Picker>

                <Text style={globalStyles.sectionTitle}>Filtrar por nivel</Text>
                <Picker
                    selectedValue={filtroNivel}
                    onValueChange={(itemValue) => setFiltroNivel(itemValue)}
                    style={pickerStyles}
                >
                    <Picker.Item label="Todos" value="" />
                    <Picker.Item label="Básico" value="Básico" />
                    <Picker.Item label="Avanzado" value="Avanzado" />
                </Picker>

                <FlatList
                    data={preguntasFiltradas}
                    keyExtractor={(item) => item.id?.toString() || item._id}
                    renderItem={({ item }) => (
                        <View style={globalStyles.card}>
                            <Text style={globalStyles.cardText}>{item.pregunta}</Text>
                            <Text style={globalStyles.infoText}>Etiqueta: {item.etiqueta}</Text>
                            <Text style={globalStyles.infoText}>Nivel: {item.nivel}</Text>
                            <Text style={globalStyles.infoText}>Respuesta: {item.respuestaCorrecta}</Text>
                        </View>
                    )}
                    scrollEnabled={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />

                <TouchableOpacity onPress={() => navigation.navigate("CreateQuestion")}>
                    <Text style={[globalStyles.buttonText, { textAlign: "center", marginTop: 20 }]}>
                        ➕ Crear una pregunta
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const pickerStyles = {
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#ffffff",
    color: "#000000",
    marginBottom: 15
};
