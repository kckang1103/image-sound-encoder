import React from 'react';
import { View } from 'react-native'

// Navigation components

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//import IonicIcon from 'react-native-vector-icons/Ionicons'

import { Text, Dimensions } from 'react-native';

//Import screens

import HomeScreen from '../screens/Home';
import UploadScreen from '../screens/Upload';
import ProfileScreen from '../screens/Profile';

const fullScreenWidth = Dimensions.get('window').width;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation(props) {
  return (
    <View style={{flex: 1}}>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Upload" component={UploadScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    </View>
  )
}
