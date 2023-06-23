import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {View, ScrollView} from 'react-native';
import HeaderFooterLayout from './src/components/layouts/HeaderFooterLayout';
import {Provider} from 'react-redux';
import store from './src/components/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <HeaderFooterLayout />
    </Provider>
  );
}
