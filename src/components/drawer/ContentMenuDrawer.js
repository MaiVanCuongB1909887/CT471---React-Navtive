import React, {useState, useEffect} from 'react';
<<<<<<< HEAD:components/drawer/ContentMenuDrawer.js
import {View, Text, Button} from 'react-native';
=======
import {View, Text, Button, FlatList} from 'react-native';
>>>>>>> a42a981 (updated):src/components/drawer/ContentMenuDrawer.js
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {ListItem} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
<<<<<<< HEAD:components/drawer/ContentMenuDrawer.js
import style from '../footer/style';
import {useSelector} from 'react-redux';
import {dispatch} from 'redux';
import {logoutThunk} from '../../store/auth/UserThunk';

export default function ContentMenuDrawer(props) {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const [expanded, setExpanded] = useState(false);
=======
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
>>>>>>> a42a981 (updated):src/components/drawer/ContentMenuDrawer.js

  const handle = () => {
    props.navigation.navigate('Login');
  };
<<<<<<< HEAD:components/drawer/ContentMenuDrawer.js

  const logout = async () => {
    dispatch(logoutThunk());
=======
  const logout = async () => {
    await AsyncStorage.removeItem('sessionToken');
    await AsyncStorage.removeItem('user');
>>>>>>> a42a981 (updated):src/components/drawer/ContentMenuDrawer.js
    props.navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
<<<<<<< HEAD:components/drawer/ContentMenuDrawer.js

=======
>>>>>>> a42a981 (updated):src/components/drawer/ContentMenuDrawer.js
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
<<<<<<< HEAD:components/drawer/ContentMenuDrawer.js
          <ListItem
            topDivider
            bottomDivider
            style={{color: 'rgb(28, 28, 30)', fontSize: 14, marginLeft: 2}}>
            <ListItem.Content>
              <ListItem.Subtitle onPress={() => handle()}>
                Nấm Trường Sinh
              </ListItem.Subtitle>
              <ListItem.Subtitle onPress={() => handle()}>
                Nấm Đông Cô
              </ListItem.Subtitle>
              <ListItem.Subtitle onPress={() => handle()}>
                Nấm Rơm
              </ListItem.Subtitle>
              <ListItem.Subtitle onPress={() => handle()}>
                Nấm mốc
              </ListItem.Subtitle>
              <ListItem.Subtitle onPress={() => handle()}>
                Nấm mộ
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      </View>

      <DrawerItem label="Tiếng Hàn sẻng" />
      {isLoggedIn && <DrawerItem label="Logout" onPress={logout}></DrawerItem>}
=======
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
>>>>>>> a42a981 (updated):src/components/drawer/ContentMenuDrawer.js
    </DrawerContentScrollView>
  );
}
