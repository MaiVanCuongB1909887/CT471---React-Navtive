import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {ListItem} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../footer/style';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../store/auth/AuthSlice';
import cateAPI from '../../services/catetAPI';

export default function ContentMenuDrawer(props) {
  const dispatch = useDispatch();

  const [callback, setCallback] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [categories, setCategories] = useState([]);

  AsyncStorage.getItem('userToken').then(res => {
    return setCallback(res);
  });

  const checkToken = async () => {
    return !!(await AsyncStorage.getItem('userToken'))
      ? setIsLogin(false)
      : setIsLogin(true);
  };

  const logoutHandle = async () => {
    if (!isLogin) {
      props.navigation.navigate('UserLogin');
    }
    dispatch(logout());
  };

  const getAllCate = async () => {
    try {
      const response = await cateAPI.getAllCate();
      if (!!response) {
        setCategories(response.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCate();
    checkToken();
  }, [callback]);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <View style={{margin: 0, padding: 0}}>
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    color: 'rgb(28, 28, 30)',
                    fontSize: 14,
                    marginLeft: 2,
                  }}>
                  Danh mục
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          icon={<Icon name={'chevron-down'} color={'#000000'} />}
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}>
          {categories?.map(category => (
            <ListItem
              key={category.id}
              topDivider
              bottomDivider
              style={{color: 'rgb(28, 28, 30)', fontSize: 14, marginLeft: 2}}>
              <ListItem.Content>
                <ListItem.Subtitle onPress={() => handle()}>
                  {category.name}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </ListItem.Accordion>
      </View>

      <DrawerItem label="Tiếng Hàn sẻng" />
      {!isLogin && (
        <DrawerItem label="Logout" onPress={logoutHandle}></DrawerItem>
      )}
    </DrawerContentScrollView>
  );
}
