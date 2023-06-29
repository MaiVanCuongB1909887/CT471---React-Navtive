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

import {logoutA} from '../../store/auth/AuthSlice';
import {logoutU} from '../../store/user/UserSlice';
import cateAPI from '../services/cateAPI';
import {searchByCategory} from '../../store/search/SearchSlice';
import {getCategoryName} from '../../store/search/SearchSlice';

export default function ContentMenuDrawer(props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const [expanded, setExpanded] = useState(false);
  const [categories, setCategories] = useState([]);

  const logoutHandle = async () => {
    await dispatch(logoutA());
    await dispatch(logoutU());
    if (isLoggedIn) {
      props.navigation.navigate('UserLogin');
    }
  };
  const handleCategory = async data => {
    dispatch(getCategoryName(data.name));
    const response = await dispatch(searchByCategory(data.id));
    if (!!response) {
      props.navigation.navigate('Search');
    }
  };
  const getAllCate = async (delay = 3000, maxAttempts = 10) => {
    let attempts = 0;
    while (attempts < maxAttempts) {
      try {
        const response = await cateAPI.getAllCate();
        if (response) {
          setCategories(response.category);
        }
      } catch (error) {
        console.log(`Error calling API: ${error}`);
      }
      attempts++;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    throw new Error(`API call failed after ${maxAttempts} attempts`);
  };

  useEffect(() => {
    getAllCate();
  }, [expanded]);

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
                <ListItem.Subtitle onPress={() => handleCategory(category)}>
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
