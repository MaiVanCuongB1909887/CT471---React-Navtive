import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';

import { View, ScrollView } from 'react-native'
import HeaderFooterLayout from './components/layouts/HeaderFooterLayout';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import Header from './components/header';
import Footer from './components/footer';


export default function App() {

  return (
      <HeaderFooterLayout />
  )
}
