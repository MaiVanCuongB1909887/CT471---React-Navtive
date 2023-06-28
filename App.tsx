import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HeaderFooterLayout from './src/components/layouts/HeaderFooterLayout';
import {Provider, useDispatch} from 'react-redux';
import store from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <HeaderFooterLayout />
    </Provider>
  );
}
