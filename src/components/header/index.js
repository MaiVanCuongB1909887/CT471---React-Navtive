import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Icon as Abc, withBadge} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

const Header = ({navigation}) => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart.cart);
  const userToken = useSelector(state => state.auth.userToken);
  const userDetail = useSelector(state => state.user.userDetail);
  const [searchText, setSearchText] = useState(null);

  const BadgedIcon = withBadge(cart ? cart.length : 0)(Abc);

  const handleSearch = async text => {
    setSearchText(text);
    const response = await dispatch(searchByName(text));
    if (response) {
      navigation.navigate('Search');
    }
    console.log(navigation);
  };

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
              source={require('../../../assets/logo.jpg')}
              style={styles.logo}
            />
            <Text style={styles.logoText}>Your company</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            {!userToken && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cartButton}
                  onPress={() => thongbao()}>
                  <Icon name="shopping-cart" size={20} color={'#2052f7'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => navigation.navigate('UserLogin')}>
                  <Text style={styles.loginButtonText}>Log in</Text>
                </TouchableOpacity>
              </View>
            )}
            {userToken && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cartButton}
                  onPress={() => navigation.getParent().openDrawer()}>
                  <BadgedIcon type="fontawesome" name="shopping-cart" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton}>
                  <Text
                    style={styles.loginButtonText}
                    onPress={() => navigation.navigate('User')}>
                    {userDetail?.firstname}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
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
            onChangeText={text => handleSearch(text)}
            value={searchText}
          />
          <TouchableOpacity
            key={searchText}
            onPress={() => navigation.navigate('Search')}>
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
