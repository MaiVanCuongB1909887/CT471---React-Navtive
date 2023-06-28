import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import CartDrawer from '../drawer/MenuDrawer';

const HeaderFooterLayout = () => {
  return (
    <NavigationContainer>
      <CartDrawer />
    </NavigationContainer>
  );
};

export default HeaderFooterLayout;
