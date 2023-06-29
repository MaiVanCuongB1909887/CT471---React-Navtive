import React, {useEffect, useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import blogAPI from '../services/blogAPI';
import axios from 'axios';
import moment from 'moment';
import Footer from '../footer';

function Blogs({navigation}) {
  const [posts, setPosts] = useState([]);
  const [numColumns, setNumColumns] = useState(1);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    axios
      .get('http://192.168.1.9:5000/blog/list')
      .then(response => {
        setPosts(JSON.parse(response.request._response).result);
      })
      .catch(error => {
        console.error(error);
      });
    const screenWidth = Dimensions.get('window').width;
    const maxColumns = 1;
    const itemMargin = 10;
    const totalMargin = itemMargin * (maxColumns - 1);
    const itemSize = (screenWidth - totalMargin) / maxColumns;

    setNumColumns(Math.min(posts.length, maxColumns));
    setItemWidth(itemSize);
  }, []);

  function renderItem({item}) {
    const createdAtGMT = moment(item.created_at).format('DD/MM/YYYY');

    return (
      <TouchableOpacity
        style={[styles.postContainer, {width: itemWidth}]}
        key={item.id}
        onPress={() =>
          navigation.navigate('BlogDetails', {blogId: item.blog_id})
        }>
        <Image
          style={styles.postImage}
          source={{
            uri:
              'http://192.168.1.9/magento2/pub/media/catalog/blog/' + item.img,
          }}
        />
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.date}>{createdAtGMT}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView>
      <Text style={styles.h1}>Tất cả bài viết</Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.blog_id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 10}}
      />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  h1: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: 'black',
    margin: 10,
  },
  postContainer: {
    marginRight: 10,
  },
  postImage: {
    width: '100%',
    height: 100,
    marginBottom: 5,
  },
  postTitle: {
    fontWeight: 'bold',
  },
});
export default Blogs;
