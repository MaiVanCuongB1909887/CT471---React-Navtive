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

function Blogs() {
  const posts = [
    {
      id: 1,
      title: 'Bài viết số 1',
      content: 'Nội dung bài viết số 1',
      image: require('../../../assets/post1.jpg'),
    },
    {
      id: 2,
      title: 'Bài viết số 2',
      content: 'Nội dung bài viết số 2',
      image: require('../../../assets/post2.jpg'),
    },
    {
      id: 3,
      title: 'Bài viết số 3',
      content: 'Nội dung bài viết số 3',
      image: require('../../../assets/post3.jpg'),
    },
    {
      id: 4,
      title: 'Bài viết số 4',
      content: 'Nội dung bài viết số 4',
      image: require('../../../assets/post4.webp'),
    },
  ];

  const [numColumns, setNumColumns] = useState(1);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const maxColumns = 4;
    const itemMargin = 10;
    const totalMargin = itemMargin * (maxColumns - 1);
    const itemSize = (screenWidth - totalMargin) / maxColumns;

    setNumColumns(Math.min(posts.length, maxColumns));
    setItemWidth(itemSize);
  }, [posts]);

  function renderItem({item}) {
    return (
      <TouchableOpacity style={[styles.postContainer, {width: itemWidth}]}>
        <Image style={styles.postImage} source={item.image} />
        <Text style={styles.postTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 10}}
    />
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
