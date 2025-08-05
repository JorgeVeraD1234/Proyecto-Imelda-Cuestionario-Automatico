import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Alert, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import globalStyles from '../../globalStyles';

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
          await AsyncStorage.setItem('userId', userData._id.toString());
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
          console.log("Datos del usuario:", userData);
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
    <ScrollView style={{ flex: 1 }}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>🔐 Iniciar Sesión</Text>

        <Text style={globalStyles.sectionTitle}>Username:</Text>
        <TextInput
          style={inputStyles}
          placeholder="Introduce tu username"
          placeholderTextColor="#000000"
          value={data.username}
          onChangeText={(value) => onChange("username", value)}
        />

        <Text style={globalStyles.sectionTitle}>Contraseña:</Text>
        <TextInput
          style={inputStyles}
          placeholder="Introduce tu contraseña"
          placeholderTextColor="#000000"
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
    </ScrollView>
  );
};

const inputStyles = {
  borderWidth: 1,
  borderColor: "#000000",
  padding: 10,
  borderRadius: 6,
  backgroundColor: "#ffffff",
  marginBottom: 20,
  color: "#000000"
};
