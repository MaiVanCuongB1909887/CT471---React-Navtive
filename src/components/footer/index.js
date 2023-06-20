import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

function Footer() {
  return (
    <View style={styles.footer}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.zone}>
          <Text style={styles.text}>Về chúng tôi</Text>
          <Text> Về chúng tôi </Text>
          <Text> Liên hệ </Text>
          <Text> Tuyển dụng </Text>
        </View>
        <View style={styles.zone}>
          <Text style={styles.text}>Chính sách</Text>
          <Text> An toàn bảo mật </Text>
          <Text> Điều khoảng sử dụng </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.zone}>
          <Text style={styles.text}>Hỗ trợ</Text>
          <Text> Catalogue </Text>
          <Text> Giao hàng </Text>
          <Text> Thanh toán </Text>
        </View>
        <View style={styles.zone}>
          <Text style={styles.text}>Mạng xã hội</Text>
          <Text> Facebook </Text>
          <Text> Instagram </Text>
          <Text> Youtobe </Text>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          borderBottomWidth: 3,
          borderBottomColor: '#69696B',
        }}>
        <Text style={styles.text}>Tải ứng dụng trên điện thoại</Text>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../../assets/app-store.png')}
            style={styles.image}
          />
          <Image
            source={require('../../../assets/google-play.png')}
            style={styles.image}
          />
        </View>
      </View>
      <View style={{padding: 10}}>
        <Text style={styles.text}>Liên hệ</Text>
        <Text>Hotline:(+84)352 045 623</Text>
        <Text>Email: Sales@scadaautomation.com.vn</Text>
        <Image
          source={require('../../../assets/logoscada.png')}
          style={styles.imageLogo}
        />
        <Text style={{marginBottom: 15}}>© 2023 SCADAAutomation.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    backgroundColor: '#E2E2E2',
  },

  zone: {
    padding: 10,
    width: '50%',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  image: {
    width: '30%',
    height: 35,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  imageLogo: {
    width: '30%',
    height: 35,
    marginHorizontal: 10,
    marginVertical: 15,
  },
});
export default Footer;
