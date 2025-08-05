// ResponderCuestionario.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';

export const ResponderCuestionario = ({ route }) => {
    const { cuestionarioId } = route.params;
    const [cuestionario, setCuestionario] = useState(null);
    const [respuestas, setRespuestas] = useState({});
    const [resultado, setResultado] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerCuestionario = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/cuestionarios/${cuestionarioId}`)
                console.log(res.data)
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
            console.log("Enviando respuestas...", respuestas); 

            const res = await axios.post(`http://localhost:3000/api/cuestionarios/${cuestionarioId}/responder`, {
                respuestas,
            });
            setResultado(res.data);
        } catch (error) {
            Alert.alert("Error", "No se pudo enviar el cuestionario.");
        }
    };

    if (cargando) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

    if (!cuestionario) return <Text style={{ padding: 20 }}>Cuestionario no disponible.</Text>;

    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{cuestionario.titulo}</Text>
            <Text style={{ marginBottom: 10 }}>{cuestionario.descripcion}</Text>

            {cuestionario.preguntas.map((pregunta, index) => (
                <View key={index} style={{ marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>{index + 1}. {pregunta.pregunta}</Text>
                    {pregunta.opciones.map((opcion, i) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => manejarRespuesta(index, opcion)}
                            style={{
                                marginVertical: 5,
                                backgroundColor: respuestas[index] === opcion ? '#4CAF50' : '#f0f0f0',
                                padding: 10,
                                borderRadius: 5,
                            }}>
                            <Text>{opcion}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}

            <TouchableOpacity
                onPress={enviarRespuestas}
                style={{
                    backgroundColor: '#2196F3',
                    padding: 15,
                    borderRadius: 10,
                    marginTop: 10,
                }}>
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Enviar respuestas</Text>
            </TouchableOpacity>

            {resultado && (
                <View style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: 18 }}>✅ Aciertos: {resultado.aciertos} / {resultado.totalPreguntas}</Text>
                    <Text style={{ fontSize: 18 }}>📊 Porcentaje: {resultado.porcentaje}%</Text>
                    <Text style={{ fontSize: 16, marginTop: 10 }}>{resultado.mensaje}</Text>
                </View>
            )}
        </ScrollView>
    );
};

