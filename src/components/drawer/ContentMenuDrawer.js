import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {ListItem} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import {logoutA} from '../store/auth/AuthSlice';
import {logoutU} from '../store/user/UserSlice';
import cateAPI from '../services/cateAPI';

export default function ContentMenuDrawer(props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const [stop, setStop] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [categories, setCategories] = useState([]);

  const logoutHandle = async () => {
    await dispatch(logoutA());
    await dispatch(logoutU());
    if (isLoggedIn) {
      props.navigation.navigate('UserLogin');
    }
  };
  const handleCategory = async id => {
    const response = await dispatch(searchByCategory(id));
    if (!!response) {
      props.navigation.navigate('Search');
    }
  };

  const getAllCate = async () => {
    try {
      console.log('1 lan');
      const response = await cateAPI.getAllCate();
      console.log(response);
      if (!!response) {
        setCategories(response.category);
        console.log('Da vao day');
        return setStop(true);
      }
    } catch (error) {
      throw console.log(error, ' loi category');
    }
  };
  useEffect(() => {
    // const interval = setInterval(async () => {
    //   console.log('o tren');
    //   getAllCate();
    //   if (stop) {
    //     console.log('o duoi');
    //     clearInterval(interval);
    //   }
    // }, 2500);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

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
                <ListItem.Subtitle onPress={() => handleCategory(category.id)}>
                  {category?.name}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </ListItem.Accordion>
      </View>

      {isLoggedIn && (
        <DrawerItem label="Logout" onPress={logoutHandle}></DrawerItem>
      )}
    </DrawerContentScrollView>
  );
}
