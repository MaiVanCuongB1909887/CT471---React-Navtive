import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {ListItem} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import {logoutA} from '../store/auth/AuthSlice';
import {logoutU} from '../store/user/UserSlice';
import {getCategory, searchByCategory} from '../store/search/SearchSlice';
import {getCategoryName} from '../store/search/SearchSlice';

export default function ContentMenuDrawer(props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const categories = useSelector(state => state.search.category);
  const loading = useSelector(state => state.product.isLoading);
  const [expanded, setExpanded] = useState(false);

  const logoutHandle = async () => {
    await dispatch(logoutA());
    await dispatch(logoutU());
    if (isLoggedIn) {
      props.navigation.navigate('UserLogin');
    }
  };
  const handleCategory = async data => {
    try {
      await dispatch(getCategoryName(data.name));
      const response = await dispatch(searchByCategory(data.id));
      if (!!response) {
        props.navigation.closeDrawer();
        props.navigation.navigate('Search');
      }
    } catch (error) {
      throw console.log(error);
    }
  };
  const getCateWithRetry = () => {
    dispatch(getCategory());
  };

  useEffect(() => {
    const timer = setTimeout(getCateWithRetry, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, expanded]);

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
