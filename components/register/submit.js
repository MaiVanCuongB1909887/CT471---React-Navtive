import { View, Text,TouchableOpacity,TextInput } from 'react-native'
import React ,{ useState } from 'react'
import styles from './style';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown'
const Submit = (props) => {
    const countries = ["Buisness Vertical", "AI", "Automotive", "Computer","Education","Entertainment","Iot","Mobile","Robotics","Telecommunication","Orders"]
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
      if(Password !== RetypePassword){
        alert('pass khong trung vui long nhap lai')
        return false;
      }
      
      alert([Email,Fistname,Lastname,Password,RetypePassword]);
    }
  return (
    <View style={styles.addTask}>
      <View>
        <View style={styles.iconVector}>
        <View style={styles.inputV}>
      <IonIcon name='mail' size={20} color={'#000000'} />
       </View>
        <TextInput 
        value={Email}
        onChangeText={(text) => setEmail(text)}
        placeholder='Email' 
        style={styles.input} 
        />
        </View>
        <View style={styles.iconVector}>
       <View style={styles.inputV}>
      <Icon name='user-circle-o' size={20} color={'#000000'} />
       </View>
        <TextInput 
        value={Fistname}
        onChangeText={(text) => setFistname(text)}
        placeholder='Fist name' 
        style={styles.input} 
        />
        </View>
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
        <View style={styles.iconVector}>
        <View style={styles.inputV}>
      <IonIcon name='ios-lock-closed' size={20} color={'#000000'} />
       </View>
        <TextInput 
        value={Password}
        onChangeText={(text) => setPassword(text)}
        placeholder='Password' 
        style={styles.input} 
        />
        </View>
        <View style={styles.iconVector}>
        <View style={styles.inputV}>
      <IonIcon name='ios-lock-closed' size={20} color={'#000000'} />
       </View>
         <TextInput 
        value={RetypePassword}
        onChangeText={(text) => setRetypePassword(text)}
        placeholder='Retype Password' 
        style={styles.input} 
        />
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