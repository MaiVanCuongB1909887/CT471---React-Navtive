import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../home';
import UserLogin from '../login/UserLogin';
import AdminLogin from '../login/AdminLogin';
import Register from '../register';
import Product from '../product/Product';
import ProductDetails from '../product/ProductDetails';
import Admin from '../admin/Admin';
import Search from '../search/search';
import Checkout from '../cart/Checkout';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserLogin"
        component={UserLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdminLogin"
        component={AdminLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Admin"
        component={Admin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
