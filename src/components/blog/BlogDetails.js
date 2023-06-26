import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import {useRoute} from '@react-navigation/native';

export default function BlogDetails() {
  const route = useRoute();
  const [blog, setBlog] = useState({});

  const getBlogDetail = async id => {
    try {
      const response = await axios.get(
        `http://192.168.1.9:5000/blog/detail/${id}`,
      );
      setBlog(JSON.parse(response.request._response).result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const id = route.params.id;
    getBlogDetail(id);
  }, []);

  if (!blog) {
    return null;
  }
  const createdAtGMT = moment(blog.created_at).format('DD/MM/YYYY');

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{blog[route.params.id].title}</Text> */}
      <Text style={styles.title}>{route.params.id}</Text>
      <Text style={styles.date}>{createdAtGMT}</Text>
      {/* <Image
        source={{
          uri:
            'http://192.168.1.9/magento2/pub/media/catalog/blog/' +
            blog[route.params.id].img,
        }}
        style={styles.image}
      />
      <Text style={styles.content}>{blog[route.params.id].content}</Text> */}
    </View>
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
