import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Headline } from 'react-native-paper';

const Home = () => {
  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>Home it is</Headline>
    </View>
  )
}

export default Home

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
