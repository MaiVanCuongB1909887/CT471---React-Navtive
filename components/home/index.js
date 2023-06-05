import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  ImageBackground,
  Image,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import style from './style';
import Footer from '../footer';
import styles from './style';
const Home = () => {
  return (
    <ScrollView>
      <View style={{flex:1,backgroundColor:'white'}}>
      <View style={style.container}>
        <ImageBackground style={style.imageBg}
          source={require('../../assets/imageHeader.webp')}
          resizeMode="cover">
          <View style={style.containerHeader}>
            <Text style={style.headerText}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                Developer World
              </Text>
              {'\n'}
              {'\n'}

              <Text style={{color: '#A7A8B6'}}>
                Welcome to Sony's Developer World! Find everything you need to
                develop for Sony products.
              </Text>
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={{height:110, flex:1,backgroundColor:'#E2E2E2'}}>
    <ScrollView 
     contentContainerStyle={{ flexGrow: 1 }}
     contentOffset={{ x: 0, y: 0 }}
     contentInset={{ top: 0, left: 0, bottom: 0, right: 0 }}
     horizontal={true}
     style={style.Scroll}
    >
      <View style={{borderRadius:5,height:90,width:200,backgroundColor:'#B180B7', marginHorizontal:10, justifyContent:'center',alignItems:'center'}}>
      <IonIcon name='md-search-circle-outline' size={60} color={'white'} />
      <Text>Dễ Dàng Tìm kiếm</Text>
      </View>
      <View style={{borderRadius:5,height:90,width:200,backgroundColor:'#8353FA', marginHorizontal:10, justifyContent:'center',alignItems:'center'}}>
      <IonIcon name='wallet-outline' size={60} color={'white'} />
      <Text>Dễ Dàng Tìm kiếm</Text>
      </View>
      <View style={{borderRadius:5,height:90,width:200,backgroundColor:'#FF727D', marginHorizontal:10, justifyContent:'center',alignItems:'center'}}>
      <IonIcon name='chatbubbles-outline' size={60} color={'white'} />
      <Text>Dễ Dàng Tìm kiếm</Text>
      </View>
      <View style={{borderRadius:5,height:90,width:200,backgroundColor:'#58B1FF', marginHorizontal:10, justifyContent:'center',alignItems:'center'}}>
      <IonIcon name='car-outline' size={60} color={'white'} />
      <Text>Dễ Dàng Tìm kiếm</Text>
      </View>
      <View style={{borderRadius:5,height:90,width:200,backgroundColor:'#FC950B', marginHorizontal:10, justifyContent:'center',alignItems:'center'}}>
      <IonIcon name='calendar-outline' size={60} color={'white'} />
      <Text>Dễ Dàng Tìm kiếm</Text>
      </View>
    
    </ScrollView>
    </View>

      <Text style={style.h1}>Programs</Text>
      <Text style={style.h4}>
        Here are a few of the developer programs that we support. To see all
        programs, please go to <Text style={{fontWeight: '700'}}>Develop</Text>{' '}
        on the top menu.
      </Text>
      <View>
        <Image source={require('../../assets/img1.webp')} style={style.image} />
        <Text style={style.centerText}>Spresense</Text>
      </View>
      <View>
        <Image source={require('../../assets/img2.webp')} style={style.image} />
        <Text style={style.centerText}>ToF AR</Text>
      </View>
      <View>
        <Image source={require('../../assets/img3.webp')} style={style.image} />
        <Text style={style.centerText}>Open Source</Text>
      </View>
      <View>
        <Image source={require('../../assets/img4.webp')} style={style.image} />
        <Text style={style.centerText}>Audio Control API</Text>
      </View>
      <View style={style.containerNews}>
        <Text style={style.h1}>News feed and Articles</Text>
        <Text style={style.h4}>
          Read the latest news and articles related to Sony's Developer World.
        </Text>
        <TouchableOpacity style={style.container}>
          <ImageBackground
            source={require('../../assets/new1.webp')}
            resizeMode="contain"
            style={style.imgNew}>
            <Text
              style={{
                position: 'absolute',
                backgroundColor: 'black',
                top: 235,
                color: 'white',
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              SPRENSENSE
            </Text>
          </ImageBackground>
          <Text style={{marginTop: -30, marginLeft: 10}}>May 10, 2023</Text>
          <Text style={style.title}>
            Announcing Spresense Hackathon at The University of Manchester
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView
       
       contentOffset={{ x: 0, y: 0 }}
       contentInset={{ top: 0, left: 0, bottom: 0, right: 0 }}
       horizontal={false}
       style={style.Scroll}
      >
      </ScrollView>
      
      <Footer/>
      </View>
    </ScrollView>
  );
};

export default Home;
