import React, {useState,useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-gesture-handler';
import Search from './search';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Header = ({navigation}) => {
  const [token, setToken] = useState(false);
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState({});
  // Luu tru token de check trang thai cua token
  AsyncStorage.getItem('sessionToken').then(res => {
    return setIsLogin(res);
  });

  //Luu tru trang thai cua token de check Login va User
  async function checkLogin() {
    setUser(JSON.parse(await AsyncStorage.getItem('user')));
    setToken((await AsyncStorage.getItem('sessionToken')) ? true : false);
  }

  //useEffect tranh checkLogin() loop bang trang thai isLogin cua token
  useEffect(() => {
    checkLogin();
  }, [isLogin]);





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
           
           {!token && (
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginButtonText}>Log in</Text>
              </TouchableOpacity>
            )}

            {token && (
              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>{user?.firstname}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.findButton}
              onPress={() => navigation.navigate('Cart')}>
              <Icon name="shopping-cart" size={20} color={'#2052f7'} />
            </TouchableOpacity>
          </View>
        </View>
     
        {/* <View style={{ flexDirection: 'row',}}>
          
       <IonIcon 
       style={{
        padding:3,
        marginLeft:10,
       }}
       name='search' size={25} color={'#000000'} />
      
      
       <TextInput
        style={
          { 
            width:'80%',
            height:35,
            marginHorizontal:'10%',
            borderRadius:20,
            backgroundColor:'#fcfcfc',
            borderWidth:1,

          }
        }
       
       />
  
       </View> */}
       

        <Search navigation={navigation} />


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
  findButton: {
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
  search: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#fff',
  },
  input: {
    color: '#ccc',
    borderWidth: 0,
    backgroundColor: 'transparent',
    borderRadius: 3,
  },
  button: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    color: '#fff',
  },
  
});

export default Header;
