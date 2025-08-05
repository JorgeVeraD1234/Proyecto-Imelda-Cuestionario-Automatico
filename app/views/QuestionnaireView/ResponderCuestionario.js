import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import globalStyles from '../../globalStyles';

export const ResponderCuestionario = ({ route }) => {
    const { cuestionarioId } = route.params;
    const [cuestionario, setCuestionario] = useState(null);
    const [respuestas, setRespuestas] = useState({});
    const [resultado, setResultado] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerCuestionario = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/cuestionarios/${cuestionarioId}`);
                setCuestionario(res.data);
            } catch (error) {
                Alert.alert("Error", "No se pudo cargar el cuestionario.");
            } finally {
                setCargando(false);
            }
        };
        obtenerCuestionario();
    }, [cuestionarioId]);

    const manejarRespuesta = (index, opcion) => {
        setRespuestas({ ...respuestas, [index]: opcion });
    };

    const enviarRespuestas = async () => {
        try {
            const res = await axios.post(`http://localhost:3000/api/cuestionarios/${cuestionarioId}/responder`, {
                respuestas,
            });
            setResultado(res.data);
        } catch (error) {
            Alert.alert("Error", "No se pudo enviar el cuestionario.");
        }
    };

    if (cargando) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#000000" />
                <Text style={globalStyles.loadingText}>Cargando cuestionario...</Text>
            </View>
        );
    }

    if (!cuestionario) {
        return (
            <View style={globalStyles.container}>
                <Text style={globalStyles.errorText}>Cuestionario no disponible.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.title}>{cuestionario.titulo}</Text>
                <Text style={globalStyles.infoText}>{cuestionario.descripcion}</Text>

                {cuestionario.preguntas.map((pregunta, index) => (
                    <View key={index} style={{ marginBottom: 20 }}>
                        <Text style={globalStyles.sectionTitle}>{index + 1}. {pregunta.pregunta}</Text>
                        {pregunta.opciones.map((opcion, i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={() => manejarRespuesta(index, opcion)}
                                style={[
                                    optionStyles,
                                    respuestas[index] === opcion && selectedOptionStyles
                                ]}
                            >
                                <Text style={globalStyles.cardText}>{opcion}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}

                <TouchableOpacity style={submitButton} onPress={enviarRespuestas}>
                    <Text style={globalStyles.buttonText}>Enviar respuestas</Text>
                </TouchableOpacity>

                {resultado && (
                    <View style={{ marginTop: 30 }}>
                        <Text style={globalStyles.sectionTitle}>✅ Aciertos: {resultado.aciertos} / {resultado.totalPreguntas}</Text>
                        <Text style={globalStyles.sectionTitle}>📊 Porcentaje: {resultado.porcentaje}%</Text>
                        <Text style={globalStyles.infoText}>{resultado.mensaje}</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );

};

const optionStyles = {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5
};

const selectedOptionStyles = {
    backgroundColor: "#000000"
};

const submitButton = {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center"
};
