import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';

import styles from './style';
import authAPI from '../services/authAPI';
import {
  isValidEmail,
  isValidPassword,
  isValidRetypePassword,
} from '../../utilies/Validations';
import {useDerivedValue} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {userRegister} from '../../store/auth/AuthSlice';

const Register = ({navigation}) => {
  const countries = [
    'Buisness Vertical',
    'AI',
    'Automotive',
    'Computer',
    'Education',
    'Entertainment',
    'Iot',
    'Mobile',
    'Robotics',
    'Telecommunication',
    'Orders',
  ];
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [RetypePassword, setRetypePassword] = useState('');
  const [errorRetypePassword, setErrorRetypePassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [repeatVisible, setRepeatVisible] = useState(false);

  const handleAddTask = async () => {
    if (email.length === 0) {
      alert('Vui long nhap Email');
      return false;
    }
    if (firstname.length === 0) {
      alert('Vui long nhap firstname');
      return false;
    }
    if (lastname.length === 0) {
      alert('Vui long nhap Lastname');
      return false;
    }
    if (password.length === 0) {
      alert('Vui long nhap Password');
      return false;
    }
    if (RetypePassword.length === 0) {
      alert('Vui long nhap RetypePassword');
      return false;
    }
    if (password !== RetypePassword) {
      alert('pass khong trung vui long nhap lai');
      return false;
    }
    if (errorEmail.length !== 0) {
      alert('Email chưa đúng định dạng vui lòng nhập lại');
      return false;
    }
    if (errorPassword.length !== 0) {
      alert('Password chưa đúng định dạng vui lòng nhập lại');
      return false;
    }
    if (errorRetypePassword.length !== 0) {
      alert('Password chưa đúng định dạng vui lòng nhập lại');
      return false;
    }
    try {
      const response = await dispatch(
        userRegister({
          email: email,
          password: password,
          lastname: lastname,
          firstname: firstname,
        }),
      );
      if (!!response) {
        alert('Vui long kiem tra hop thu de kich hoat tai khoan');
        navigation.navigate('UserLogin');
      }
    } catch (error) {
      return alert(error.response.data.message);
    }
  };
  return (
    <ScrollView>
      <View style={styles.task}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.text}>
              Sign up for a Developer World account
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <SafeAreaView>
            <View style={styles.bodyInput}>
              <Text style={styles.textBody}>Already have ac account?</Text>
              <TouchableOpacity>
                <View style={styles.accoutBody}>
                  <Text
                    onPress={() => {
                      navigation.navigate('Login');
                    }}
                    style={{color: 'white', fontSize: 20}}>
                    Use an existing account
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.registerWith}>
                <Text style={{fontSize: 15, flex: 1, color: 'black'}}>
                  Or register with:
                </Text>
                <TouchableOpacity>
                  <View style={styles.bodyIcon}>
                    <Icon name="linkedin-square" size={50} color={'#2052f7'} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.bodyIcon}>
                    <Icon
                      name="google-plus-square"
                      size={50}
                      color={'#000000'}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.bodyIcon}>
                    <Icon name="windows" size={50} color={'#000000'} />
                  </View>
                </TouchableOpacity>
              </View>

              <Text style={styles.textBody}>
                if you don't have an account, you can register below
              </Text>
            </View>
          </SafeAreaView>
          <View>
            <View style={styles.addTask}>
              <View>
                <View>
                  <View style={styles.iconVector}>
                    <View style={styles.inputV}>
                      <IonIcon name="mail" size={20} color={'#000000'} />
                    </View>

                    <TextInput
                      value={email}
                      onChangeText={text => {
                        setErrorEmail(
                          isValidEmail(text) == true
                            ? ''
                            : 'Email chưa đúng định dạng vui lòng nhập lại',
                        );
                        setEmail(text);
                      }}
                      placeholder="Email"
                      style={styles.input}
                    />
                  </View>
                  <Text style={{color: 'red'}}>{errorEmail}</Text>
                </View>
                <View>
                  <View style={styles.iconVector}>
                    <View style={styles.inputV}>
                      <Icon name="user-circle-o" size={20} color={'#000000'} />
                    </View>
                    <TextInput
                      value={firstname}
                      onChangeText={text => setFirstname(text)}
                      placeholder="First name"
                      style={styles.input}
                    />
                  </View>
                  <Text></Text>
                </View>
                <View>
                  <View style={styles.iconVector}>
                    <View style={styles.inputV}>
                      <Icon name="user-circle-o" size={20} color={'#000000'} />
                    </View>
                    <TextInput
                      value={lastname}
                      onChangeText={text => setLastname(text)}
                      placeholder="Last name"
                      style={styles.input}
                    />
                  </View>
                  <Text></Text>
                </View>
                <View>
                  <View style={styles.iconVector}>
                    <View style={styles.inputV}>
                      <IonIcon
                        name="ios-lock-closed"
                        size={20}
                        color={'#000000'}
                      />
                    </View>
                    <TextInput
                      value={password}
                      onChangeText={text => {
                        setErrorPassword(
                          isValidPassword(text) == true
                            ? // alert('dung') : alert(isValidPassword(text)))
                              ''
                            : 'Password chưa đúng định dạng vui lòng nhập lại',
                        );
                        setPassword(text);
                      }}
                      placeholder="Password"
                      style={styles.input}
                      secureTextEntry={visible ? false : true}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setVisible(!visible);
                      }}>
                      {visible ? (
                        <IonIcon
                          style={{marginTop: 20}}
                          name="eye-off"
                          size={30}
                          color={'#303133'}
                        />
                      ) : (
                        <IonIcon
                          style={{marginTop: 20}}
                          name="eye"
                          size={30}
                          color={'#303133'}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <Text style={{color: 'red'}}>{errorPassword}</Text>
                </View>
                <View>
                  <View style={styles.iconVector}>
                    <View style={styles.inputV}>
                      <IonIcon
                        name="ios-lock-closed"
                        size={20}
                        color={'#000000'}
                      />
                    </View>
                    <TextInput
                      value={RetypePassword}
                      onChangeText={text => {
                        setErrorRetypePassword(
                          isValidRetypePassword(text) == true
                            ? // alert('dung') : alert(isValidRetypePassword(text)))
                              ''
                            : 'Retype Password chưa đúng định dạng vui lòng nhập lại',
                        );
                        setRetypePassword(text);
                      }}
                      placeholder="RetypePassword"
                      style={styles.input}
                      secureTextEntry={repeatVisible ? false : true}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setRepeatVisible(!repeatVisible);
                      }}>
                      {repeatVisible ? (
                        <IonIcon
                          style={{marginTop: 20}}
                          name="eye-off"
                          size={30}
                          color={'#303133'}
                        />
                      ) : (
                        <IonIcon
                          style={{marginTop: 20}}
                          name="eye"
                          size={30}
                          color={'#303133'}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <Text style={{color: 'red'}}>{errorRetypePassword}</Text>
                </View>
              </View>
              <View style={styles.selectDropdown}>
                <SelectDropdown
                  label="Select Item"
                  data={countries}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Icon
                    style={styles.down}
                    type="font-awesome"
                    name="chevron-down"
                    size={20}
                  />
                </View>
              </View>
              <TouchableOpacity onPress={handleAddTask}>
                <View style={styles.register}>
                  <Text style={styles.registerText}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;
