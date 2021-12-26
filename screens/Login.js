import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Divider, Headline, TextInput } from 'react-native-paper';
import { auth } from "../firebase";
import {
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
    navigation.replace("Register")
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleForgotPassword = () => {
    navigation.replace("ForgotPassword");
  }

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
        <Button onPress={handleLogin} mode="contained" style={styles.button}>
          Login
        </Button>
        <Button onPress={handleForgotPassword}>
          Forgot password?
        </Button>
        <Divider style={styles.divider} />
        <Button onPress={handleRegister} mode="outlined" style={styles.button}>
          Create new account
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
    marginTop: 40,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    //backgroundColor: "#0782F9",
    marginVertical: 20,
    width: "100%",
    padding: 7,
    alignItems: "center",
  },
  divider: {
    marginVertical: 20,
    borderColor: "black",
    height: 1,
  },
  forgotPasswordButton: {
    //marginTop: 15,
  }
});
