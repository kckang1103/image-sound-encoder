import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Avatar, Button, Chip, Headline } from 'react-native-paper';

import { auth } from '../firebase'

const Profile = () => {
  const [pressed, setPressed] = useState(false);
  const onPress = () => {
    console.log(pressed);
    if (pressed) {
      setPressed(false);
    } else {
      setPressed(true);
    }
  };

  const editPicture = () => {
    console.log("trying to edit picture")
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
        <Avatar.Image size={200} source={require('../assets/inzik.jpeg')} />
        <TouchableOpacity style={styles.edit} onPress={editPicture}>
          <Avatar.Icon  size={30} icon="image-edit" />
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
