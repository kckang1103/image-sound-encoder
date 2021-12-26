import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Headline, Text, TextInput } from 'react-native-paper';
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  updateProfile
} from "firebase/auth";

const googleAuthProvider = new GoogleAuthProvider();
//googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log("user", user);
      if (user) {
        navigation.replace("Navigation")
      }
    })

    return unsubscribe
  }, [])

  const handleLogin = () => {
    navigation.replace("Login");
  }

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        updateProfile(user, { displayName: username }).then(() => {
          console.log('updating username', username);
        })
        console.log("Registered in with", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleGoogle = () => {
    console.log(auth)
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
      //signInWithRedirect(auth, googleAuthProvider);

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
          label="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <Button onPress={handleRegister} mode="contained" style={styles.button}>
          Register
        </Button>
        <Button onPress={handleLogin}>
          Have an account?
        </Button>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>
        <Button onPress={handleGoogle} icon="google" mode="outlined" style={styles.buttonAlt}>
          Continue with Google
        </Button>
        <Button icon="apple" mode="outlined" style={styles.buttonAlt}>
          Continue with Apple
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

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
  button: {
    marginVertical: 20,
    width: "100%",
    padding: 7,
    alignItems: "center",
  },
  buttonAlt: {
    marginTop: 10,
    width: "100%",
    padding: 7,
    alignItems: "center"
  },
  divider: {
    backgroundColor: '#d3d3d3',
    height: 1,
    flex: 1,
    alignSelf: 'center'
  },
  dividerContainer: {
    marginVertical: 20,
    flexDirection: 'row'
  },
  dividerText: {
    alignSelf: 'center',
    paddingHorizontal: 15
  }
});
