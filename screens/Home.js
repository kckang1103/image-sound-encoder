import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { BottomNavigation, Text } from 'react-native-paper';

import Profile from "./Profile";

const AlbumRoute = () => <Text>Album</Text>;

const UploadRoute = () => <Text>Upload</Text>;

const ProfileRoute = () => <Profile />;

const Home = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'album', title: 'Album', icon: 'image-multiple' },
    { key: 'upload', title: 'Upload', icon: 'upload' },
    { key: 'profile', title: 'Profile', icon: 'account-box' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    album: AlbumRoute,
    upload: UploadRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
