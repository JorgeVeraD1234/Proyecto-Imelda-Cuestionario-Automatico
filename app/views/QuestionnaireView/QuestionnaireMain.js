import React, { useState } from "react"
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native"
import axios from "axios"
import { useNavigation, useFocusEffect } from "@react-navigation/native"

export const QuestionnaireMain = () => {
  const [cuestionarios, setCuestionarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigation = useNavigation()

  const fetchCuestionarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/cuestionarios")
      setCuestionarios(response.data)
      setError(null)
    } catch (err) {
      setError("Error al cargar los cuestionarios")
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true)
      fetchCuestionarios()
    }, [])
  )
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.description}>{item.descripcion}</Text>

      <TouchableOpacity
        style={styles.buttonSmall}
        onPress={() => navigation.navigate("QuestionnaireDetail", { cuestionarioId: item._id })}
      >
        <Text style={styles.buttonText}>📄 Ver detalles</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSmall}
        onPress={() => navigation.navigate("ResponderCuestionario", { cuestionarioId: item._id })}
      >
        <Text style={styles.buttonText}>📝 Responder</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📋 Cuestionarios disponibles</Text>

      {loading && <ActivityIndicator size="large" color="#007AFF" />}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={cuestionarios}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateQuestionnaire")}
      >
        <Text style={styles.buttonText}>➕ Crear nuevo cuestionario</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "600"
  },
  description: {
    fontSize: 14,
    color: "#333"
  },
  error: {
    color: "red",
    marginVertical: 10
  },
  list: {
    paddingBottom: 20
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10
  },
  buttonText: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 16
  }
})
