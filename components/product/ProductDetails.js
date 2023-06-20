import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import userAPI from '../../services/userAPI';
import Footer from '../footer';

export default function ProductDetails({route}) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
        // console.log(productData)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (isLoading || !product) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <Text style={{padding: 15, fontSize: 17}}>chưa Phân Loại</Text>
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
              <Text style={styles.price}>
                Giá:{' '}
                {product.product.price.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Text>
              <Text>{product.product.qty} sản phẩm có sẵn</Text>
              <Text style={styles.status}>
                Tình trạng:{' '}
                {product.product.status == 1 ? 'Còn hàng' : 'Hết hàng'}
              </Text>
              <Text style={styles.description}>
                Mô tả:{' '}
                {product.product.custom_attributes
                  .find(attr => attr.attribute_code === 'short_description')
                  .value.slice(3, -4)}
              </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'blue',
  },
  image: {
    width: '95%',
    height: 400,
    resizeMode: 'cover',
    margin: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: '50%',
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
});
