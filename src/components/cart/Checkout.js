import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Switch,
  Button,
  Modal,
  TouchableOpacity,
  RadioButton,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';

const Checkout = () => {
  const [selectedOption, setSelectedOption] = useState('existing-information');
  const [country_id, setCountry_id] = useState('');
  const [street, setStreet] = useState('');
  const [telephone, setTelephone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [newInformation, setNewInformation] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const cities = [
    {label: 'Hà Nội', value: 'hn'},
    {label: 'Hồ Chí Minh', value: 'hcm'},
    {label: 'Đà Nẵng', value: 'dn'},
    {label: 'Hải Phòng', value: 'hp'},
    {label: 'Cần Thơ', value: 'ct'},
  ];

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Country_id:', country_id);
    console.log('Street:', street);
    console.log('Telephone:', telephone);
    console.log('Postcode:', postcode);
    console.log('City:', city);
    console.log('Firstname:', firstname);
    console.log('Lastname:', lastname);
    console.log('Email:', email);
    // Add code to process the payment here
  };

  const handleOptionChange = event => {
    const value = event.target.value;
    setSelectedOption(value);
    if (value === 'existing-information') {
      setNewInformation(false);
    } else {
      setNewInformation(true);
    }
  };

  const handleCancel = () => {
    setSelectedOption('');
    setShowPaymentModal(false);
  };

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
        Thông Tin Thanh Toán
      </Text>
      <Text style={styles.labelContent}>Lấy thông tin hiện có</Text>
      <Switch
        onChange={handleOptionChange}
        value="existing-information"
        onValueChange={toggleSwitch}
      />
      <Text style={styles.labelContent}>Nhập thông tin mới</Text>
      <Switch
        value="new-information"
        onChange={handleOptionChange}
        onValueChange={toggleSwitch}
      />
      <Text>{isEnabled ? 'Switch is ON' : 'Switch is OFF'}</Text>
      {/* Lấy thông tin hiện có */}
      {/* {selectedOption === 'existing-information' && (
        <View
          style={{
            paddingBottom: 1,
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 2,
            shadowColor: 'black',
            shadowOpacity: 1,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 3,
            borderWidth: 2,
            borderRadius: 30,
          }}>
          <View style={{marginBottom: 8}}>
            <Text style={{fontWeight: 'bold', marginBottom: 2}}>
              Hình thức thanh toán
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => handleOptionChange('cash')}
                style={{marginRight: 20}}>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {selectedOption === 'cash' && (
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: 'black',
                        borderRadius: 6,
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Text style={{marginRight: 20}}>Thanh toán bằng tiền mặt</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => handleOptionChange('bank-transfer')}
                style={{marginRight: 20}}>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {selectedOption === 'bank-transfer' && (
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: 'black',
                        borderRadius: 6,
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Text style={{marginRight: 20}}>Chuyển khoản ngân hàng</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => handleOptionChange('digital-wallet')}
                style={{marginRight: 20}}>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {selectedOption === 'digital-wallet' && (
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: 'black',
                        borderRadius: 6,
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Text style={{marginRight: 20}}>Ví điện tử</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={handleCancel}
              style={{
                width: '30%',
                padding: 8,
                marginRight: 4,
                backgroundColor: 'gray',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Hủy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                width: '30%',
                padding: 8,
                backgroundColor: 'blue',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Thanh Toán
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )} */}

      {/* Phần Nhập Thông tin mới */}
      {/* {newInformation && (
        <View
          style={{
            paddingBottom: 1,
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 2,
            shadowColor: 'black',
            shadowOpacity: 1,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 3,
            borderWidth: 2,
            borderRadius: 30,
          }}>
          <View style={{marginBottom: 8}}>
            <Text style={{fontWeight: 'bold', marginBottom: 2}}>Họ:</Text>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 8,
              }}
              onChangeText={setFirstname}
              value={firstname}
              placeholder="Enter your firstname"
            />
            <Text style={{fontWeight: 'bold', marginBottom: 2}}>Tên:</Text>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 8,
              }}
              onChangeText={setLastname}
              value={lastname}
              placeholder="Enter your lastname"
            />
            <Text style={{fontWeight: 'bold', marginBottom: 2}}>
              Địa chỉ nhà:
            </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 8,
              }}
              onChangeText={setStreet}
              value={street}
              placeholder="Enter your street"
            />
            <Text style={{fontWeight: 'bold', marginBottom: 2}}>
              Thành phố:
            </Text>
            <Picker
              selectedValue={city}
              onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
              <Picker.Item label="Chọn thành phố" value="" />
            </Picker>
            <Text style={{fontWeight: 'bold', marginBottom: 2}}>Quốc gia:</Text>
            <Picker
              selectedValue={country_id}
              onValueChange={(itemValue, itemIndex) =>
                setCountry_id(itemValue)
              }>
              <Picker.Item label="Chọn quốc gia" value="" />
              <Picker.Item label="Việt Nam" value="VN" />
            </Picker>
            <Text style={{fontWeight: 'bold', marginBottom: 2}}>
              Số điện thoại:
            </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 8,
              }}
              onChangeText={setTelephone}
              value={telephone}
              placeholder="Enter your telephone"
            />
            <Text style={{fontWeight: 'bold', marginBottom: 2}}>Email:</Text>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 8,
              }}
              onChangeText={setEmail}
              value={email}
              placeholder="Enter your email address"
            />
            <Text style={{fontWeight: 'bold', marginBottom: 2}}>
              Mã bưu điện:
            </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 8,
              }}
              onChangeText={setPostcode}
              value={postcode}
              placeholder="Enter your number postcode"
            />
            <Text style={{fontWeight: 'bold', marginBottom: 2}}>
              Hình thức thanh toán:
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="cash"
                status={paymentMethod === 'cash' ? 'checked' : 'unchecked'}
                onPress={() => setPaymentMethod('cash')}
              />
              <Text style={{marginLeft: 8}}>Thanh toán bằng tiền mặt</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="bank-transfer"
                status={
                  paymentMethod === 'bank-transfer' ? 'checked' : 'unchecked'
                }
                onPress={() => setPaymentMethod('bank-transfer')}
              />
              <Text style={{marginLeft: 8}}>Chuyển khoản ngân hàng</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="digital-wallet"
                status={
                  paymentMethod === 'digital-wallet' ? 'checked' : 'unchecked'
                }
                onPress={() => setPaymentMethod('digital-wallet')}
              />
              <Text style={{marginLeft: 8}}>Ví điện tử</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={{
                width: '50%',
                backgroundColor: 'gray',
                borderRadius: 20,
                padding: 10,
                marginRight: 4,
              }}
              onPress={handleCancel}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Hủy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '50%',
                backgroundColor: 'blue',
                borderRadius: 20,
                padding: 10,
              }}
              onPress={handleSubmit}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Thanh Toán
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )} */}
      {newInformation && (
        <View style={styles.formContainer}>
          <Text>OKKKKKKKKKK</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  labelContent: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default Checkout;
