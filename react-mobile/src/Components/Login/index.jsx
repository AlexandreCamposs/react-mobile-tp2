import React, { useState, useEffect } from "react";
import { Container, Title, Button, Text, Textm } from "./styles.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../Services/Api.js";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

import Input from "../Input";

const Login = ({ title, description }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [alert, setAlert] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem("@token");
      setToken(token);
    }
    getToken();
  }, []);

  function handleSubmit() {
    setAlert(true);
    Api.post("/login", {
      email,
      password,
    })
      .then(async (response) => {
        const token = response.data.data.token;
        let user = {
          userId: response.data.data.user_id,
          userName: response.data.data.username,
          token: token,
        };
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        await AsyncStorage.setItem("@token", token);
        setAlert(false);
        navigation.navigate("home");
      })
      .catch((error) => {
        console.log(error);
        setAlert(false);
        return Alert.alert("Erro", error.response.data.message);
      });
  }

  return (
    <Container>
      {alert && Alert.alert("Aguarde", "Carregando...")}
      <Title>Login</Title>
      <Input label="Email" value={email} onChangeText={(e) => setEmail(e)} />
      <Input
        label="Password"
        value={password}
        onChangeText={(e) => setPassword(e)}
        type="password"
      />
      <Button onPress={handleSubmit}>
        <Text>Logar</Text>
      </Button>
      <Textm>Nao tem conta?</Textm>
    </Container>
  );
};

export default Login;
