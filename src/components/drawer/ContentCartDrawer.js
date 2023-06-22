import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useAlert,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {ListItem} from '@rneui/themed';
import colors from '../../constants/colors';
import userAPI from '../../services/userAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToCart, removeItemFromCart} from '../../store/cart/CartActions';

function ContentCartDrawer({navigation}) {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const img =
    'http://192.168.1.9/magento2/pub/media/catalog/product/cache/80c6d82db34957c21ffe417663cf2776//';

  async function cartProducts() {
    return setProducts(cart);
  }

  useEffect(() => {
    cartProducts();
  }, [cart]);

  const totalPrice = () => {
    let totalPrice = 0;
    products.forEach(product => {
      totalPrice += product.price;
    });
    return totalPrice;
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
              <Icon name="cube" />
              {item.qty} sản phẩm có sẵn
            </Text>
            {/* Thêm các thuộc tính khác của sản phẩm tại đây */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <View style={styles.cartInfoContainerTopBar}>
          <View style={styles.cartInfoTopBar}>
            <Text style={{color: '#000'}}>Your Cart</Text>
            <Text style={{color: '#000'}}>{products.length} Items</Text>
          </View>
        </View>
      </View>
      <View style={styles.cartProductListContiainer}>
        <FlatList data={products} renderItem={listItem} />
        <View style={styles.emptyView}></View>
      </View>
      <View style={styles.cartBottomContainer}>
        <View style={styles.cartBottomLeftContainer}>
          <View style={styles.IconContainer}>
            <Icon name="list-alt" size={24} color={colors.primary} />
          </View>
          <View style={{width: 65}}>
            <Text style={styles.cartBottomPrimaryText}>Total</Text>
            <Text style={styles.cartBottomSecondaryText}>
              {totalPrice().toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
          </View>
        </View>
        <View style={styles.cartBottomRightContainer}>
          {products.length > 0 ? (
            <Button
              title={'Checkout'}
              onPress={() => navigation.navigate('Checkout')}
            />
          ) : (
            <Button
              title={'Checkout'}
              disabled={true}
              onPress={() => navigation.navigate('Checkout')}
            />
          )}
        </View>
      </View>
    </View>
  );
}
export default ContentCartDrawer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 0,
    flex: 1,
  },
  topBarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: '600',
  },
  cartProductListContiainer: {width: '100%', padding: 20},
  cartProductListContiainerEmpty: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  secondaryTextSmItalic: {
    fontStyle: 'italic',
    fontSize: 15,
    color: colors.muted,
  },
  cartBottomContainer: {
    position: 'absolute',
    marginTop: '215%',
    width: '100%',
    height: 120,
    display: 'flex',
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 3,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartBottomLeftContainer: {
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    height: '100%',
  },
  cartBottomRightContainer: {
    padding: 25,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    height: '100%',
  },
  cartBottomPrimaryText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cartBottomSecondaryText: {
    minWidth: 100,
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyView: {
    width: '100%',
    height: 20,
  },
  IconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light,
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  cartInfoContainerTopBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartInfoTopBar: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 5,
  },
});
