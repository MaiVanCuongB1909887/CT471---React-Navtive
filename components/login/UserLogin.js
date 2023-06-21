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
import {isValidEmail, isValidPassword} from '../../utilies/Validations';
import styles from './style';
import {userLogin} from '../../store/auth/AuthSlice';
import {useDispatch, useSelector} from 'react-redux';
import authAPI from '../../services/authAPI';

const UserLogin = ({navigation}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const isAdmin = useSelector(state => state.user.isAdmin);

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [visible, setvisible] = useState(false);
  console.log(isAdmin, 'day la isadmin o userlogin');
  console.log(isLoggedIn, 'day la islogged o userlogin');
  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Home');
    }
  }, [isLoggedIn]);

  const handleAddTask = async () => {
    if (email.length === 0) {
      alert('Vui long nhap email');
      return false;
    }
    if (password.length === 0) {
      alert('Vui long nhap password');
      return false;
    }
    if (errorEmail.length !== 0) {
      alert('email chưa đúng định dạng vui lòng nhập lại');
      return false;
    }
    if (errorPassword.length !== 0) {
      alert('password chưa đúng định dạng vui lòng nhập lại');
      return false;
    }
    dispatch(userLogin({email, password}));
  };
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={{fontSize: 30, paddingLeft: 10, color: 'black'}}>
          Login
        </Text>
        <Text style={{padding: 10, fontSize: 15, color: 'black'}}>
          Use your Developer World login
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
                  value={email}
                  onChangeText={text => {
                    setErrorEmail(
                      isValidEmail(text) == true
                        ? ''
                        : 'email chưa đúng định dạng vui lòng nhập lại',
                    );
                    setEmail(text);
                  }}
                  placeholder="email"
                  style={styles.input}
                />
              </View>
              <Text style={{color: 'red'}}>{errorEmail}</Text>
            </View>
            <View>
              <View style={styles.iconVector}>
                <View style={styles.inputV}>
                  <IonIcon name="ios-lock-closed" size={20} color={'#000000'} />
                </View>
                <TextInput
                  value={password}
                  onChangeText={text => {
                    setErrorPassword(
                      isValidPassword(text) == true
                        ? ''
                        : 'password chưa đúng định dạng vui lòng nhập lại',
                    );
                    setPassword(text);
                  }}
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
              <Text style={{color: 'red'}}>{errorPassword}</Text>
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

        <Text
          style={{
            padding: 10,
            fontSize: 15,
            color: '#063a9c',
            fontWeight: 'bold',
          }}>
          Forgot your Password?
        </Text>
        <Text
          style={{
            padding: 10,
            fontSize: 15,
            color: '#063a9c',
            fontWeight: 'bold',
          }}
          onPress={() => navigation.navigate('AdminLogin')}>
          Login as admin?
        </Text>
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

export default UserLogin;
