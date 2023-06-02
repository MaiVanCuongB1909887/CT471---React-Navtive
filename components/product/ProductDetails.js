import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import userAPI from '../../services/userAPI';

export default function ProductDetails({route}) {
  const [product, setProduct] = useState(null);
  const sku = route.params.productId;
  const checkProduct = product ? true : false;

  const img =
    'http://192.168.1.9/magento2/pub/media/catalog/product/cache/80c6d82db34957c21ffe417663cf2776//';
  useEffect(() => {
    axios
      .get(`http://192.168.1.9:5000/product/${sku}`)
      .then(response => {
        const productData = response.data;
        setProduct(productData);
        // console.log(productData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
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
            Tình trạng: {product.product.status == 1 ? 'Còn hàng' : 'Hết hàng'}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '50%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
