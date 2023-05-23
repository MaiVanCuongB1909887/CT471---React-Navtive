import React from 'react';

import { View, ScrollView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

import Footer from '../footer';
import UIHome from '../navigation/UIHome';

import styles from './styles'


const HeaderFooterLayout = () => {
  return (
    // <View style={styles.container}>
    <NavigationContainer>

      <UIHome />

      <Footer />
      </NavigationContainer>

    /* </View> */
  );
};

export default HeaderFooterLayout