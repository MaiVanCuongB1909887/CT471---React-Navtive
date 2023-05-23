import { View, Text,TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import style from './style'

const Home = ({navigation}) => {
  return (
    <ScrollView>
    <View style={style.container}>
      <TouchableOpacity>
      <Text>
        Home
      </Text>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity>
          <View style={style.accoutBody}>
    
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