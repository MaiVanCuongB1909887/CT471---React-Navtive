import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import {useRoute} from '@react-navigation/native';

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
        <Text style={styles.title}>{blog[0]?.title}</Text>
        <Text style={styles.date}>{createdAtGMT}</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
  },
  date: {
    color: 'gray',
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
  },
});
