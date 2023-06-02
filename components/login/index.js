import { ScrollView, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style'
import Submit from './submit'
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../footer';
const Login = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={{ fontSize: 30, paddingLeft: 10, color: 'black' }}>Login</Text>
        <Text style={{ padding: 10, fontSize: 15, color: 'black' }}>Use your Developer World login</Text>
      </View>
      <View style={styles.body}>
        <Submit />
        <Text
          style={{ padding: 10, fontSize: 15, color: '#063a9c', fontWeight: 'bold' }}
        >Forgot your Password?</Text>
        <Text
          style={{ padding: 10, fontSize: 15, color: 'black' }}
        >Or login using</Text>
        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity>
            <View style={styles.bodyIcon}>
              <Icon name='linkedin-square' size={60} color={'#2052f7'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.bodyIcon}>
              <Icon name='google-plus-square' size={60} color={'#000000'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.bodyIcon}>
              <Icon name='windows' size={60} color={'#000000'} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', }}>
          <Text
            style={{ padding: 10, fontSize: 15, color: 'black' }}
          >No account yet ?</Text>
          <TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate('Register')
              }}
              style={{ paddingVertical: 10, fontSize: 15, color: '#063a9c', fontWeight: 'bold' }}
            >Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer/>
    </ScrollView>
  )
}

export default Login