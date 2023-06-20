import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../../store/cart/CartReducer';

export default function ProductDetails({route, navigation}) {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const cartProduct = JSON.stringify(cart);

  const sku = route.params.productId;
  const checkProduct = product ? true : false;
  const img =
    'http://192.168.1.9/magento2/pub/media/catalog/product/cache/80c6d82db34957c21ffe417663cf2776//';
  useEffect(() => {
    axios
      .get(`http://192.168.1.9:5000/product/detail/${sku}`)
      .then(response => {
        const productData = response.data;
        setProduct(productData);
        // console.log(productData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const addItemToCart = item => {
    dispatch(addToCart(item));
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
          <Image
            source={{
              uri:
                img +
                '' +
                product.product.custom_attributes.find(
                  attr => attr.attribute_code === 'image',
                ).value,
            }}
            style={styles.image}
          />
          <Text style={styles.name}>{product.product.name}</Text>
          <Text style={{fontSize: 16, color: 'black'}}>
            Từ hãng:{' '}
            <Text style={styles.category}>{product.product.category}</Text> SKU
            sản phẩm: {product.product.sku}
          </Text>
          <Text style={styles.price}>
            {product.product.price.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
          <Text style={styles.description}>
            Mô tả:{' '}
            {product.product.custom_attributes
              .find(attr => attr.attribute_code === 'short_description')
              .value.slice(3, -4)}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  backgroundColor: '#E9EDF4',
                }}>
                Số lượng:{' '}
              </Text>{' '}
              <Text>Còn {product.product.qty} sản phẩm</Text>
            </Text>
            <View style={{backgroundColor: 'white'}}>
              <Text>Mô tả tổng quan sản phẩm</Text>
            </View>
            <Text>Chi tiết sản phẩm</Text>
            <View style={{flexDirection: 'row', height: 35, width: 80}}>
              <Button title="-" onPress={decreaseQuantity} />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  paddingHorizontal: 10,
                  marginHorizontal: 10,
                }}
                keyboardType="numeric"
                value={quantity.toString()}
                onChangeText={text => setQuantity(parseInt(text))}
              />
              <Button title="+" onPress={increaseQuantity} />
            </View>
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
              onPress={() => addItemToCart(product.product)}>
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
      <TouchableOpacity onPress={() => navigation.goBack()}>
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
    color: 'black',
  },
  image: {
    width: 110,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    marginBottom: 10,
    color: '#252525',
    fontFamily: 'Inter-SemiBold',
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'red',
  },
  status: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  description: {
    fontSize: 18,
    color: 'black',
  },
  themvaogio: {
    borderColor: 'green',
    textDecorationColor: 'green',
  },
  datmua: {
    backgroundColor: 'red',
    textDecorationColor: 'white',
  },
  category: {
    color: 'green',
    textDecorationLine: 'underline',
  },
});
