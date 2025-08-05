import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    ActivityIndicator,
    StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import globalStyles from '../../globalStyles';

export const UserView = () => {
    const navigation = useNavigation();
    const [userId, setUserId] = useState(null);
    const [questionnaires, setQuestionnaires] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        try {
            const storedId = await AsyncStorage.getItem("userId");
            if (!storedId) {
                console.warn("No se encontró el ID del usuario en AsyncStorage.");
                navigation.navigate("Login");
                return;
            }
            setUserId(storedId);

            const response = await axios.get(`http://localhost:3000/api/cuestionarios`);
            const filtered = response.data.filter(q => q.user?._id === storedId);
            setQuestionnaires(filtered);
        } catch (error) {
            console.error("Error al obtener cuestionarios:", error);
            Alert.alert("Error", "No se pudieron cargar los cuestionarios.");
        } finally {
            setLoading(false);
        }
    };

    const onPressLogout = async () => {
        try {
            await AsyncStorage.removeItem("userId");
            navigation.navigate("Login");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "No se pudo cerrar sesión.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/deleteQuestionnaire/${id}`);
            fetchUserData();
            Alert.alert("Eliminado", "Cuestionario eliminado correctamente.");
        } catch (error) {
            console.error("Error al eliminar cuestionario:", error);
            Alert.alert("Error", "No se pudo eliminar el cuestionario.");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (loading) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#000000" />
                <Text style={globalStyles.loadingText}>Cargando tus cuestionarios...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.title}>📚 Tus Cuestionarios</Text>

                {questionnaires.length === 0 ? (
                    <Text style={globalStyles.infoText}>No tienes cuestionarios registrados.</Text>
                ) : (
                    questionnaires.map((q) => (
                        <View key={q._id} style={globalStyles.card}>
                            <Text style={globalStyles.sectionTitle}>{q.title}</Text>

                            <View style={styles.actions}>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.viewButton]}
                                    onPress={() => navigation.navigate("QuestionnaireDetail", { questionnaireId: q._id })}
                                >
                                    <Text style={styles.actionText}>👁️ Ver / Contestar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.actionButton, styles.editButton]}
                                    onPress={() => navigation.navigate("UpdateQuestionnaire", { questionnaireId: q._id })}
                                >
                                    <Text style={styles.actionText}>✏️ Editar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.actionButton, styles.deleteButton]}
                                    onPress={() => handleDelete(q._id)}
                                >
                                    <Text style={styles.actionText}>🗑️ Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}

                <TouchableOpacity
                    style={[globalStyles.button, { marginBottom: 20 }]}
                    onPress={() => navigation.navigate("QuestionnaireMain")}
                >
                    <Text style={globalStyles.buttonText}>Ver cuestionario</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[globalStyles.button, { marginBottom: 20 }]}
                    onPress={() => navigation.navigate("GetQuestions")}
                >
                    <Text style={globalStyles.buttonText}>Ver preguntas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[globalStyles.button, globalStyles.logoutButton]} onPress={onPressLogout}>
                    <Text style={globalStyles.buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    actionButton: {
        padding: 10,
        borderRadius: 6,
        flex: 1,
        marginHorizontal: 4,
        alignItems: "center",
    },
    viewButton: {
        backgroundColor: "#000000",
    },
    editButton: {
        backgroundColor: "#000000",
    },
    deleteButton: {
        backgroundColor: "#000000",
    },
    actionText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 14,
    },
});
