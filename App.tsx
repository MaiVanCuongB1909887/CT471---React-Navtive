
import React from 'react';
import Register from'./components/register';
import Login from'./components/login';
import Home from'./components/home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack= createNativeStackNavigator();

export default function App() {


  return (

    <NavigationContainer>
      {/* screenOptions={{headerShown:false,}}  xóa header*/}
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
