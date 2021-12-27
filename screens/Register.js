import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import { Button, Headline, Text, TextInput } from 'react-native-paper';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import * as Google from 'expo-google-app-auth';

import { auth } from "../firebase";
import { onSignInGoogle } from "../util";


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
        // updateProfile(user, { displayName: username }).then(() => {
        //   console.log('updating username', username);
        // })
        console.log("Registered in with", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleGoogle = () => {
    console.log("trying to register through google")
    if (Platform.OS === 'web') {
      console.log('web it is')
      const googleAuthProvider = new GoogleAuthProvider();
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
    } else if (Platform.OS === 'ios' || Platform.OS === 'android') {
      console.log('mobile it is')
      try {
        config = {
          androidClientId: '374659811344-bjt71phh2eaphq3nturp6k0v2m7cn6nn.apps.googleusercontent.com',
          iosClientId: '374659811344-ihnaibql9f6uujr6sup5uu6iu779qrff.apps.googleusercontent.com',
          scopes: ['profile', 'email']
        }

        Google.logInAsync(config).then((result) => {
          console.log(result)
          onSignInGoogle(result);
        }).catch(error => {
          console.log(error.message);
        })
      } catch (e) {
        return { error: true };
      }
    }
  }

  const handleFacebook = () => {
    /* TODO: change facebook APP ID and APP Secret on Firebase Sign-in method later from Test to Live */

    if (Platform.OS === 'web') {
      console.log('web it is');

      const facebookAuthProvider = new FacebookAuthProvider();
      facebookAuthProvider.addScope('email');
  
      signInWithPopup(auth, facebookAuthProvider)
        .then((result) => {
          // The signed-in user info.
          const user = result.user;

          if (result._tokenResponse.email) {
            user.email = result._tokenResponse.email
          }
  
          console.log(user.email);
  
          //update email as Facebook doesn't automatically add email field to auth.currentUser 
          updateProfile(auth.currentUser, { email: user.email }).then(() => {
            console.log('updating email ', user.email);
          })
  
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential.accessToken;
  
          fetchSignInMethodsForEmail(auth, "kckang1103@gmail.com").then((methods) => {
            console.log("trying to get methods", methods);
          })
  
          // ...
        })
        .catch((error) => {
          alert(error.message)
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = FacebookAuthProvider.credentialFromError(error);
        });
    } else if (Platform.OS === 'ios' || Platform.OS === 'android') {
      console.log('mobile it is');
    }
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
        <Button onPress={handleFacebook} icon="facebook" mode="outlined" style={styles.buttonAlt}>
          Continue with Facebook
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
    padding: 4,
    alignItems: "center",
  },
  buttonAlt: {
    marginTop: 10,
    width: "100%",
    padding: 4,
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
