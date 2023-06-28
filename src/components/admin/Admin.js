import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addBlog,
  deleteBlog,
  getBlog,
  updateBlog,
} from '../../store/blog/BlogSlice';

const Admin = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blog.blogs);
  const [currentBlog, setCurrentBlog] = useState({title: '', content: ''});
  const [newBlog, setNewBlog] = useState({title: '', content: ''});
  console.log(blogs);
  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  // const handleCreateBlog = async data => {
  //   await dispatch(addBlog(data));
  // };
  // const handleUpdateBlog = async data => {
  //   await dispatch(updateBlog(data));
  // };
  const handleDeleteBlog = async id => {
    await dispatch(deleteBlog(id));
  };

  return (
    <View>
      <Text>Current Blog</Text>
      <FlatList
        data={blogs}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <TextInput
              style={{color: '#000'}}
              placeholder="Title"
              value={item.title}
              onChangeText={text =>
                setCurrentBlog(prev => ({...prev, title: text}))
              }
            />
            <TextInput
              style={{color: '#000'}}
              placeholder="Content"
              value={item.content}
              onChangeText={text =>
                setCurrentBlog(prev => ({...prev, content: text}))
              }
            />
            <Button
              title="Update"
              // onPress={() => handleUpdateBlog(currentBlog)}
            />
            <Button title="Delete" onPress={() => handleDeleteBlog(item.id)} />
          </View>
        )}
      />

      <Text style={{color: '#000'}}>Create Article</Text>
      <TextInput
        style={{color: '#000'}}
        placeholder="Title"
        value={newBlog.title}
        onChangeText={text => setNewBlog(prev => ({...prev, title: text}))}
      />
      <TextInput
        style={{color: '#000'}}
        placeholder="Content"
        value={newBlog.content}
        onChangeText={text => setNewBlog(prev => ({...prev, content: text}))}
      />
      {/* <Button title="Create" onPress={handleCreateBlog(newBlog)} /> */}
    </View>
  );
};

export default Admin;
