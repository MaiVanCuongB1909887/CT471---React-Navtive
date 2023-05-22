import { View, Text,TouchableOpacity,TextInput } from 'react-native'
import React ,{ useState } from 'react'
import styles from './style';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isValidEmail, isValidPassword} from '../../utilies/Validations'
const Submit = ({props}) => {

    const [Email,setEmail] = useState('');
    const [errorEmail, setErrorEmail] =useState('');
    const [Password,setPassword] = useState('');
    const [errorPassword, setErrorPassword] =useState('')
    const handleAddTask = () =>{
      if(Email.length ===0){
        alert('Vui long nhap Email')
        return false;
      }
      if(Password.length ===0){
        alert('Vui long nhap Password')
        return false;
      }
      if(errorEmail.length!==0){
        alert('Email chưa đúng định dạng vui lòng nhập lại')
        return false;
      }
      if(errorPassword.length!==0){
        alert('Password chưa đúng định dạng vui lòng nhập lại')
        return false;
      }
      alert([Email,Password,]);
    }
  return (
    <View style={styles.addTask}>
      
      <View>
      <View>
        <View style={styles.iconVector}>
        <View style={styles.inputV}>
          
      <IonIcon name='mail' size={20} color={'#000000'} />
       </View>
       
        <TextInput  
        value={Email}
        onChangeText={(text) => {
          setErrorEmail(isValidEmail(text) == true ?
          '' : 'Email chưa đúng định dạng vui lòng nhập lại')
          setEmail(text)}}
        placeholder='Email'
        style={styles.input}
        />
        </View>
        <Text style={{color:'red',}}>{errorEmail}</Text>
        </View>
        <View>
        <View style={styles.iconVector}>
        <View style={styles.inputV}>
      <IonIcon name='ios-lock-closed' size={20} color={'#000000'} />
       </View>
       <TextInput  
        value={Password}
        onChangeText={(text) => {
          setErrorPassword(isValidPassword(text) == true ?
          '' : 'Password chưa đúng định dạng vui lòng nhập lại')
          setPassword(text)}}
        placeholder='Password'
        style={styles.input}
        />
        </View>
        <Text style={{color:'red',}}>{errorPassword}</Text>
        </View>
        </View>
        <Text 
        style={{ padding:10,fontSize:15, color:'#063a9c',fontWeight:'bold'}}
        >Forgot your Password?</Text>
        <Text
         style={{ padding:10,fontSize:15, color:'black'}}
        >Or login using</Text>
        <View style={{flexDirection:'row',}}>
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
           <Icon name='windows' size={60} color={'#000000'}  />
           </View>
           </TouchableOpacity>
          </View>
        <View style={{flexDirection:'row',}}>
        <Text
        style={{ padding:10,fontSize:15, color:'black'}}
        >No account yet ?</Text>
          <TouchableOpacity>
        <Text
         style={{ paddingVertical:10,fontSize:15, color:'#063a9c',fontWeight:'bold'}}
        >Sign up</Text>
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',}}>
        <TouchableOpacity>
      <View style={styles.register}>
      <Text style={styles.registerText}>Cancel</Text>
      </View>
    </TouchableOpacity>
      <TouchableOpacity
      onPress={handleAddTask}
      >
        <View style={styles.register}>
        <Text style={styles.registerText}>Login</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
)}
export default Submit;