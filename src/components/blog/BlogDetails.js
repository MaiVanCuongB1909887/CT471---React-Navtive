import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import axios from 'axios';

export default function BlogDetails({route}) {
  const {id} = route.params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://192.168.1.9:5000/blog/detail/${id}`)
      .then(response => setPost(response.data.result))
      .catch(error => console.log(error));
  }, []);

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const {title, img, content, created_at} = post;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{created_at.slice(0, 10)}</Text>
          <Text style={styles.time}>{created_at.slice(11, 16)}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Image
          style={styles.image}
          source={{uri: `http://192.168.1.9:5000/images/${img}`}}
        />
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
    marginRight: 10,
  },
  time: {
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
  },
});
