import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Header extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.nav}>
          <View style={styles.navContent}>
            <View style={styles.buttonContainer} >
              <TouchableOpacity style={styles.menuButton} >
                <Text style={styles.menuButtonText}>
                  <Icon name='bars' size={20} color={'#2052f7'} />
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.logoContainer} onPress={() => this.props.navigation.navigate('Home')}>
              <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
              <Text style={styles.logoText}>Your company</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText} onPress={() => this.props.navigation.navigate('Login')}>Log in</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.findButton}>
                <Icon name='search' size={20} color={'#2052f7'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
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
    marginRight: 5
  },
  loginButtonText: {
    fontSize: 14,
    color: 'black'
  },
  findButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  menuButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 5
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
});

export default Header