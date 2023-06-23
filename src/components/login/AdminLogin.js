import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import {adminLogin} from '../store/auth/AuthSlice';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminLogin = ({navigation}) => {
  const dispatch = useDispatch();
  const adminToken = useSelector(state => state.user.adminToken);
  const [callback, setCallback] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setvisible] = useState(false);

  const handleAddTask = async () => {
    if (username.length === 0) {
      alert('Vui long nhap username');
      return false;
    }
    if (password.length === 0) {
      alert('Vui long nhap password');
      return false;
    }
    dispatch(adminLogin({username, password}));
  };
  // const checkToken = async () => {
  //   return !!(await AsyncStorage.getItem('adminToken'))
  //     ? setIsLogin(false)
  //     : setIsLogin(true);
  // };

  useEffect(() => {
    // checkToken();
    if (adminToken) {
      navigation.navigate('Blogs');
    }
  }, [adminToken]);

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={{fontSize: 30, paddingLeft: 10, color: 'black'}}>
          Login Admin
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.addTask}>
          <View>
            <View>
              <View style={styles.iconVector}>
                <View style={styles.inputV}>
                  <IonIcon name="mail" size={20} color={'#000000'} />
                </View>

                <TextInput
                  onChangeText={text => {
                    setUsername(text);
                  }}
                  value={username}
                  placeholder="username"
                  style={styles.input}
                />
              </View>
            </View>
            <View>
              <View style={styles.iconVector}>
                <View style={styles.inputV}>
                  <IonIcon name="ios-lock-closed" size={20} color={'#000000'} />
                </View>
                <TextInput
                  onChangeText={text => {
                    setPassword(text);
                  }}
                  value={password}
                  placeholder="password"
                  style={styles.input}
                  secureTextEntry={visible ? false : true}
                />
                <TouchableOpacity
                  onPress={() => {
                    setvisible(!visible);
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
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <View style={styles.register}>
                <Text style={styles.registerText}>Cancel</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddTask}>
              <View style={styles.register}>
                <Text style={styles.registerText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{padding: 10, fontSize: 15, color: 'black'}}>
          Or login using
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <View style={styles.bodyIcon}>
              <Icon name="linkedin-square" size={60} color={'#2052f7'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.bodyIcon}>
              <Icon name="google-plus-square" size={60} color={'#000000'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.bodyIcon}>
              <Icon name="windows" size={60} color={'#000000'} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{padding: 10, fontSize: 15, color: 'black'}}>
            No account yet ?
          </Text>
          <TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate('Register');
              }}
              style={{
                paddingVertical: 10,
                fontSize: 15,
                color: '#063a9c',
                fontWeight: 'bold',
              }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminLogin;
