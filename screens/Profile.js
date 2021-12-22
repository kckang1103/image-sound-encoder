import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Headline } from 'react-native-paper';

import { auth } from '../firebase'

const Profile = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login")
    }).catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
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
  headline: {
    color: 'black'
  }
})
