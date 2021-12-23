import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Headline, TextInput } from 'react-native-paper';
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Navigation")
      }
    })

    return unsubscribe
  }, [])

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered in with", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Headline style={styles.headline}>OX</Headline>
      <View style={styles.inputContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={handleLogin} style={styles.button}>
          Login
        </Button>
        <Button onPress={handleRegister} style={styles.button}>
          Register
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  headline: {
    color: 'black'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    marginTop: 60,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  button: {
    //backgroundColor: "#0782F9",
    width: "100%",
    padding: 7,
    alignItems: "center",
  },
});
