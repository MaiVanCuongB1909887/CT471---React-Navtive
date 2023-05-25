import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Register from '../register';
import Login from '../login';
import Home from '../home';
import Header from '../header';
import Footer from '../footer';
import SearchScreen from '../../screens/SearchScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Search" component={SearchScreen} />
    </Drawer.Navigator>
  );
}
const UIHome = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{header: props => <Header {...props} title="Home" />}}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{header: props => <Header {...props} title="Home" />}}
      />
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </Stack.Navigator>
  );
};

export default UIHome;
