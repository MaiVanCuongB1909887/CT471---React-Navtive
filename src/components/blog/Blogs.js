import React, {useEffect, useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import blogAPI from '../services/blogAPI';
import axios from 'axios';
function Blogs({navigation}) {
  //   const posts = [
  //     {
  //       id: 1,
  //       title: 'Bài viết số 1',
  //       content: 'Nội dung bài viết số 1',
  //       image: require('../../../assets/post1.jpg'),
  //     },
  //     {
  //       id: 2,
  //       title: 'Bài viết số 2',
  //       content: 'Nội dung bài viết số 2',
  //       image: require('../../../assets/post2.jpg'),
  //     },
  //     {
  //       id: 3,
  //       title: 'Bài viết số 3',
  //       content: 'Nội dung bài viết số 3',
  //       image: require('../../../assets/post3.jpg'),
  //     },
  //     {
  //       id: 4,
  //       title: 'Bài viết số 4',
  //       content: 'Nội dung bài viết số 4',
  //       image: require('../../../assets/post4.webp'),
  //     },
  //   ];
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
    return (
      <TouchableOpacity
        style={[styles.postContainer, {width: itemWidth}]}
        key={item.id}
        onPress={() =>
          navigation.navigate('BlogDetails', {
            blogId: item.id,
          })
        }>
        <Image
          style={styles.postImage}
          source={{
            uri:
              'http://192.168.1.9/magento2/pub/media/catalog/blog/' + item.img,
          }}
        />
        <Text style={styles.postTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <Text
        style={{textAlign: 'center', justifyContent: 'center', fontSize: 18}}>
        Tất cả bài viết
      </Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.blog_id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 10}}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
