import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import globalStyles from '../../globalStyles'; // ajusta la ruta si es necesario

export const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const onChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const navigate = useNavigation();

  const onPressLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/login`, data);

      if (response.status === 200) {
        const userData = response.data.user;

        if (userData?._id) {
          await AsyncStorage.setItem('userId', userData._id.toString()); // ✅ Guarda el _id
          await AsyncStorage.setItem('userData', JSON.stringify(userData)); // Guarda todos los datos
          console.log("Datos del usuario:", userData);
          console.log("ID guardado en AsyncStorage:", userData._id);
        } else {
          console.warn("No se encontró el _id en la respuesta del servidor.");
        }

        Alert.alert("Éxito", "Inicio de sesión correcto.");
        navigate.navigate("Main");
      } else {
        Alert.alert("Error", "Credenciales incorrectas.");
      }
    } catch (error) {
      console.log("Error en login:", error);
      Alert.alert("Error", "No se pudo iniciar sesión.");
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>🔐 Iniciar Sesión</Text>

      <Text style={globalStyles.sectionTitle}>Username:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#999999",
          padding: 10,
          borderRadius: 6,
          backgroundColor: "#ffffff",
          marginBottom: 15,
        }}
        placeholder="Introduce tu username"
        value={data.username}
        onChangeText={(value) => onChange("username", value)}
      />

      <Text style={globalStyles.sectionTitle}>Contraseña:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#999999",
          padding: 10,
          borderRadius: 6,
          backgroundColor: "#ffffff",
          marginBottom: 25,
        }}
        placeholder="Introduce tu contraseña"
        secureTextEntry={true}
        value={data.password}
        onChangeText={(value) => onChange("password", value)}
      />

      <TouchableOpacity style={globalStyles.button} onPress={onPressLogin}>
        <Text style={globalStyles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[globalStyles.button, globalStyles.logoutButton]} onPress={() => navigate.navigate("Register")}>
        <Text style={globalStyles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};
