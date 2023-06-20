import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../Loading';
import userAPI from '../../services/userAPI';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../../store/cart/CartReducer';

export default function Product({product, navigation}) {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const img =
    'http://192.168.1.9/magento2/pub/media/catalog/product/cache/80c6d82db34957c21ffe417663cf2776//';

  const getProduct = async () => {
    try {
      const response = await userAPI.getAllProduct();
      if (!!response) {
        setProducts(response.product.items);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [loading]);

  const addItemToCart = item => {
    dispatch(addToCart(item));
  };
  const removeItemFromCart = item => {
    dispatch(removeFromCart(item));
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
          {cart.some(value => value.id == item.id) ? (
            <Icon
              name="close"
              size={40}
              onPress={() => removeItemFromCart(item)}
            />
          ) : (
            <Icon
              name="cart-plus"
              size={40}
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
        <Loading />
      ) : (
        <View style={{flex: 1}}>
          <Text>Sản phẩm nổi bật</Text>

          <FlatList data={products} renderItem={listItem} />
        </View>
        // <View style={{flex: 1}}>
        //   {products.map(product => (
        //     <TouchableOpacity
        //       key={product.id}
        //       onPress={() =>
        //         navigation.navigate('ProductDetails', {
        //           productId: product.sku,
        //         })
        //       }>
        //       <View
        //         style={{
        //           flexDirection: 'row',
        //           alignItems: 'center',
        //           paddingVertical: 10,
        //         }}
        //         key={product.id}>
        //         <Image
        //           style={{width: 80, height: 80, marginRight: 16}}
        //           source={{
        //             uri:
        //               img +
        //               '' +
        //               product.custom_attributes.find(
        //                 attr => attr.attribute_code === 'image',
        //               ).value,
        //           }}
        //         />
        //         <View style={{flex: 1}}>
        //           <Text style={{fontSize: 16}} numberOfLines={1}>
        //             {product.name}
        //           </Text>
        //           <Text
        //             style={{fontSize: 14, color: 'green'}}
        //             numberOfLines={1}>
        //             {product.price.toLocaleString('vi-VN', {
        //               style: 'currency',
        //               currency: 'VND',
        //             })}
        //           </Text>
        //           <Text>
        //             <Icon name="cube" /> {product.qty} sản phẩm có sẵn
        //           </Text>
        //           {/*Thêm các thuộc tính khác của sản phẩm tại đây*/}
        //         </View>
        //       </View>
        //     </TouchableOpacity>
        //   ))}
        // </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
