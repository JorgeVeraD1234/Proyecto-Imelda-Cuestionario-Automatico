import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    TextInput,
    Button,
    Alert,
    ScrollView
} from "react-native";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import globalStyles from "../../globalStyles";

export const QuestionnaireDetail = () => {
    const { params } = useRoute();
    const navigation = useNavigation();
    const { cuestionarioId } = params;

    const [cuestionario, setCuestionario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tituloEditado, setTituloEditado] = useState("");
    const [descripcionEditada, setDescripcionEditada] = useState("");

    useEffect(() => {
        const fetchCuestionario = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/cuestionarios/${cuestionarioId}`);
                setCuestionario(res.data);
                setTituloEditado(res.data.titulo);
                setDescripcionEditada(res.data.descripcion);
            } catch (err) {
                Alert.alert("Error", "No se pudo cargar el cuestionario");
            } finally {
                setLoading(false);
            }
        };

        fetchCuestionario();
    }, [cuestionarioId]);

    const actualizarCuestionario = async () => {
        try {
            await axios.put(`http://localhost:3000/api/cuestionarios/${cuestionarioId}`, {
                titulo: tituloEditado,
                descripcion: descripcionEditada
            });
            Alert.alert("Éxito", "Cuestionario actualizado");
            navigation.navigate("QuestionnaireMain", { refresh: true });
        } catch (err) {
            Alert.alert("Error", "No se pudo actualizar");
        }
    };

    const eliminarCuestionario = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/cuestionarios/${cuestionarioId}`);
            Alert.alert("Eliminado", "Cuestionario eliminado");
            navigation.navigate("QuestionnaireMain", { refresh: true });
        } catch (err) {
            Alert.alert("Error", "No se pudo eliminar");
        }
    };

    if (loading) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#000000" />
                <Text style={globalStyles.loadingText}>Cargando cuestionario...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.title}>📘 Detalles del Cuestionario</Text>

                <TextInput
                    style={inputStyles}
                    value={tituloEditado}
                    onChangeText={setTituloEditado}
                    placeholder="Título"
                    placeholderTextColor="#000000"
                />
                <TextInput
                    style={[inputStyles, { height: 80, textAlignVertical: "top" }]}
                    value={descripcionEditada}
                    onChangeText={setDescripcionEditada}
                    placeholder="Descripción"
                    placeholderTextColor="#000000"
                    multiline
                />

                <Button title="Actualizar" onPress={actualizarCuestionario} color="#000000" />
                <View style={{ marginTop: 10 }}>
                    <Button title="Eliminar Cuestionario" onPress={eliminarCuestionario} color="#000000" />
                </View>

                <Text style={globalStyles.sectionTitle}>📝 Preguntas</Text>
                {cuestionario.preguntas.map((pregunta, idx) => (
                    <View key={idx} style={globalStyles.card}>
                        <Text style={globalStyles.cardText}>Pregunta {idx + 1}: {pregunta.pregunta}</Text>
                        {pregunta.opciones.map((opcion, i) => (
                            <Text key={i} style={globalStyles.infoText}>• {opcion}</Text>
                        ))}
                        <Text style={[globalStyles.infoText, { fontStyle: "italic" }]}>
                            ✅ Respuesta correcta: {pregunta.respuestaCorrecta}
                        </Text>
                    </View>
                ))}
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
