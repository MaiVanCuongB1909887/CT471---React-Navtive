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
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {getCart, changeQtyCart, removeFromCart} from '../store/cart/CartSlice';

function ContentCartDrawer({navigation}) {
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.auth.userToken);
  const cart = useSelector(state => state.cart.cart);
  const loading = useSelector(state => state.cart.isLoading);
  const order = useSelector(state => state.cart.order);

  const img =
    'http://192.168.1.9/magento2/pub/media/catalog/product/cache/80c6d82db34957c21ffe417663cf2776//';

  const totalPrice = () => {
    let totalPrice = 0;
    cart?.forEach(product => {
      totalPrice += product.price * product.qty;
    });
    return totalPrice;
  };
  const removeItemFromCart = item => {
    dispatch(removeFromCart(item.item_id));
  };
  const increaseQty = item => {
    const sku = item.sku;
    let qty = item.qty + 1;
    const item_id = item.item_id;
    const itemInCart = {sku, qty, item_id};
    dispatch(changeQtyCart(itemInCart));
  };
  const decreaseQty = item => {
    const sku = item.sku;
    let qty = 1;
    const item_id = item.item_id;
    item.qty - 1 > 0 ? (qty = item.qty - 1) : qty;
    const itemInCart = {sku, qty, item_id};
    dispatch(changeQtyCart(itemInCart));
  };
  const checkout = () => {
    navigation.navigate('Checkout');
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
          <View style={{flex: 1, marginVertical: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{fontSize: 16, color: '#000', width: 120}}
                numberOfLines={1}>
                {item.name}
              </Text>
              <TouchableOpacity onPress={() => removeItemFromCart(item)}>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    backgroundColor: 'red',
                    borderRadius: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <IonIcon name="close" size={15} color={'#ffffff'} />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{fontSize: 14, color: 'green'}} numberOfLines={1}>
                {item.price?.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => decreaseQty(item)}>
                <View
                  style={{
                    height: 35,
                    width: 40,
                    backgroundColor: '#E9EDF4',
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon name="minus" size={15} color={'#999999'} />
                </View>
              </TouchableOpacity>
              <TextInput
                style={{
                  height: 40,
                  width: 60,
                  backgroundColor: '#ffffff',
                  marginHorizontal: 5,
                  borderRadius: 5,
                }}>
                {item.qty}
              </TextInput>
              <TouchableOpacity onPress={() => increaseQty(item)}>
                <View
                  style={{
                    height: 35,
                    width: 40,
                    backgroundColor: '#E9EDF4',
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon name="plus" size={15} color={'#999999'} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    const fetchCart = async () => {
      try {
        dispatch(getCart());
      } catch (error) {
        console.log(error.message, 'day la loi luc get cart o drawer');
      }
    };
    fetchCart();
  }, [dispatch, userToken, order]);
  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <View style={styles.cartInfoContainerTopBar}>
          <View style={styles.cartInfoTopBar}>
            <Text style={{color: '#000'}}>Your Cart</Text>
            <Text style={{color: '#000'}}>{cart.length} Items</Text>
          </View>
        </View>
      </View>
      <View style={styles.cartProductListContiainer}>
        {cart?.length == 0 ? (
          <Text style={{color: '#000'}}>Gio hang rong</Text>
        ) : (
          <View>
            {!loading ? (
              <Text style={{color: '#000'}}>Loading...</Text>
            ) : (
              <FlatList data={cart} renderItem={listItem} />
            )}
          </View>
        )}
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
          {cart.length > 0 ? (
            <TouchableOpacity onPress={checkout}>
              <View
                style={{
                  width: 100,
                  height: 50,
                  backgroundColor: '#4fe07a',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{color: 'black'}}>CHECKOUT</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <Button title={'Checkout'} disabled onPress={checkout} />
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
