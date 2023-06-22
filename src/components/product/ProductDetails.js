import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../store/cart/CartSlice';
import Footer from '../footer';

export default function ProductDetails({route, navigation}) {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const cartProduct = JSON.stringify(cart);

  const sku = route.params.productId;

  const checkProduct = !!product ? true : false;
  const img =
    'http://192.168.1.9/magento2/pub/media/catalog/product/cache/80c6d82db34957c21ffe417663cf2776//';

  useEffect(() => {
    axios
      .get(`http://192.168.1.9:5000/product/detail/${sku}`)
      .then(response => {
        const productData = response.data;
        setProduct(productData);
        console.log(response);
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
    <ScrollView>
      <View style={{flex: 1, backgroundColor: '#E9EDF4'}}>
        <Text style={{padding: 15, fontSize: 17}}>chưa Phân Loại</Text>
        <View style={styles.container}>
          {checkProduct ? (
            <>
              <Image
                source={{
                  uri:
                    img +
                    '' +
                    product.product?.custom_attributes.find(
                      attr => attr.attribute_code === 'image',
                    ).value,
                }}
                style={styles.image}
              />

              <Text style={styles.name}>{product.product?.name}</Text>
              <Text style={styles.manuf}>Từ hãng: China wifi</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Text>Số Lượng : </Text>
                <TouchableOpacity onPress={decreaseQuantity}>
                  <View
                    style={{
                      height: 35,
                      width: 40,
                      backgroundColor: '#E9EDF4',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="minus" size={15} color={'#999999'} />
                  </View>
                </TouchableOpacity>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: 'black',
                    height: 40,
                    width: 70,
                    marginHorizontal: 5,
                  }}
                  keyboardType="numeric"
                  value={quantity.toString()}
                  onChangeText={text => setQuantity(parseInt(text))}
                />
                <TouchableOpacity onPress={increaseQuantity}>
                  <View
                    style={{
                      height: 35,
                      width: 40,
                      backgroundColor: '#E9EDF4',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="plus" size={15} color={'#999999'} />
                  </View>
                </TouchableOpacity>
                <Text style={styles.qty}>
                  còn {product.product?.qty} sản phẩm
                </Text>
              </View>

              <Text style={styles.price}>
                Giá:{' '}
                {product.product?.price.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Text>

              <Text style={styles.status}>
                Tình trạng:{' '}
                {product.product?.status == 1 ? 'Còn hàng' : 'Hết hàng'}
              </Text>
              <View
                style={{
                  marginTop: 20,
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                }}>
                <Text style={styles.nameh1}>Mô tả Tổng Quan Sản Phẩm</Text>
                <Text style={styles.description}>
                  Mô tả:{' '}
                  {product.product?.custom_attributes
                    .find(attr => attr.attribute_code === 'short_description')
                    .value.slice(3, -4)}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                }}>
                <Text style={styles.nameh1}>Chi Tiết Sản Phẩm </Text>
                <View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        borderWidth: 1,
                        width: '50%',
                        fontSize: 15,
                        borderColor: '#d1d0cd',
                        padding: 10,
                        backgroundColor: '#ebebeb',
                      }}>
                      dcmmm lam lau vl
                    </Text>
                    <Text
                      style={{
                        borderWidth: 1,
                        width: '50%',
                        fontSize: 15,
                        borderColor: '#d1d0cd',
                        padding: 10,
                      }}>
                      dcmmm lam lau vl
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        borderWidth: 1,
                        width: '50%',
                        fontSize: 15,
                        borderColor: '#d1d0cd',
                        padding: 10,
                        backgroundColor: '#ebebeb',
                      }}>
                      dcmmm lam lau vl
                    </Text>
                    <Text
                      style={{
                        borderWidth: 1,
                        width: '50%',
                        fontSize: 15,
                        borderColor: '#d1d0cd',
                        padding: 10,
                      }}>
                      dcmmm lam lau vl
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        borderWidth: 1,
                        width: '50%',
                        fontSize: 15,
                        borderColor: '#d1d0cd',
                        padding: 10,
                        backgroundColor: '#ebebeb',
                      }}>
                      dcmmm lam lau vl
                    </Text>
                    <Text
                      style={{
                        borderWidth: 1,
                        width: '50%',
                        fontSize: 15,
                        borderColor: '#d1d0cd',
                        padding: 10,
                      }}>
                      dcmmm lam lau vl
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginTop: 20,
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                }}>
                <Text style={styles.nameh1}>Mô Tả Chi Tiết</Text>
                <Text style={styles.description}>
                  Mô tả:{' '}
                  {product.product?.custom_attributes
                    .find(attr => attr.attribute_code === 'short_description')
                    .value.slice(3, -4)}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                }}>
                <Text style={styles.nameh1}>Chính Sách Bảo Hành</Text>
                <Text style={styles.description}>
                  Mô tả:{' '}
                  {product.product?.custom_attributes
                    .find(attr => attr.attribute_code === 'short_description')
                    .value.slice(3, -4)}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    margin: 20,
                    height: 60,
                    width: 200,
                    backgroundColor: 'white',
                    borderColor: '#29B1B0',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => addItemToCart(product.product)}>
                    <Text
                      style={{
                        color: '#29B1B0',
                        fontWeight: 'bold',
                      }}>
                      <Icon name="cart-plus" size={18} /> Thêm Vào Giỏ
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    margin: 20,
                    height: 60,
                    width: 120,
                    backgroundColor: '#F4374C',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}>
                  <TouchableOpacity onPress={() => console.log('Đặt mua')}>
                    <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
                      Đặt Mua
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  marginTop: 20,
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                }}>
                <Text style={styles.nameh1}>BÌnh Luận</Text>
                <Text style={styles.description}></Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                  marginBottom: 10,
                }}>
                <Text style={styles.nameh1}>Sản Phẩm Đã Xem</Text>
                <Text style={styles.description}></Text>
              </View>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '95%',
    height: 400,
    resizeMode: 'cover',
    margin: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
    color: 'black',
  },
  nameh1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
    color: 'black',
    marginBottom: 10,
  },
  price: {
    fontSize: 25,
    marginBottom: 10,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'red',
  },
  manuf: {
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 10,
  },

  qty: {
    fontSize: 15,
    marginBottom: 10,
    marginLeft: 10,
    paddingTop: 15,
  },
  status: {
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 10,
  },
  description: {
    fontSize: 18,
    marginLeft: 10,
  },
});
