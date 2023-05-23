import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderFooterLayout from './components/layouts/HeaderFooterLayout';

const Stack= createNativeStackNavigator();

export default function App() {

  return (
      <HeaderFooterLayout />
  )
}
