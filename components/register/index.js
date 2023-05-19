import { ScrollView,Text, View,SafeAreaView, TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Submit from './submit';

const Register = (props) => {
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
      <View style={styles.inputS}>
      <IonIcon name='mail' size={20} color={'#CC0000'} />

       </View>
     </View>
    </SafeAreaView>
    <View style={{margin:30,
    justifyContent:'center',
    alignItems:'center',
    }}>

    </View>
    <View>
    <Submit/>
    </View>

      </View>
      <View style={styles.footer}>
        <View>
          <View style={styles.footerText}>
            <Text  style={{color:'white',padding:10,}}>Contact us</Text>
            <Text  style={{color:'white',padding:10,}}>Cookies</Text>
            <Text  style={{color:'white',padding:10,}}>Legal</Text>
          </View>
          <View style={styles.logos}>
            <View style={styles.icons}>
             <TouchableOpacity  >
              <View style={styles.icon}>
             <Icon name='twitter' size={20} color={'#1964E6'}  />
             </View>
             </TouchableOpacity>
            </View>
            <View style={styles.icons}>
             <TouchableOpacity>
             <View style={styles.icon}>
             <Icon name='youtube-play' size={20} color={'#CC0000'} />
             </View>
             </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={{color:'white',padding:10,}}>Copyright © 2023 Sony Group Corporation. All rights reserved.</Text>
          </View>
        </View>
      </View>
    </View>
    </ScrollView>
  )
}

export default Register