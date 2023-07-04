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

export default function Product({navigation}) {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.product);
  const loading = useSelector(state => state.product.isLoading);

  const img =
    'http://192.168.1.9/magento2/pub/media/catalog/product/cache/80c6d82db34957c21ffe417663cf2776//';

  useEffect(() => {
    dispatch(getProduct());
  }, [loading]);

  const addItemToCart = item => {
    const sku = item.sku;
    const itemInCart = {sku, qty: 1};
    dispatch(addToCart(itemInCart));
  };

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
          <Button
            title={'+'}
            style={{
              borderColor: 'gray',
              borderWidth: 1,
              marginVertical: 10,
              padding: 5,
            }}
            onPress={() => addItemToCart(item)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 16}}>
      {!loading ? (
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
