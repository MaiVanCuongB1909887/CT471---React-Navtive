import { ScrollView, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Submit from './submit';
import Footer from '../footer';

const Register = ({ navigation }) => {

  return (
    <ScrollView>
      <View style={styles.task}>
        <View style={styles.header} >
          <View style={styles.headerText}>
            <Text style={styles.text}>
              Sign up for a Developer World account
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <SafeAreaView>
            <View style={styles.bodyInput}>
              <Text style={styles.textBody}>
                Already have ac account?
              </Text>
              <TouchableOpacity>
                <View style={styles.accoutBody}>

                  <Text
                    onPress={() => {
                      navigation.navigate('Login')
                    }}
                    style={{ color: 'white', fontSize: 20, }}>Use an existing account</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.registerWith}>
                <Text style={{ fontSize: 15, flex: 1, color: 'black' }}
                >Or register with:</Text>
                <TouchableOpacity>
                  <View
                    style={styles.bodyIcon}>
                    <Icon name='linkedin-square' size={50} color={'#2052f7'} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.bodyIcon}>
                    <Icon name='google-plus-square' size={50} color={'#000000'} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.bodyIcon}>
                    <Icon name='windows' size={50} color={'#000000'} />
                  </View>
                </TouchableOpacity>
              </View>

              <Text style={styles.textBody
              }>if you don't have an account, you can register below</Text>
            </View>
          </SafeAreaView>
          <View>
            <Submit />
          </View>
          
        </View>
      </View>
      <Footer/>
    </ScrollView>
  )
}

export default Register