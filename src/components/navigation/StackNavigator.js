import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../home';
import UserLogin from '../login/UserLogin';
import AdminLogin from '../login/AdminLogin';
import Register from '../register';
import Product from '../product/Product';
import ProductDetails from '../product/ProductDetails';
import Admin from '../admin/Admin';
import Search from '../search/search';
import Checkout from '../cart/Checkout';
import User from '../user/User';
import {setUser} from '../store/auth/AuthSlice';
import {setDetailUser} from '../store/user/UserSlice';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const HomeStack = () => {
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.auth.userToken);

  async function isSignedIn() {
    await AsyncStorage.getItem('userToken').then(token => {
      if (!!token) {
        dispatch(setUser(token));
      }
    });
    await AsyncStorage.getItem('userDetail').then(detail => {
      if (!!detail) {
        dispatch(setDetailUser(JSON.parse(detail)));
      }
    });
  }

  useEffect(() => {
    isSignedIn();
  }, [userToken]);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      {userToken ? (
        <>
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="User"
            component={User}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="UserLogin"
            component={UserLogin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
        </>
      )}

      <Stack.Screen
        name="AdminLogin"
        component={AdminLogin}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Admin"
        component={Admin}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
