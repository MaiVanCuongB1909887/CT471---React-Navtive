import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addBlog} from '../../store/blog/BlogSlice';
import {CommonActions} from '@react-navigation/native';

const AddBlog = ({navigation}) => {
  const dispatch = useDispatch();
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    user_id: '',
  });

  const handleCreateBlog = async data => {
    await dispatch(addBlog(data));
    navigation.dispatch(CommonActions.goBack());
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
      <TextInput
        style={{color: '#000'}}
        placeholder="Content"
        value={newBlog.user_id}
        onChangeText={text => setNewBlog(prev => ({...prev, user_id: text}))}
      />
      <Button title="Create" onPress={() => handleCreateBlog(newBlog)} />
    </View>
  );
};

export default AddBlog;
