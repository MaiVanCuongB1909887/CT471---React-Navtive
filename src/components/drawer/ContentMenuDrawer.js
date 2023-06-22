import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {ListItem} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userAPI from '../../services/userAPI';

export default function ContentDrawer(props) {
  const [token, setToken] = useState(false);
  const [isLogout, setIsLogout] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [categories, setCategories] = useState([]);

  AsyncStorage.getItem('sessionToken').then(res => {
    return setIsLogout(res);
  });

  async function checkLogout() {
    setToken((await AsyncStorage.getItem('sessionToken')) ? true : false);
  }

  const getAllCate = async () => {
    try {
      const response = await userAPI.getAllCate();
      if (!!response) {
        setCategories(response.category);
        // AsyncStorage.setItem('catagory', JSON.parse(categories));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkLogout();
    getAllCate();
  }, [isLogout]);

  const handle = () => {
    props.navigation.navigate('Login');
  };
  const logout = async () => {
    await AsyncStorage.removeItem('sessionToken');
    await AsyncStorage.removeItem('user');
    props.navigation.navigate('Login');
  };

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

      <DrawerItem label="Tiếng Tung của" />
      <DrawerItem label="Tiếng Hàn sẻng" />
      {token && <DrawerItem label="Logout" onPress={logout}></DrawerItem>}
    </DrawerContentScrollView>
  );
}
