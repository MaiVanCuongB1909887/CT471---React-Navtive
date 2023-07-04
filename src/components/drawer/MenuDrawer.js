import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStack from '../navigation/StackNavigator';
import Product from '../product/Product';
import ContentMenuDrawer from './ContentMenuDrawer';
import ContentCartDrawer from './ContentCartDrawer';
import Header from '../header';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

const LeftDrawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();

const CartDrawer = () => {
  const userToken = useSelector(state => state.auth.userToken);

  return (
    <RightDrawer.Navigator
      id="RightDrawer"
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        swipeEnabled: false,
      }}
      drawerContent={props =>
        userToken && (
          <>
            <ContentCartDrawer {...props} />
          </>
        )
      }>
      <RightDrawer.Screen name="Cart" component={MenuDrawer} />
    </RightDrawer.Navigator>
  );
};

const MenuDrawer = () => {
  return (
    <LeftDrawer.Navigator
      id="LeftDrawer"
      screenOptions={{drawerPosition: 'left', swipeEnabled: false}}
      drawerContent={props => <ContentMenuDrawer {...props} />}>
      <LeftDrawer.Screen
        name="Trang chủ"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <LeftDrawer.Screen
        name="Sản phẩm"
        component={Product}
        options={{header: props => <Header {...props} title="Product" />}}
      />
    </LeftDrawer.Navigator>
  );
};
export default CartDrawer;
