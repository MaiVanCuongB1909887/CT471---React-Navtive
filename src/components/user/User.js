import React, {useEffect, useState} from 'react';
import {Card} from 'react-native-elements';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ImageBackground,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Tab, TabView} from '@rneui/themed';
import {ListItem} from '@rneui/themed';
import {getOrder} from '../store/order/OrderSlice';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

const User = () => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [pick, setPick] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const userDetail = useSelector(state => state.user.userDetail);
  const order = useSelector(state => state.order.order);

  const handleIndex = index => {
    setSelectedIndex(index);
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch(getOrder());
      } catch (error) {
        console.log(error.message, 'day la loi lay order');
      }
    };
    fetchOrder();
  }, []);

  return (
    <ScrollView>
      <Card style={{marginBottom: 30}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ImageBackground
            style={{
              width: '100%',
              height: 300,
              opacity: 0.2,
            }}
            source={require('../../../assets/user1.png')}
            resizeMode="cover"></ImageBackground>
          <View style={styles.headerColumn}>
            <Avatar
              size={100}
              rounded
              title={
                userDetail?.firstname?.slice(0, 1) +
                userDetail?.lastname?.slice(0, 1)
              }
              containerStyle={{backgroundColor: '#3d4db7'}}
            />
            <Text style={styles.userNameText}>
              {userDetail?.firstname + ' ' + userDetail?.lastname}
            </Text>
            <View style={styles.userAddressRow}>
              {/* <View>
                  <Icon
                    name="place"
                    underlayColor="transparent"
                    iconStyle={styles.placeIcon}
                  />
                </View> */}
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}></Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
      <Tab
        style={{marginTop: 15}}
        value={pick}
        onChange={e => {
          setPick(e);
        }}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary">
        <Tab.Item
          title="Chi tiet nguoi dung"
          titleStyle={{fontSize: 18}}
          icon={{name: 'timer', type: 'ionicon', color: 'white'}}
        />
        <Tab.Item
          title="Chi tiet don hang"
          titleStyle={{fontSize: 18}}
          icon={{name: 'cart', type: 'ionicon', color: 'white'}}
        />
      </Tab>
      {pick == 0 && (
        <View style={{marginTop: 20}}>
          <View style={styles.int}>
            <IonIcon name="mail" size={24} color={'#ff483b'} />
            <Text style={styles.intText}>Email: {userDetail?.email}</Text>
          </View>
          <View style={styles.int}>
            <IonIcon name="home" size={24} color={'#3b38ff'} />
            <Text style={styles.intText}>
              City: {userDetail?.addresses[0]?.city}
            </Text>
          </View>
          <View style={styles.int}>
            <IonIcon name="code-download-sharp" size={24} color={'black'} />
            <Text style={styles.intText}>
              Postcode: {userDetail?.addresses[0]?.postcode}
            </Text>
          </View>
          <View style={styles.int}>
            <IonIcon name="earth-sharp" size={24} color={'#41f52a'} />
            <Text style={styles.intText}>
              Region: {userDetail?.addresses[0]?.region.region}
            </Text>
          </View>
          <View style={styles.int}>
            <Icon name="map-marker" size={25} color={'#fa0000'} />
            <Text style={styles.intText}>
              Street: {userDetail?.addresses[0]?.street}
            </Text>
          </View>
          <View style={styles.int}>
            <Icon name="phone" size={24} color={'black'} />
            <Text style={styles.intText}>
              Telephone: {userDetail?.addresses[0]?.telephone}
            </Text>
          </View>
        </View>
      )}

      {pick == 1 &&
        order.map((item, index) => (
          <View>
            <ListItem.Accordion
              content={
                <>
                  <ListItem.Content style={{flexDirection: 'row'}}>
                    <ListItem.Title
                      style={{
                        color: 'black',
                        fontSize: 14,
                        marginLeft: 10,
                        marginRight: 200,
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 5,
                      }}>
                      {index +
                        1 +
                        '   ' +
                        item.billing_address.lastname +
                        ' ' +
                        item.billing_address.firstname +
                        ' '}
                    </ListItem.Title>
                    <ListItem.Title
                      style={{
                        color: '#ff3d47',
                        fontSize: 14,
                        marginLeft: 2,
                        fontWeight: 'bold',
                      }}>
                      {item.status === 'pending'
                        ? 'Chờ xử lý'
                        : item.status === 'confirmed'
                        ? 'Đã xác nhận'
                        : item.status === 'shipped'
                        ? 'Đang vận chuyển'
                        : item.status === 'delivered'
                        ? 'Đã giao hàng'
                        : item.status}
                    </ListItem.Title>
                  </ListItem.Content>
                </>
              }
              icon={{name: 'timer', type: 'ionicon', color: 'black'}}
              isExpanded={selectedIndex == index ? expanded : false}
              onPress={() => handleIndex(index)}>
              {item.items.map((items, index) => (
                <ListItem
                  key={index}
                  topDivider
                  bottomDivider
                  style={{
                    color: 'rgb(28, 28, 30)',
                    fontSize: 14,
                    marginLeft: 2,
                  }}>
                  <ListItem.Content>
                    <ListItem.Subtitle>
                      {items.name + ' x' + items.qty_ordered + ' '}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <Text style={{color: '#0000'}}>
                    {(items.price * items.qty_ordered).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </Text>
                </ListItem>
              ))}
              <ListItem>
                <Text style={{color: '#000'}}>Total: </Text>
                <Text style={{color: '#000'}}>
                  {item.total_due.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}{' '}
                </Text>
              </ListItem>
            </ListItem.Accordion>
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  int: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  intText: {
    color: '#000',
    marginHorizontal: 10,
    fontSize: 20,
  },

  cardContainer: {
    backgroundColor: '#000',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#000',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
    position: 'absolute',
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#000',
  },
  telContainer: {
    backgroundColor: '#000',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#000',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    paddingTop: 40,
    paddingBottom: 8,
    textAlign: 'center',
  },
});
export default User;
