import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HeaderFooterLayout from './components/layouts/HeaderFooterLayout';
import {Provider} from 'react-redux';
import store from './store/store';

export default function App() {
  return (
    <Provider store={store}>
      <HeaderFooterLayout />
    </Provider>
  );
}
