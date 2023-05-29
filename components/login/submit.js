import { View, Text,TouchableOpacity,TextInput } from 'react-native'
import React ,{ useState } from 'react'
import styles from './style';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isValidEmail, isValidPassword} from '../../utilies/Validations'
import userAPI from '../../services/userAPI'

const Submit = ({navigation}) => {
    const [email,setEmail] = useState('');
    const [errorEmail, setErrorEmail] =useState('');
    const [password,setPassword] = useState('');
    const [errorPassword, setErrorPassword] =useState('')
    const [visible,setvisible] = useState(false)
    const [userList, setUserList] = useState('');



    const handleAddTask = () => {
      if(email.length ===0){
        alert('Vui long nhap email')
        return false;
      }
      if(password.length ===0){
        alert('Vui long nhap password')
        return false;
      }
      if(errorEmail.length!==0){
        alert('email chưa đúng định dạng vui lòng nhập lại')
        return false;
      }
      if(errorPassword.length!==0){
        alert('password chưa đúng định dạng vui lòng nhập lại')
        return false;
      }
      try {
        const postUser = async () => {
            const list = await userAPI.post(
              {
                email,
                password,
              }
            );
          console.log({list});
            setUserList(list.data);
        };
        postUser();
    } catch (error) {
        console.log({error});
    }
 [];
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
        value={email}
        onChangeText={(text) => {
          setErrorEmail(isValidEmail(text) == true ?
          '' : 'email chưa đúng định dạng vui lòng nhập lại')
          setEmail(text)}}
        placeholder='email'
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
        value={password}
        onChangeText={(text) => {
          setErrorPassword(isValidPassword(text) == true ?
          '' : 'password chưa đúng định dạng vui lòng nhập lại')
          setPassword(text)}}
        placeholder='password'
        style={styles.input}
        secureTextEntry={visible? false : true}
        />
          <TouchableOpacity
          onPress={()=>{
            setvisible(!visible)
          }}
          >
           { visible ?
          <IonIcon style={{marginTop:20}} name='eye-off' size={30} color={'#303133'} />
          :
          <IonIcon style={{marginTop:20}} name='eye' size={30} color={'#303133'} />
          }
          </TouchableOpacity>
        </View>
        <Text style={{color:'red',}}>{errorPassword}</Text>
        </View>
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