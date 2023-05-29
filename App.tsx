import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';

import { View, ScrollView } from 'react-native'
import HeaderFooterLayout from './components/layouts/HeaderFooterLayout';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import Footer from './components/footer';
import MenuDrawer from './components/drawer/MenuDrawer';
import HomeStack from './components/navigation/StackNavigator';
import SubStack from './components/navigation/StackNavigator';


export default function App() {
  return (
      <HeaderFooterLayout />
  )
};
