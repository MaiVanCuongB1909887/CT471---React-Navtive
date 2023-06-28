import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProductDetails({route, navigation}) {
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const sku = route.params.productId;
  const checkProduct = product ? true : false;

  // const img =
  //   'http://192.168.1.9/magento2/pub/media/catalog/product/cache/80c6d82db34957c21ffe417663cf2776//';
  useEffect(() => {
    axios
      .get(`http://192.168.1.9:5000/product/${sku}`)
      .then(response => {
        const productData = response.data;
        setProduct(productData);
        // console.log(productData);
      })
      .catch(error => {
        console.log(error, 'day la loi product detail');
      });
  }, []);

  const addToCart = () => {
    const newCartItems = [...cartItems];
    const existingItem = newCartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      newCartItems.push({...product, quantity});
    }
    setCartItems(newCartItems);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      {checkProduct ? (
        <>
          {/* <Image
            source={{
              uri:
                img +
                '' +
                product.product.custom_attributes.find(
                  attr => attr.attribute_code === 'image',
                ).value,
            }}
            style={styles.image}
          /> */}
          <Image
            style={{width: 200, height: 300, marginRight: 16}}
            src={'https://static.alphacoders.com/alpha_system_360.png'}
          />
          <Text style={styles.name}>{product.product.name}</Text>
          <Text style={styles.price}>
            Giá:{' '}
            {product.product.price.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>

          <Text style={styles.status}>
            Tình trạng:{' '}
            {product.product.stock_status == 0 ? 'Hết hàng' : 'Còn hàng'}
          </Text>
          <Text style={styles.description}>
            Mô tả:{' '}
            {product.product.custom_attributes
              .find(attr => attr.attribute_code === 'short_description')
              .value.slice(3, -4)}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Số lượng: </Text>
            <View
              style={{
                flexDirection: 'row',
                height: 35,
                width: 80,
                color: '#000',
              }}>
              <Button title="-" onPress={decreaseQuantity} />
              <TextInput
                maxLength={2}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  paddingHorizontal: 10,
                  marginHorizontal: 10,
                  color: '#000',
                }}
                keyboardType="numeric"
                value={quantity.toString()}
                onChangeText={text => setQuantity(parseInt(text))}
              />
              <Button title="+" onPress={increaseQuantity} />
            </View>
            {/* <TouchableOpacity onPress={decreaseQuantity}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginHorizontal: 10,
              }}
              onChangeText={text => setQuantity(parseInt(text))}
              value={quantity.toString()}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={increaseQuantity}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>+</Text>
            </TouchableOpacity> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 5,

                marginRight: 10,
                borderColor: 'green',
                borderWidth: 1,
              }}
              onPress={addToCart}>
              <Text
                style={{
                  color: 'green',
                  fontWeight: 'bold',
                }}>
                <Icon name="cart-plus" size={18} /> Thêm Vào Giỏ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                padding: 10,
                borderRadius: 5,
              }}
              onPress={() => console.log('Đặt mua')}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Đặt Mua</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      <TouchableOpacity onPress={() => navigation.getParent().goBack()}>
        <Text style={{fontSize: 16, color: 'blue', marginTop: 10}}>Trở Về</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
  },
  image: {
    width: 110,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
  themvaogio: {
    borderColor: 'green',
    textDecorationColor: 'green',
  },
  datmua: {
    backgroundColor: 'red',
    textDecorationColor: 'white',
  },
});
