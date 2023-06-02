import { View, Text,TouchableOpacity,TextInput } from 'react-native'
import React ,{ useState } from 'react'
import styles from './style';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import {isValidEmail, isValidPassword , isValidRetypePassword} from '../../utilies/Validations'


const Submit = (navigation) => {
    const countries = ["Buisness Vertical", "AI", "Automotive", "Computer","Education","Entertainment","Iot","Mobile","Robotics","Telecommunication","Orders"]
    const [Email,setEmail] = useState('');
    const [errorEmail, setErrorEmail] =useState('')
    const [firstname,setFirstname] = useState('');
    const [Lastname,setLastname] = useState('');
    const [Password,setPassword] = useState('');
    const [errorPassword, setErrorPassword] =useState('')
    const [RetypePassword,setRetypePassword] = useState('');
    const [errorRetypePassword, setErrorRetypePassword] =useState('')
    const [visible,setVisible] = useState(false)
    const [repeatVisible,setRepeatVisible] = useState(false)


    const handleAddTask = () =>{
      if(Email.length ===0){
        alert('Vui long nhap Email')
        return false;
      }
      if(firstname.length ===0){
        alert('Vui long nhap firstname')
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
      if(Password !== RetypePassword){
        alert('pass khong trung vui long nhap lai')
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
      if(errorRetypePassword.length!==0){
        alert('Password chưa đúng định dạng vui lòng nhập lại')
        return false;
      }
      alert([Email,firstname,Lastname,Password,RetypePassword]);
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
      <Icon name='user-circle-o' size={20} color={'#000000'} />
       </View>
        <TextInput 
        value={firstname}
        onChangeText={(text) => setFirstname(text)}
        placeholder='First name' 
        style={styles.input} 
        />
        </View>
        <Text></Text>
        </View>
        <View>
        <View style={styles.iconVector}>
         <View style={styles.inputV}>
      <Icon name='user-circle-o' size={20} color={'#000000'} />
       </View>
        <TextInput 
        value={Lastname}
        onChangeText={(text) => setLastname(text)}
        placeholder='Last name' 
        style={styles.input} 
        />
        </View>
        <Text></Text>
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
          // alert('dung') : alert(isValidPassword(text)))
          '' : 'Password chưa đúng định dạng vui lòng nhập lại')
          setPassword(text)}}
        placeholder='Password'
        style={styles.input}
        secureTextEntry={visible? false : true}
        />
         <TouchableOpacity style={styles.eye}
          onPress={()=>{
            setVisible(!visible)
          }}
          >
          { visible ?
          <IonIcon name='eye-off' size={30} color={'#303133'} />
          :
          <IonIcon name='eye' size={30} color={'#303133'} />
          }
          </TouchableOpacity>
        </View>
        <Text style={{color:'red',}}>{errorPassword}</Text>
        </View>
        <View>
        <View style={styles.iconVector}>
        <View style={styles.inputV}>
      <IonIcon name='ios-lock-closed' size={20} color={'#000000'} />
       </View>
         <TextInput 
        value={RetypePassword}
        onChangeText={(text) => {
          setErrorRetypePassword(isValidRetypePassword(text) == true ?
          // alert('dung') : alert(isValidRetypePassword(text)))
          '' : 'Retype Password chưa đúng định dạng vui lòng nhập lại')
          setRetypePassword(text)}}
        placeholder='RetypePassword'
        style={styles.input}
        secureTextEntry={repeatVisible? false : true}
        />
         <TouchableOpacity style={styles.eye}
          onPress={()=>{
            setRepeatVisible(!repeatVisible)
          }}
          >
          { repeatVisible ?
          <IonIcon  name='eye-off' size={30} color={'#303133'} />
          :
          <IonIcon  name='eye' size={30} color={'#303133'} />
          }
          </TouchableOpacity>
        </View>
        <Text style={{color:'red',}}>{errorRetypePassword}</Text>
        </View>
        </View>
        <View style={styles.selectDropdown}>
        <SelectDropdown
  label="Select Item"
	data={countries}
	onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		return item
	}}
/>
<View style={{ justifyContent:'center',
        alignItems:'center',}}>
<Icon style={styles.down} type="font-awesome" name="chevron-down" size={20} />
</View>
</View>
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