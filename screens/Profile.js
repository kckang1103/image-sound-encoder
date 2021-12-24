import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Avatar, Button, Headline } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { auth } from '../firebase'

const storage = getStorage();

const Profile = () => {
  const [pressed, setPressed] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  //const defaultProfilePicture = require('../assets/inzik.jpeg');
  const defaultProfilePicture = "../assets/inzik.jpeg";
  const [currentProfilePicture, setCurrentProfilePicture] = useState(defaultProfilePicture);

  useEffect(() => {
    const pictureRef = ref(storage, auth.currentUser.uid);
    getDownloadURL(pictureRef)
      .then((url) => {
        console.log("trying to get url from firebase storage", url);
        console.log("trying to console log current profile picture", currentProfilePicture);
        setCurrentProfilePicture(url);
      })
      .catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }, [profilePicture])

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const editPicture = async () => {
    console.log("trying to edit picture")
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    try {
      const response = await fetch(result.uri);
      const blob = await response.blob();

      setCurrentProfilePicture(result.uri);
      console.log("hello hello");

      const storageRef = ref(storage, auth.currentUser.uid);

      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Upload profile image');
      }).then(() => {
        if (!result.cancelled) {
          setProfilePicture(result.uri);
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const navigation = useNavigation();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login")
    }).catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image size={200} source={{ uri: currentProfilePicture }} />
        <TouchableOpacity style={styles.edit} onPress={editPicture}>
          <Avatar.Icon size={30} icon="image-edit" />
        </TouchableOpacity>
      </View>
      <Headline style={styles.headline}>Email: {auth.currentUser?.email}</Headline>
      <Button onPress={handleSignOut}>
        Sign Out
      </Button>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    justifyContent: 'center',
    marginBottom: 50,
  },
  headline: {
    color: 'black'
  },
  edit: {
    margin: 5,
    position: "absolute",
    top: 155,
    left: 155,
  }
})
