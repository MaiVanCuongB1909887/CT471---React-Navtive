import React from 'react';

import {View, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Footer from '../footer';

import styles from './styles';
import HomeStack from '../navigation/StackNavigator';
import CartDrawer from '../drawer/MenuDrawer';
import MenuDrawer from '../drawer/MenuDrawer';

const HeaderFooterLayout = () => {
  return (
    <NavigationContainer>
      <CartDrawer />
    </NavigationContainer>
  );
};

export default HeaderFooterLayout;
