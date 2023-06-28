import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Button,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {address, checkout} from '../../store/cart/CartSlice';

const Checkout = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [phone, setPhone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();
  const detail = useSelector(state => state.user.userDetail);
  const order = useSelector(state => state.cart.order);

  function setDetailUser() {
    if (!!detail) {
      setCountry(detail.addresses[0].country_id);
      setStreet(detail.addresses[0].street);
      setPhone(detail.addresses[0].telephone);
      setPostcode(detail.addresses[0].postcode);
      setCity(detail.addresses[0].city);
      setFirstName(detail.firstname);
      setLastName(detail.lastname);
      setEmail(detail.email);
    }
  }

  const handleSubmit = async () => {
    try {
      const data = {
        firstname: firstName,
        lastname: lastName,
        countryId: country,
        street: street,
        city: city,
        telephone: phone,
        postcode: postcode,
        email: email,
      };
      await dispatch(address(data));
      const response = await dispatch(checkout({method: paymentMethod}));
      if (order) {
        navigation.navigate('Home');
        return response;
      } else {
        alert('Thanh toan that bai');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDetailUser();
  }, []);

  return (
    <ScrollView>
      <Text style={styles.h1}>Thông Tin Thanh Toán</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Street"
          value={street[0]}
          onChangeText={setStreet}
        />
        <TextInput
          style={styles.input}
          placeholder="Postcode"
          value={postcode}
          onChangeText={setPostcode}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
        <Picker
          style={styles.input}
          selectedValue={paymentMethod}
          onValueChange={itemValue => setPaymentMethod(itemValue)}>
          <Picker.Item label="Authorize.net" value="authorizenet_directpost" />
          <Picker.Item label="Braintree" value="braintree" />
          <Picker.Item label="Cash on delivery" value="cashondelivery" />
          <Picker.Item label="Check / Money Order" value="checkmo" />
          <Picker.Item label="Credit Card" value="savedcc" />
          <Picker.Item label="PayPal Express" value="paypal_express" />
          <Picker.Item label="PayPal Payflow Pro" value="payflowpro" />
          <Picker.Item label="Purchase Order" value="purchaseorder" />
          <Picker.Item label="Zero Subtotal Checkout" value="free" />
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    color: '#000',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  h1: {
    color: 'black',
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
});

export default Checkout;
