import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SearchScreen from '../../screens/SearchScreen';

const LeftDrawer = createDrawerNavigator();

const LeftDrawerScreen = () => {
  return (
    <LeftDrawer.Navigator
      useLegacyImplementation
      screenOptions={{drawerPosition: 'left'}}>
      <LeftDrawer.Screen name="Home" component={HomeScreen} />
    </LeftDrawer.Navigator>
  );
};

const RightDrawer = createDrawerNavigator();

const RightDrawerScreen = () => {
  return (
    <RightDrawer.Navigator
      useLegacyImplementation
      screenOptions={{drawerPosition: 'right', headerShown: false}}>
      <RightDrawer.Screen name="HomeDrawer" component={LeftDrawerScreen} />
    </RightDrawer.Navigator>
  );
};
export default RightDrawerScreen;
