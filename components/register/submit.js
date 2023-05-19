import { View, Text,TouchableOpacity,TextInput } from 'react-native'
import React ,{ useState } from 'react'
import styles from './style';
const Submit = (props) => {
    const [Email,setEmail] = useState('');
    const [Fistname,setFistname] = useState('');
    const [Lastname,setLastname] = useState('');
    const [Password,setPassword] = useState('');
    const [RetypePassword,setRetypePassword] = useState('');
    const handleAddTask = () =>{
      if(Email.length ===0){
        alert('Vui long nhap Email')
        return false;
      }
      if(Fistname.length ===0){
        alert('Vui long nhap Fistname')
        return false;
      }
      if(Lastname.length ===0){
        alert('Vui long nhap Lastname')
        return false;
      }
      if(Password.length ===0){
        alert('Vui long nhap Password')
        return false;
      }
      if(RetypePassword.length ===0){
        alert('Vui long nhap RetypePassword')
        return false;
      }
      if(Password.length !==RetypePassword.length){
        alert('pass khong trung vui long nhap lai')
        return false;
      }
      
      alert([Email,Fistname,Lastname,Password,RetypePassword]);
    }
  return (
    <View style={styles.addTask}>
        <TextInput 
        value={Email}
        onChangeText={(text) => setEmail(text)}
        placeholder='Email' 
        style={styles.input} 
        />
        <TextInput 
        value={Fistname}
        onChangeText={(text) => setFistname(text)}
        placeholder='Fist name' 
        style={styles.input} 
        />
        <TextInput 
        value={Lastname}
        onChangeText={(text) => setLastname(text)}
        placeholder='Last name' 
        style={styles.input} 
        />
        <TextInput 
        value={Password}
        onChangeText={(text) => setPassword(text)}
        placeholder='Password' 
        style={styles.input} 
        />
         <TextInput 
        value={RetypePassword}
        onChangeText={(text) => setRetypePassword(text)}
        placeholder='Retype Password' 
        style={styles.input} 
        />
      <TouchableOpacity
      onPress={handleAddTask}
      >
        <View style={styles.register}>
        <Text style={styles.registerText}>Submit</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Submit;