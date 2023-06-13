
import {StyleSheet,FlatList, Text, View, Image,ScrollView,TouchableOpacity,TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import IonIcon from 'react-native-vector-icons/Ionicons';
export default function Search({product, navigation}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productImage, setProductImage] = useState('');
  const [searchText, setSearchText] = useState('');

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
        // console.log(
        //   img + response.data.product.items[0].custom_attributes[0].value,
        // );
        setLoading(false);
        setProducts(response.data.product.items);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchText.toLowerCase())

);
  const checkSearchText = searchText === ""?false:true;
  const check = checkSearchText&!loading ?false:true;
  return (
     
    <View style={{margin:10,flexDirection:'row',borderWidth:1,borderColor:'#c4c7cc',borderRadius:30,alignItems: 'center',justifyContent:'center'}}>
     
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm sản phẩm"
        onChangeText={(text) => setSearchText(text)}
        value={searchText} />

      {check ? (
      <View></View>
      ) : (
        
        <View style={styles.productCard}>
          {filteredProducts.map((product, index) => (
            <TouchableOpacity
              key={product.sku}
              onPress={() => navigation.navigate('ProductDetails', {
                productId: product.sku,
              })}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 16,
                  borderBottomWidth: index === filteredProducts.length - 1 ? 0 : 1,
                }}
                key={product.id}>
                <Image
                  style={{ width: 80, height: 80, marginRight: 16 }}
                  source={{
                    uri: img +
                      '' +
                      product.custom_attributes.find(
                        attr => attr.attribute_code === 'image'
                      ).value,
                  }} />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: 'bold' }}
                    numberOfLines={1}>
                    {product.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: 'gray' }} numberOfLines={1}>
                    {product.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </Text>
                  {/*Thêm các thuộc tính khác của sản phẩm tại đây*/}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      )}
      
      <View style={{marginLeft:'30%',backgroundColor:'#29B1B0',height:35,width:80,
      borderRadius:20,
      alignItems: 'center',
      justifyContent:'center'
      }}>
      <IonIcon name="search" size={20} color={'#000000'}/>
      
    </View>
  
    </View>
   
      
  );
}

const styles = StyleSheet.create({
  productCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical:20,
    color:'black'
  },
  productPrice: {
    paddingHorizontal: 20,
    paddingVertical:10,
    fontSize: 20,
    fontWeight:'bold',
    color: '#888',
  },
  sp:{
    flexDirection:'row',
  },
});
