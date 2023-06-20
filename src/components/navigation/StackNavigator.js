import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../home';
import Login from '../login';
import Register from '../register';
import Product from '../product/Product';
import ProductDetails from '../product/ProductDetails';
<<<<<<< HEAD:components/navigation/StackNavigator.js
import Admin from '../admin/Admin';
=======
import Search from '../search/search';
import Checkout from '../cart/Checkout';
>>>>>>> a42a981 (updated):src/components/navigation/StackNavigator.js

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
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
<<<<<<< HEAD:components/navigation/StackNavigator.js
        name="Admin"
        component={Admin}
=======
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Login"
        component={Login}
>>>>>>> a42a981 (updated):src/components/navigation/StackNavigator.js
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
