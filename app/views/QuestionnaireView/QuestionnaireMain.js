import React, { useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import globalStyles from "../../globalStyles";

export const QuestionnaireMain = () => {
  const [cuestionarios, setCuestionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const fetchCuestionarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/cuestionarios");
      setCuestionarios(response.data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los cuestionarios");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetchCuestionarios();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={globalStyles.card}>
      <Text style={globalStyles.sectionTitle}>{item.titulo}</Text>
      <Text style={globalStyles.infoText}>{item.descripcion}</Text>

      <TouchableOpacity
        style={buttonSmall}
        onPress={() => navigation.navigate("QuestionnaireDetail", { cuestionarioId: item._id })}
      >
        <Text style={globalStyles.buttonText}>📄 Ver detalles</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={buttonSmall}
        onPress={() => navigation.navigate("ResponderCuestionario", { cuestionarioId: item._id })}
      >
        <Text style={globalStyles.buttonText}>📝 Responder</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>📋 Cuestionarios disponibles</Text>

        {loading && <ActivityIndicator size="large" color="#000000" />}
        {error && <Text style={globalStyles.errorText}>{error}</Text>}

        <FlatList
          data={cuestionarios}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navigation.navigate("CreateQuestionnaire")}
        >
          <Text style={globalStyles.buttonText}>➕ Crear nuevo cuestionario</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const buttonSmall = {
  backgroundColor: "#000000",
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 6,
  alignItems: "center",
  marginTop: 8
};
