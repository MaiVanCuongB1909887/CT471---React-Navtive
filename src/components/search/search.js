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
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../Loading';

const img =
  'http://192.168.1.9/magento2/pub/media/catalog/product/cache/80c6d82db34957c21ffe417663cf2776//';

export default function Search({product, navigation, route}) {
  const searchText = route.params.searchText;
  const URL = `http://192.168.1.9:5000/product/list/name?name=${searchText}`;
  const [search, setSearch] = useState([]);
  const loading = useSelector(state => state.product.isLoading);
  const searchUrl = async () => {
    const res = await axios.get(URL);
    setSearch(res.data.product.items);
  };
  useEffect(() => {
    searchUrl();
  }, [searchText]);

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
              <Text style={{fontSize: 16}} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={{fontSize: 14, color: 'green'}} numberOfLines={1}>
                {item.price?.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Text>
              {/* 
              <Text>
                <Icon name="cube" />
                {item.qty} sản phẩm có sẵn
              </Text> */}

              {/*Thêm các thuộc tính khác của sản phẩm tại đây*/}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 16}}>
      <View>
        {/* <Text>co {totalResults} ket qua tim kiem</Text> cuong */}
        <Text>
          Hiển thị {search.length} kết quả phù hợp cho tìm kiếm ' {searchText} '
        </Text>
        <FlatList data={search} renderItem={listItem} />
      </View>
    </View>
  );
}
