import React, {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Register from '../register';
import Login from '../login';
import HomeStack from '../navigation/StackNavigator';
import Product from '../product/Product';
import ContentDrawer from './ContentDrawer';
import Header from '../header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../home';
import Search from '../search';

const LeftDrawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();
const Stack = createDrawerNavigator();

const CartDrawer = () => {
  return(
  <RightDrawer.Navigator screenOptions={{drawerPosition: 'right', headerShown: false}}>
    <RightDrawer.Screen
      name="Giỏ hàng"
      component={MenuDrawer}
    />
  </RightDrawer.Navigator>
  );
};

const MenuDrawer = () => {
  return (
    <LeftDrawer.Navigator
      drawerContent={props => (
        <ContentDrawer {...props} screenOptions={{drawerPosition: 'left'}} />
      )}>
      <LeftDrawer.Screen
        name="Trang chủ"
        component={HomeStack}
        options={{header: props => <Header {...props} title="Home" />}}
      />
      <LeftDrawer.Screen
        name="Sản phẩm"
        component={Product}
        options={{header: props => <Header {...props} title="Home" />}}
      />

      <LeftDrawer.Screen
        name="Search"
        component={Search}
        options={{header: props => <Header {...props} title="Home" />}}
      />
    </LeftDrawer.Navigator>
  );
};
export default CartDrawer;
