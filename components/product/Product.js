import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userAPI from '../../services/userAPI';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../../store/cart/CartReducer';

export default function Product({navigation}) {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cartProduct = JSON.stringify(cart);

  async function addData() {
    await AsyncStorage.setItem('cart_products', cartProduct);
  }
  async function deleteData() {
    await AsyncStorage.removeItem('cart_products');
  }
  // const img =
  //   'http://192.168.1.9/magento2/pub/media/catalog/product/cache/80c6d82db34957c21ffe417663cf2776//';

  // const getProduct = async () => {
  //   try {
  //     const response = await userAPI.getAllProduct();
  //     if (!!response) {
  //       setLoading(false);
  //       setProducts(response.data.product.items);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getProduct();
  // }, []);

  // Test fix data
  const listData = {
    product: {
      items: [
        {
          id: 8,
          sku: '0012',
          name: 'Wifi modem',
          attribute_set_id: 4,
          price: 1000000,
          status: 1,
          visibility: 4,
          type_id: 'virtual',
          created_at: '2023-05-19 03:15:21',
          updated_at: '2023-05-30 08:36:07',
          weight: 0.3,
          extension_attributes: {
            website_ids: [1],
            category_links: [
              {
                position: 0,
                category_id: '2',
              },
              {
                position: 0,
                category_id: '3',
              },
            ],
          },
          product_links: [],
          options: [],
          media_gallery_entries: [
            {
              id: 9,
              media_type: 'image',
              label: null,
              position: 1,
              disabled: false,
              types: ['image', 'small_image', 'thumbnail', 'swatch_image'],
              file: '//w/i/wifi_1_1.jpg',
            },
          ],
          tier_prices: [
            {
              customer_group_id: 32000,
              qty: 10,
              value: 0,
              extension_attributes: {
                website_id: 0,
              },
            },
          ],
          custom_attributes: [
            {
              attribute_code: 'short_description',
              value: '<p>Đây là Wifi Modem..............</p>',
            },
            {
              attribute_code: 'image',
              value: '//w/i/wifi_1_1.jpg',
            },
            {
              attribute_code: 'url_key',
              value: 'wifi-modem',
            },
            {
              attribute_code: 'page_layout',
              value: 'product-full-width',
            },
            {
              attribute_code: 'gift_message_available',
              value: '2',
            },
            {
              attribute_code: 'small_image',
              value: '//w/i/wifi_1_1.jpg',
            },
            {
              attribute_code: 'meta_title',
              value: 'Wifi modem',
            },
            {
              attribute_code: 'options_container',
              value: 'container2',
            },
            {
              attribute_code: 'thumbnail',
              value: '//w/i/wifi_1_1.jpg',
            },
            {
              attribute_code: 'meta_keyword',
              value: 'Wifi modem',
            },
            {
              attribute_code: 'swatch_image',
              value: '//w/i/wifi_1_1.jpg',
            },
            {
              attribute_code: 'meta_description',
              value: 'Wifi modem ',
            },
            {
              attribute_code: 'tax_class_id',
              value: '2',
            },
            {
              attribute_code: 'msrp_display_actual_price_type',
              value: '0',
            },
            {
              attribute_code: 'category_ids',
              value: ['2', '3'],
            },
            {
              attribute_code: 'required_options',
              value: '0',
            },
            {
              attribute_code: 'has_options',
              value: '0',
            },
            {
              attribute_code: 'featured',
              value: '1',
            },
          ],
          qty: 98,
          stock_status: 1,
        },
        {
          id: 9,
          sku: '0012-1',
          name: 'Card Intel XE Graphics',
          attribute_set_id: 4,
          price: 300,
          status: 1,
          visibility: 4,
          type_id: 'virtual',
          created_at: '2023-05-23 09:01:20',
          updated_at: '2023-05-30 08:37:23',
          extension_attributes: {
            website_ids: [1],
            category_links: [
              {
                position: 0,
                category_id: '4',
              },
              {
                position: 0,
                category_id: '5',
              },
            ],
          },
          product_links: [],
          options: [],
          media_gallery_entries: [
            {
              id: 10,
              media_type: 'image',
              label: null,
              position: 1,
              disabled: false,
              types: ['image', 'small_image', 'thumbnail', 'swatch_image'],
              file: '//i/n/intel.jpg',
            },
          ],
          tier_prices: [
            {
              customer_group_id: 32000,
              qty: 10,
              value: 0,
              extension_attributes: {
                website_id: 0,
              },
            },
          ],
          custom_attributes: [
            {
              attribute_code: 'short_description',
              value: '<p>Đây là Card Intel XE Graphics.......</p>',
            },
            {
              attribute_code: 'image',
              value: '//i/n/intel.jpg',
            },
            {
              attribute_code: 'url_key',
              value: 'card-intel-xe-graphics',
            },
            {
              attribute_code: 'page_layout',
              value: 'product-full-width',
            },
            {
              attribute_code: 'gift_message_available',
              value: '2',
            },
            {
              attribute_code: 'small_image',
              value: '//i/n/intel.jpg',
            },
            {
              attribute_code: 'meta_title',
              value: 'Card Intel XE Graphics',
            },
            {
              attribute_code: 'options_container',
              value: 'container2',
            },
            {
              attribute_code: 'thumbnail',
              value: '//i/n/intel.jpg',
            },
            {
              attribute_code: 'meta_keyword',
              value: 'Card Intel XE Graphics',
            },
            {
              attribute_code: 'swatch_image',
              value: '//i/n/intel.jpg',
            },
            {
              attribute_code: 'meta_description',
              value: 'Card Intel XE Graphics ',
            },
            {
              attribute_code: 'tax_class_id',
              value: '2',
            },
            {
              attribute_code: 'msrp_display_actual_price_type',
              value: '0',
            },
            {
              attribute_code: 'category_ids',
              value: ['4', '5'],
            },
            {
              attribute_code: 'required_options',
              value: '0',
            },
            {
              attribute_code: 'has_options',
              value: '0',
            },
            {
              attribute_code: 'featured',
              value: '1',
            },
          ],
          qty: 100,
          stock_status: 1,
        },
        {
          id: 10,
          sku: '0012-2',
          name: 'Modem wifi viettel',
          attribute_set_id: 4,
          price: 50,
          status: 1,
          visibility: 4,
          type_id: 'virtual',
          created_at: '2023-05-25 07:16:08',
          updated_at: '2023-05-30 08:38:13',
          extension_attributes: {
            website_ids: [1],
            category_links: [
              {
                position: 0,
                category_id: '2',
              },
              {
                position: 0,
                category_id: '6',
              },
            ],
          },
          product_links: [],
          options: [],
          media_gallery_entries: [
            {
              id: 11,
              media_type: 'image',
              label: null,
              position: 1,
              disabled: false,
              types: ['image', 'small_image', 'thumbnail', 'swatch_image'],
              file: '//m/o/modem_wifi_4_cong.jpg',
            },
          ],
          tier_prices: [
            {
              customer_group_id: 32000,
              qty: 10,
              value: 0,
              extension_attributes: {
                website_id: 0,
              },
            },
          ],
          custom_attributes: [
            {
              attribute_code: 'short_description',
              value: '<p>Đây là Modem wifi viettel</p>',
            },
            {
              attribute_code: 'image',
              value: '//m/o/modem_wifi_4_cong.jpg',
            },
            {
              attribute_code: 'url_key',
              value: 'modem-wifi-viettel',
            },
            {
              attribute_code: 'page_layout',
              value: 'product-full-width',
            },
            {
              attribute_code: 'gift_message_available',
              value: '2',
            },
            {
              attribute_code: 'small_image',
              value: '//m/o/modem_wifi_4_cong.jpg',
            },
            {
              attribute_code: 'meta_title',
              value: 'Modem wifi viettel',
            },
            {
              attribute_code: 'options_container',
              value: 'container2',
            },
            {
              attribute_code: 'thumbnail',
              value: '//m/o/modem_wifi_4_cong.jpg',
            },
            {
              attribute_code: 'meta_keyword',
              value: 'Modem wifi viettel',
            },
            {
              attribute_code: 'swatch_image',
              value: '//m/o/modem_wifi_4_cong.jpg',
            },
            {
              attribute_code: 'meta_description',
              value: 'Modem wifi viettel ',
            },
            {
              attribute_code: 'tax_class_id',
              value: '0',
            },
            {
              attribute_code: 'msrp_display_actual_price_type',
              value: '0',
            },
            {
              attribute_code: 'category_ids',
              value: ['2', '6'],
            },
            {
              attribute_code: 'required_options',
              value: '0',
            },
            {
              attribute_code: 'has_options',
              value: '0',
            },
            {
              attribute_code: 'featured',
              value: '0',
            },
          ],
          qty: 98,
          stock_status: 1,
        },
        {
          id: 11,
          sku: '123',
          name: 'Nấm Mối Đen Loại 1',
          attribute_set_id: 4,
          price: 100900,
          status: 1,
          visibility: 4,
          type_id: 'simple',
          created_at: '2023-05-31 02:55:01',
          updated_at: '2023-05-31 02:55:01',
          weight: 12,
          extension_attributes: {
            website_ids: [1],
            category_links: [
              {
                position: 0,
                category_id: '3',
              },
            ],
          },
          product_links: [],
          options: [],
          media_gallery_entries: [
            {
              id: 12,
              media_type: 'image',
              label: null,
              position: 1,
              disabled: false,
              types: ['image', 'small_image', 'thumbnail', 'swatch_image'],
              file: '//n/a/nam-moi-den-tuoi-4.jpg',
            },
          ],
          tier_prices: [],
          custom_attributes: [
            {
              attribute_code: 'short_description',
              value: '<p>Nam moi den loai 1 ngon</p>',
            },
            {
              attribute_code: 'image',
              value: '//n/a/nam-moi-den-tuoi-4.jpg',
            },
            {
              attribute_code: 'url_key',
              value: 'nm-mi-den-loi-1',
            },
            {
              attribute_code: 'page_layout',
              value: 'product-full-width',
            },
            {
              attribute_code: 'gift_message_available',
              value: '2',
            },
            {
              attribute_code: 'small_image',
              value: '//n/a/nam-moi-den-tuoi-4.jpg',
            },
            {
              attribute_code: 'meta_title',
              value: 'Nấm Mối Đen Loại 1',
            },
            {
              attribute_code: 'options_container',
              value: 'container2',
            },
            {
              attribute_code: 'thumbnail',
              value: '//n/a/nam-moi-den-tuoi-4.jpg',
            },
            {
              attribute_code: 'meta_keyword',
              value: 'Nấm Mối Đen Loại 1',
            },
            {
              attribute_code: 'swatch_image',
              value: '//n/a/nam-moi-den-tuoi-4.jpg',
            },
            {
              attribute_code: 'meta_description',
              value: 'Nấm Mối Đen Loại 1 ',
            },
            {
              attribute_code: 'tax_class_id',
              value: '2',
            },
            {
              attribute_code: 'msrp_display_actual_price_type',
              value: '0',
            },
            {
              attribute_code: 'category_ids',
              value: ['3'],
            },
            {
              attribute_code: 'required_options',
              value: '0',
            },
            {
              attribute_code: 'has_options',
              value: '0',
            },
            {
              attribute_code: 'featured',
              value: '0',
            },
          ],
          qty: 19,
          stock_status: 1,
        },
        {
          id: 12,
          sku: '123-1',
          name: 'Nấm Mối Đen Loại 2',
          attribute_set_id: 4,
          price: 200000,
          status: 1,
          visibility: 4,
          type_id: 'simple',
          created_at: '2023-05-31 02:58:47',
          updated_at: '2023-06-02 09:24:58',
          weight: 15,
          extension_attributes: {
            website_ids: [1],
            category_links: [
              {
                position: 0,
                category_id: '6',
              },
            ],
          },
          product_links: [],
          options: [],
          media_gallery_entries: [
            {
              id: 13,
              media_type: 'image',
              label: null,
              position: 1,
              disabled: false,
              types: ['image', 'small_image', 'thumbnail', 'swatch_image'],
              file: '//n/a/nam-moi-den-tuoi.jpg',
            },
          ],
          tier_prices: [],
          custom_attributes: [
            {
              attribute_code: 'short_description',
              value: '<p>asdasdsadcad</p>',
            },
            {
              attribute_code: 'image',
              value: '//n/a/nam-moi-den-tuoi.jpg',
            },
            {
              attribute_code: 'url_key',
              value: 'nm-mi-den-loi-2',
            },
            {
              attribute_code: 'page_layout',
              value: 'product-full-width',
            },
            {
              attribute_code: 'gift_message_available',
              value: '2',
            },
            {
              attribute_code: 'small_image',
              value: '//n/a/nam-moi-den-tuoi.jpg',
            },
            {
              attribute_code: 'meta_title',
              value: 'Nấm Mối Đen Loại 2',
            },
            {
              attribute_code: 'options_container',
              value: 'container2',
            },
            {
              attribute_code: 'thumbnail',
              value: '//n/a/nam-moi-den-tuoi.jpg',
            },
            {
              attribute_code: 'meta_keyword',
              value: 'Nấm Mối Đen Loại 2',
            },
            {
              attribute_code: 'swatch_image',
              value: '//n/a/nam-moi-den-tuoi.jpg',
            },
            {
              attribute_code: 'meta_description',
              value: 'Nấm Mối Đen Loại 2 ',
            },
            {
              attribute_code: 'tax_class_id',
              value: '2',
            },
            {
              attribute_code: 'msrp_display_actual_price_type',
              value: '0',
            },
            {
              attribute_code: 'category_ids',
              value: ['6'],
            },
            {
              attribute_code: 'required_options',
              value: '0',
            },
            {
              attribute_code: 'has_options',
              value: '0',
            },
            {
              attribute_code: 'featured',
              value: '0',
            },
          ],
          qty: 0,
          stock_status: 0,
        },
      ],
      search_criteria: {
        filter_groups: [],
      },
      total_count: 5,
    },
  };

  useEffect(() => {
    setProducts(listData.product.items);
    setLoading(false);
  }, [cart]);

  const addItemToCart = item => {
    addData();
    dispatch(addToCart(item));
  };
  const removeItemFromCart = item => {
    dispatch(removeFromCart(item));
  };
  // const increaseQuantity = item => {
  //   dispatch(incrementQuantity(item));
  // };
  // const decreaseQuantity = item => {
  //   if (item.quantity == 1) {
  //     dispatch(removeFromCart(item));
  //   } else {
  //     dispatch(decrementQuantity(item));
  //   }
  // };

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
          {/* <Image
            style={{width: 80, height: 80, marginRight: 16}}
            source={{
              uri:
                img +
                '' +
                item.custom_attributes.find(
                  attr => attr.attribute_code === 'image',
                ).value,
            }}
          /> */}
          <Image
            style={{width: 80, height: 80, marginRight: 16}}
            src={'https://static.alphacoders.com/alpha_system_360.png'}
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
            <Button
              title={'REMOVE FROM CART'}
              onPress={() => removeItemFromCart(item)}
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                marginVertical: 10,
                padding: 5,
              }}
            />
          ) : (
            <Button
              title={'ADD TO CART'}
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                marginVertical: 10,
                padding: 5,
              }}
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
        <Text style={{color: '#000'}}>Loading...</Text>
      ) : (
        <View style={{flex: 1}}>
          <Text>Sản phẩm nổi bật</Text>

          <FlatList data={products} renderItem={listItem} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
