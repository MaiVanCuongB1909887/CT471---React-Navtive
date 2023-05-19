import { ScrollView,Text, View,SafeAreaView, TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style'
import Submit from './submit'

const Login = () => {
    return ( 
        <ScrollView>
        <View style={styles.header}>
            <Text style={{fontSize:30,paddingLeft:10,color:'black'}}>Login</Text>
            <Text style={{padding:10,fontSize:15,color:'black'}}>Use your Developer World login</Text>
        </View>
        <View style={styles.body}>
        <Submit/>
        </View>
        </ScrollView>
    )
}

    export default Login