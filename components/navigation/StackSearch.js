import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../home';
import Login from '../login';
import Register from '../register';
import Product from '../product/Product';
import ProductDetails from '../product/ProductDetails';
import Search from '../header/search'
const Stack = createStackNavigator();
const StackSearch = () =>{
    return(
    <Stack.Screen
      name="Search"
      component={Search}
      options={{headerShown: false}}
      />
)}

export default StackSearch;