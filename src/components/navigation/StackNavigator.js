import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {checkAuthStatus} from '../store/auth/AuthSlice';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'react-native-elements';

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
import AddBlog from '../admin/AddBlog';
import EditBlog from '../admin/EditBlog';
import Header from '../header';
import {logoutA} from '../store/auth/AuthSlice';
import {logoutU} from '../store/user/UserSlice';

const Stack = createStackNavigator();

const HomeStack = ({navigation}) => {
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.auth.userToken);
  const adminToken = useSelector(state => state.auth.adminToken);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const logoutHandle = async () => {
    await dispatch(logoutA());
    await dispatch(logoutU());
    if (isLoggedIn) {
      navigation.navigate('UserLogin');
    }
  };
  async function isSignedIn() {
    await dispatch(checkAuthStatus({dispatch}));
  }

  useEffect(() => {
    isSignedIn();
  }, [userToken]);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{header: props => <Header {...props} title="Home" />}}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{header: props => <Header {...props} title="San pham" />}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          header: props => <Header {...props} title="Chi tiet san pham" />,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{header: props => <Header {...props} title="Search" />}}
      />
      {userToken && !adminToken ? (
        <>
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{
              header: props => <Header {...props} title="Thanh toan" />,
            }}
          />
          <Stack.Screen
            name="User"
            component={User}
            options={{header: props => <Header {...props} title="User" />}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="UserLogin"
            component={UserLogin}
            options={{header: props => <Header {...props} title="Dang nhap" />}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{header: props => <Header {...props} title="Dang ki" />}}
          />
          <Stack.Screen
            name="AdminLogin"
            component={AdminLogin}
            options={{header: props => <Header {...props} title="Admin" />}}
          />
        </>
      )}

      {adminToken && (
        <>
          <Stack.Screen
            name="Admin"
            component={Admin}
            options={{
              headerTitle: 'Admin',
              headerLeft: () => (
                <Icon
                  name="logout"
                  size={20}
                  color={'#2052f7'}
                  onPress={logoutHandle}
                />
              ),
              headerLeftContainerStyle: {
                margin: 10,
                paddingRight: 30,
                paddingLeft: 20,
              },
              headerBackTitle: 'dang xuat',
              headerBackTitleVisible: true,
              headerTruncatedBackTitle: 'Return',
            }}
          />
          <Stack.Screen name="EditBlog" component={EditBlog} />
          <Stack.Screen name="AddBlog" component={AddBlog} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default HomeStack;
