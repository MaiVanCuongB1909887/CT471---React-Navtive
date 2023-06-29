import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import {useRoute} from '@react-navigation/native';
import Footer from '../footer';

export default function BlogDetails() {
  const route = useRoute();
  const [blog, setBlog] = useState({});
  const id = route.params.blogId;

  useEffect(() => {
    axios
      .get(`http://192.168.1.9:5000/blog/detail/${id}`)
      .then(response => {
        setBlog(JSON.parse(response.request._response).result);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (!blog) {
    return null;
  }
  const createdAtGMT = moment(blog.created_at).format('DD/MM/YYYY');

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text style={styles.title}>{blog[route.params.id].title}</Text> */}
        <View>
          <Text style={styles.title}>{blog[0]?.title}</Text>
        </View>
        <View
          style={{
            marginBottom: 10,
            backgroundColor: '#d3dbd5',
            width: 100,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Text style={styles.date}>{createdAtGMT}</Text>
        </View>
        <Image
          source={{
            uri:
              'http://192.168.1.9/magento2/pub/media/catalog/blog/' +
              blog[0]?.img,
          }}
          style={styles.image}
        />
        <Text style={styles.content}>{blog[0]?.content}</Text>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  image: {
    borderRadius: 10,
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20,
    color: 'black',
  },
  date: {
    color: 'black',
  },
  content: {
    fontSize: 18,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
});
