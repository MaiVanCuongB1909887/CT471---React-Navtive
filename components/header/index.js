import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Header = ({navigation}) => {
  const [callback, setCallback] = useState({});
  const [searchText, setSearchText] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  AsyncStorage.getItem('userToken').then(res => {
    return setCallback(res);
  });

  const checkToken = async () => {
    return !!(await AsyncStorage.getItem('userToken'))
      ? setIsLogin(false)
      : setIsLogin(true);
  };

  async function getUsername() {
    if (!isLogin) {
      return (username = JSON.parse(
        await AsyncStorage.getItem('userDetail'),
      ).firstname);
    } else return (username = null);
  }

  useEffect(() => {
    checkToken();
    getUsername();
  }, [callback]);

  const thongbao = () => {
    Alert.alert(
      'Yeu cau dang nhap',
      'Ban chua dang nhap, dang nhap de truy cap gio hang',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => navigation.navigate('UserLogin')},
      ],
    );
  };
  return (
    <View>
      <View style={styles.nav}>
        <View style={styles.navContent}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.openDrawer()}>
              <Text style={styles.menuButtonText}>
                <Icon name="bars" size={20} color={'#2052f7'} />
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.logoContainer}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Image
              source={require('../../assets/logo.jpg')}
              style={styles.logo}
            />
            <Text style={styles.logoText}>Your company</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            {isLogin && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cartButton}
                  // onPress={() => thongbao()}
                  onPress={() => navigation.navigate('Checkout')}>
                  <Icon name="shopping-cart" size={20} color={'#2052f7'} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => navigation.navigate('UserLogin')}>
                  <Text style={styles.loginButtonText}>Log in</Text>
                </TouchableOpacity>
              </View>
            )}

            {!isLogin && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cartButton}
                  onPress={() => navigation.getParent().openDrawer()}>
                  <Icon name="shopping-cart" size={20} color={'#2052f7'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton}>
                  <Text
                    style={styles.loginButtonText}
                    onPress={async () => {
                      console.log(
                        await AsyncStorage.getItem('userToken'),
                        'day la check usertoken o header',
                      );
                    }}>
                    {/* {!!username ? username : null} */}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        {/* <SearchBar
          round
          searchIcon={{size: 16}}
          lightTheme="true"
          containerStyle={styles.search}
          inputContainerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
          placeholder="Tim kiem"
        /> */}
        <View
          style={{
            margin: 10,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#c4c7cc',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ebedf0',
          }}>
          <TextInput
            style={{width: '70%'}}
            placeholder="Tìm kiếm sản phẩm"
            onChangeText={text => setSearchText(text)}
            value={searchText}
          />
          <TouchableOpacity
            key={searchText}
            onPress={() => navigation.navigate('Search', {searchText})}>
            <View
              style={{
                backgroundColor: '#29B1B0',
                height: 35,
                width: 80,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IonIcon name="search" size={20} color={'#000000'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    minHeight: 90,
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginRight: 5,
    marginTop: 5,
    height: 30,
    width: 30,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 15,
    marginRight: 5,
  },
  loginButtonText: {
    fontSize: 14,
    color: 'black',
  },
  cartButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  menuButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 5,
  },
  menuButtonText: {
    fontSize: 14,
    color: 'black',
  },
  mobileMenu: {
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  mobileMenuItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  mobileMenuText: {
    fontSize: 14,
    color: 'black',
  },
  itemStyle: {
    padding: 10,
  },
  search: {
    height: 35,
    marginTop: 5,
    marginBottom: 0,
    paddingVertical: 0,
    padding: 0,
    backgroundColor: '#ffffff',
  },
  searchInputContainer: {
    height: 33,
    margin: 0,
    padding: 0,
    backgroundColor: '#ffffff',
  },
  searchInput: {
    height: 1,
    paddingBottom: 8,
  },
  avatar: {
    backgroundColor: '#aaaaaa',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 15,
    marginRight: 5,
  },
});

export default Header;
