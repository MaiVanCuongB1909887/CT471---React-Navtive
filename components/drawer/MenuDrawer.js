import * as React from 'react';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Login from '../login';
import HomeStack from '../navigation/StackNavigator';
import ContentDrawer from './ContentDrawer';
import Header from '../header';
import Product from '../product/Product';
const Drawer = createDrawerNavigator();
const Stack = createDrawerNavigator();



export default function MenuDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Page"
      drawerContent={(props) => <ContentDrawer {...props} 
      screenOptions={{ drawerPosition: 'left' }}
      />}>
      <Stack.Screen name="Login" component={Login}
      options={{header: props => <Header {...props} title="Home" />}}
        />
      <Drawer.Screen name="Page" component={HomeStack} 
      options={{header: props => <Header {...props} title="Home" />}}
      />
      <Drawer.Screen name="san pham" component={Product} 
      options={{header: props => <Header {...props} title="Home" />}}
      />
    </Drawer.Navigator>
  );
}