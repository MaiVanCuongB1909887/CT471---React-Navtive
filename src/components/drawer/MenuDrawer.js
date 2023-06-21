import React, {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Register from '../register';
import Login from '../login';
import HomeStack from '../navigation/StackNavigator';
import Product from '../product/Product';
import ContentMenuDrawer from './ContentMenuDrawer';
import ContentCartDrawer from './ContentCartDrawer';
import Header from '../header';

const LeftDrawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();

const CartDrawer = () => {
  return (
    <RightDrawer.Navigator
      screenOptions={{drawerPosition: 'right', headerShown: false}}
      drawerContent={props => <ContentCartDrawer {...props} />}>
      <RightDrawer.Screen name="Giỏ hàng" component={MenuDrawer} />
    </RightDrawer.Navigator>
  );
};

const MenuDrawer = () => {
  return (
    <LeftDrawer.Navigator
      screenOptions={{drawerPosition: 'left'}}
      drawerContent={props => <ContentMenuDrawer {...props} />}>
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
    </LeftDrawer.Navigator>
  );
};
export default CartDrawer;
