import { View, Text,TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import styles from '../register/style'

const Home = ({navigation}) => {
  return (
    <ScrollView>
    <View>
      <TouchableOpacity>
      <Text>
        Home
      </Text>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity>
          <View style={styles.accoutBody}>
    
          <Text 
          onPress={() => {
            navigation.navigate('Login')
          }}
          style={{ color:'white', fontSize:20, }}>Login</Text>
          </View>
          </TouchableOpacity> 
    </View>
    </ScrollView>
  )
}

export default Home;