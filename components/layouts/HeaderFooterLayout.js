import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Register from'../register';
import Login from'../login';
import Home from'../home';
import Footer from '../footer/Footer';

const Stack = createStackNavigator();

const HeaderFooterLayout = () => {
  return (
    <NavigationContainer>
      {/* <Header /> */}
      
      {/* screenOptions={{headerShown:false,}} */}
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>

      <Footer />
    </NavigationContainer>
  );
};

export default HeaderFooterLayout