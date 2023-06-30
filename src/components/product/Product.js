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
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../store/cart/CartSlice';
import {getProduct} from '../store/product/ProductSlice';
import {CardStyleInterpolators} from '@react-navigation/stack';
import Loading from '../Loading';
import axios from 'axios';
import Pagination from 'react-native-pagination';
import {ActivityIndicator} from 'react-native-paper';

export default function Product({navigation}) {
  const products = useSelector(state => state.product.product);
  const loading = useSelector(state => state.product.isLoading);
  const dispatch = useDispatch();

  const img =
    'http://192.168.1.9/magento2/pub/media/catalog/product/cache/80c6d82db34957c21ffe417663cf2776//';

  const addItemToCart = item => {
    const sku = item.sku;
    const itemInCart = {sku, qty: 1};
    dispatch(addToCart(itemInCart));
  };

  const [page, setPage] = useState(1);
  const handleIncrement = () => {
    setPage(page + 1);
  };

  const handleDecrement = () => {
    setPage(page - 1);
  };

  const listItem = ({item}) => {
    renderFooter = () => {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    };
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
          <Icon
            name="cart-plus"
            size={40}
            onPress={() => addItemToCart(item)}
          />
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    dispatch(getProduct(page));
  }, [loading, page]);
  return (
    <View style={{flex: 1, paddingHorizontal: 16}}>
      {!loading ? (
        <Loading />
      ) : (
        <View style={{flex: 1}}>
          <Text>Sản phẩm nổi bật</Text>
          <FlatList data={products} renderItem={listItem} />

          {/* pageURL */}
          <View style={{flexDirection: 'row', backgroundColor: '#e0e0e0'}}>
            <TouchableOpacity onPress={handleDecrement} disabled={page === 1}>
              <View
                style={{
                  height: 30,
                  width: 140,
                  backgroundColor: '#c7c7c7',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="angle-double-left" size={15} color={'#999999'} />
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: 30,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                {page}
              </Text>
            </View>
            <TouchableOpacity onPress={handleIncrement}>
              <View
                style={{
                  height: 30,
                  width: 140,
                  backgroundColor: '#c7c7c7',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="angle-double-right" size={15} color={'#999999'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});
