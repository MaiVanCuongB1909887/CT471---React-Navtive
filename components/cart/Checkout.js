import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Checkout = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('USA');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

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
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Picker
          style={styles.input}
          selectedValue={country}
          onValueChange={itemValue => setCountry(itemValue)}>
          <Picker.Item label="USA" value="USA" />
          <Picker.Item label="Canada" value="Canada" />
          <Picker.Item label="Mexico" value="Mexico" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
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
        <Picker
          style={styles.input}
          selectedValue={paymentMethod}
          onValueChange={itemValue => setPaymentMethod(itemValue)}>
          <Picker.Item label="Credit Card" value="Credit Card" />
          <Picker.Item label="Paypal" value="Paypal" />
        </Picker>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Submit')}>
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
