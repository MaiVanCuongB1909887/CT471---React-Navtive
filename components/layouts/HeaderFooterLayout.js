import React from 'react';

import { View, ScrollView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

import HomeStack from '../navigation/StackNavigator';
import MenuDrawer from '../drawer/MenuDrawer';


const HeaderFooterLayout = () => {
  return (

    <NavigationContainer>
      
      <MenuDrawer />

    </NavigationContainer>

)};

export default HeaderFooterLayout