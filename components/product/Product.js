import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
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

  return (
    <View style={{flex: 1, paddingHorizontal: 16}}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={{flex: 1}}>
          <Text>Sản phẩm nổi bật</Text>
          {products.map(product => (
            <TouchableOpacity
              key={product.id}
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  productId: product.sku,
                })
              }>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}
                key={product.id}>
                <Image
                  style={{width: 80, height: 80, marginRight: 16}}
                  source={{
                    uri:
                      img +
                      '' +
                      product.custom_attributes.find(
                        attr => attr.attribute_code === 'image',
                      ).value,
                  }}
                />
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 16}} numberOfLines={1}>
                    {product.name}
                  </Text>
                  <Text
                    style={{fontSize: 14, color: 'green'}}
                    numberOfLines={1}>
                    {product.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </Text>
                  <Text>
                    <Icon name="cube" /> {product.tier_prices.qty} sản phẩm có
                    sẵn
                  </Text>
                  {/*Thêm các thuộc tính khác của sản phẩm tại đây*/}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
