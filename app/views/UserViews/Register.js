import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import globalStyles from '../../globalStyles';

const uri = `http://localhost:3000/api/register`;

export const UserRegister = () => {
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const navigation = useNavigation();

  const onChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const onPressRegister = async () => {
    try {
      const response = await axios.post(uri, data);

      if (response.status === 201) {
        Alert.alert("Éxito", "Usuario registrado.");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", "Sucedió un error al registrar.");
        console.log("Ha ocurrido un error al registrar.");
      }
    } catch (error) {
      console.log("Error en registro:", error);
      Alert.alert("Error", "No se pudo completar el registro.");
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>📝 Registro de Usuario</Text>

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
        placeholder="Introduce tu nombre"
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

      <TouchableOpacity style={[globalStyles.button, globalStyles.logoutButton]} onPress={onPressRegister}>
        <Text style={globalStyles.buttonText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
};
