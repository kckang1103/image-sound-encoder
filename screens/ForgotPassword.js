import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Headline, Subheading, TextInput } from 'react-native-paper';
import { auth } from "../firebase";
import {
  sendPasswordResetEmail
} from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleSendPasswordResetEmail = () => {
    console.log("clicked find password");
    sendPasswordResetEmail(auth, email).then(() => {
      console.log("Password reset email sent");
      navigation.replace("Login");
    }).catch((error) => alert(error.message));
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Headline style={styles.headline}>OX</Headline>
      <View style={styles.inputContainer}>
        <Subheading>Enter your email to reset your password</Subheading>
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSendPasswordResetEmail} style={styles.button}>
          Submit
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

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
  findPasswordButton: {
    marginTop: 200,
  }
});
