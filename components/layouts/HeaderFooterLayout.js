import React from 'react';

import { View, ScrollView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

import Footer from '../footer';
import UIHome from '../navigation/UIHome';
import styles from './styles'
import RightDrawerScreen from '../header/drawerMenu';


const HeaderFooterLayout = () => {
  return (
    <NavigationContainer>

      <UIHome />

    </NavigationContainer>

  );
};

export default HeaderFooterLayout