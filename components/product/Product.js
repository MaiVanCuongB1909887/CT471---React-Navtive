import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userAPI from '../../services/userAPI';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../../store/cart/CartReducer';

export default function Product({navigation}) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const img =
    'http://192.168.1.9/magento2/pub/media/catalog/product/cache/80c6d82db34957c21ffe417663cf2776//';

  const getProduct = async () => {
    try {
      const response = await userAPI.getAllProduct();
      if (!!response) {
        setLoading(false);
        setProducts(response.product.items);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(false);
    getProduct();
  }, [cart]);

  const addItemToCart = item => {
    dispatch(addToCart(item));
  };
  const removeItemFromCart = item => {
    dispatch(removeFromCart(item));
  };
  // const increaseQuantity = item => {
  //   dispatch(incrementQuantity(item));
  // };
  // const decreaseQuantity = item => {
  //   if (item.quantity == 1) {
  //     dispatch(removeFromCart(item));
  //   } else {
  //     dispatch(decrementQuantity(item));
  //   }
  // };

  const listItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            productId: item.sku,
          })
        }>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
          }}
          key={item.id}>
          <Image
            style={{width: 80, height: 80, marginRight: 16}}
            source={{
              uri:
                img +
                '' +
                item.custom_attributes.find(
                  attr => attr.attribute_code === 'image',
                ).value,
            }}
          />
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16, color: '#000'}} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={{fontSize: 14, color: 'green'}} numberOfLines={1}>
              {item.price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
            <Text style={{color: '#000'}}>
              <Icon name="cube" />
              {item.qty} sản phẩm có sẵn
            </Text>
            {/* Thêm các thuộc tính khác của sản phẩm tại đây */}
          </View>
          {cart.some(value => value.id == item.id) ? (
            <Button
              title={'REMOVE FROM CART'}
              onPress={() => removeItemFromCart(item)}
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                marginVertical: 10,
                padding: 5,
              }}
            />
          ) : (
            <Button
              title={'ADD TO CART'}
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                marginVertical: 10,
                padding: 5,
              }}
              onPress={() => addItemToCart(item)}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 16}}>
      {loading ? (
        <Text style={{color: '#000'}}>Loading...</Text>
      ) : (
        <View style={{flex: 1}}>
          <Text>Sản phẩm nổi bật</Text>

          <FlatList data={products} renderItem={listItem} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
