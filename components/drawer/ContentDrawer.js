import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ContentDrawer(props) {
  const logout = async () => {
    await AsyncStorage.removeItem('sessionToken');
    await AsyncStorage.removeItem("user");
    props.navigation.navigate('Login');
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Tiếng Tung của"
      />
      <DrawerItem
        label="Tiếng Tung của 2"
      />
      <DrawerItem 
        label="Logout"
        onPress={logout}
        />
    </DrawerContentScrollView>
  );
}