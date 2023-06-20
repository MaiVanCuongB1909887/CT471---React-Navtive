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

const img =
  'http://192.168.1.9/magento2/pub/media/catalog/product/cache/80c6d82db34957c21ffe417663cf2776//';

export default function Search({product, navigation, route}) {
  const searchText = route.params.searchText;
  // const [searchText,setSearchText] = useState(null); cuong
  const URL = `http://192.168.1.9:5000/product/list/name?name=${searchText}`;
  const [search, setSearch] = useState([]);
  // const [totalResults, setTotalResults] = useState(0); cuong
  const searchUrl = async () => {
    const res = await axios.get(URL);
    // console.log('cmn =', res.data);
    setSearch(res.data.product.items);
    // setTotalResults(res.data.product); cuong
    console.log(totalResults);
  };
  useEffect(() => {
    searchUrl();
  }, [searchText]);

  // console.log( 'cmn lam hoai deo dc =', {searchText})

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
            <Text style={{fontSize: 16}} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={{fontSize: 14, color: 'green'}} numberOfLines={1}>
              {item.price?.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
            <Text>
              <Icon name="cube" /> {item.qty} sản phẩm có sẵn
            </Text>
            <Text>1111 {search.length}</Text>
            {/*Thêm các thuộc tính khác của sản phẩm tại đây*/}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {/* <Text>co {totalResults} ket qua tim kiem</Text> cuong */}
      <FlatList data={search} renderItem={listItem} />
    </View>
  );
}
