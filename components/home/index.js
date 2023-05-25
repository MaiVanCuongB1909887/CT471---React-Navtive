import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import style from './style';

const Home = () => {
  return (
    <ScrollView>
      <View style={style.container}>
        <ImageBackground
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
    </ScrollView>
  );
};

export default Home;
