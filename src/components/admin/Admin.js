import React, {useEffect} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteBlog, getBlogById, getBlog} from '../../store/blog/BlogSlice';

const Admin = ({navigation}) => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blog.blogs);

  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  const handleAddBlog = () => {
    navigation.navigate('AddBlog');
  };
  const handleEditBlog = async id => {
    await dispatch(getBlogById(id));
    navigation.navigate('EditBlog');
  };
  const handleDeleteBlog = async id => {
    await dispatch(deleteBlog(id));
  };

  return (
    <View>
      <Text style={{color: '#000'}}>Quan li bai viet</Text>
      <Button title="Add" onPress={() => handleAddBlog()} />
      <FlatList
        data={blogs}
        keyExtractor={item => item.blog_id}
        renderItem={({item}) => (
          <View>
            <Text style={{color: '#000'}}>{item.title}</Text>
            <Text style={{color: '#000'}}>{item.content}</Text>
            <Button
              title="Update"
              onPress={() => handleEditBlog(item.blog_id)}
            />
            <Button
              title="Delete"
              onPress={() => handleDeleteBlog(item.blog_id)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Admin;
