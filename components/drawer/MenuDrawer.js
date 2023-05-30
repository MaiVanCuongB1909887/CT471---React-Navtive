import React, {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Register from '../register';
import Login from '../login';
import HomeStack from '../navigation/StackNavigator';
import ContentDrawer from './ContentDrawer';
import Header from '../header';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const [isLoggedIn, setIsLoggedIn] = useState(false);

const handleLogout = async () => {
  await AsyncStorage.removeItem('isLoggedIn');
};


const Drawer = createDrawerNavigator();
const Stack = createDrawerNavigator();
// const isLoggedIn = AsyncStorage.getItem('isLoggedIn');
const MenuDrawer = () => {
  return (
      <Drawer.Navigator
      drawerContent={props => (
        <ContentDrawer {...props} screenOptions={{drawerPosition: 'left'}} />
      )}>
      <Drawer.Screen
        name="Page"
        component={HomeStack}
        options={{header: props => <Header {...props} title="Home" />}}
      />
    </Drawer.Navigator>
  )
}
export default MenuDrawer