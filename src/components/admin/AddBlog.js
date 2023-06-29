import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addBlog} from '../../store/blog/BlogSlice';

const AddBlog = () => {
  const dispatch = useDispatch();
  const [newBlog, setNewBlog] = useState({title: '', content: ''});

  const handleCreateBlog = async data => {
    await dispatch(addBlog(data));
  };

  return (
    <View>
      <Text style={{color: '#000'}}>Add Blog</Text>
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
      <Button title="Create" onPress={handleCreateBlog(newBlog)} />
    </View>
  );
};

export default AddBlog;
