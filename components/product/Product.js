import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Product({product, navigation}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const img =
    'http://192.168.1.9/magento2/pub/media/catalog/product/cache/80c6d82db34957c21ffe417663cf2776//';
    useEffect(() => {
      axios
        .get('http://192.168.1.9:5000/product/list1', {
          headers: {
            'Content-Type': 'application/json',
          },
        })
  
        .then(response => {
          setLoading(false);
          setProducts(response.data.product.items);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

 const listItem =({item}) => {
  return(
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
                  <Text
                    style={{fontSize: 14, color: 'green'}}
                    numberOfLines={1}>
                    {item.price?.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </Text>
                  <Text>
                    <Icon name="cube" /> {item.qty} sản phẩm có
                    sẵn
                  </Text>
                  {/*Thêm các thuộc tính khác của sản phẩm tại đây*/}
                </View>
              </View>
            </TouchableOpacity>
  )
  
 }
  return (
    <View style={{flex: 1, paddingHorizontal: 16}}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Text>Sản phẩm nổi bật</Text>
          <FlatList data={products} renderItem={listItem}/>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
