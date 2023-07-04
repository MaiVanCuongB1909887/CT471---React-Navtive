import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

const img =
  'http://192.168.1.9/magento2/pub/media/catalog/product/cache/80c6d82db34957c21ffe417663cf2776//';

export default function Search({navigation}) {
  const products = useSelector(state => state.search.products);
  const keyword = useSelector(state => state.search.keyword);
  // if (keyword == '') {
  //   navigation.dispatch(CommonActions.goBack());
  // }
  const listItem = ({item}) => {
    return (
      <View>
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
            }}>
            <Image
              style={{width: 80, height: 80, marginRight: 16}}
              source={{
                uri:
                  img +
                  '' +
                  item.custom_attributes?.find(
                    attr => attr.attribute_code === 'image',
                  ).value,
              }}
            />
            <View style={{flex: 1}}>
              <Text style={{fontSize: 16, color: '#000'}} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={{fontSize: 14, color: 'green'}} numberOfLines={1}>
                {item.price?.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Text>
              <Text style={{color: '#000'}}>
                <Icon name="cube" /> {item.qty} sản phẩm có sẵn
              </Text>

              {/*Thêm các thuộc tính khác của sản phẩm tại đây*/}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <Text style={{color: '#000'}}>search/{keyword}</Text>
      <Text style={{color: '#000'}}>
        Hiển thị {products.total_count} kết quả phù hợp cho tìm kiếm '{keyword}'
      </Text>
      <FlatList data={products.items} renderItem={listItem} />
    </View>
  );
}
