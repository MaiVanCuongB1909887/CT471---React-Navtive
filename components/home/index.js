import { View, Text,TouchableOpacity,ScrollView, Button } from 'react-native'
import React from 'react'
import style from './style'

const Home = () => {
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
    
          <Text>This is flat list</Text>
          </View>
          </TouchableOpacity> 
    </View>
    </ScrollView>
  )
}

export default Home;