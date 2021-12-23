import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Headline } from 'react-native-paper';

const Upload = () => {
  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>Upload it is</Headline>
    </View>
  )
}

export default Upload

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
