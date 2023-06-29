import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateBlog} from '../../store/blog/BlogSlice';

const EditBlog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blog.blogs);
  const [currentBlog, setCurrentBlog] = useState({title: '', content: ''});

  const handleUpdateBlog = async data => {
    await dispatch(updateBlog(data));
  };

  return (
    <View>
      <Text>Current Blog</Text>

      <TextInput
        style={{color: '#000'}}
        placeholder="Title"
        value={item.title}
        onChangeText={text => setCurrentBlog(prev => ({...prev, title: text}))}
      />
      <TextInput
        style={{color: '#000'}}
        placeholder="Content"
        value={item.content}
        onChangeText={text =>
          setCurrentBlog(prev => ({...prev, content: text}))
        }
      />
      <Button title="Update" onPress={() => handleUpdateBlog(currentBlog)} />
    </View>
  );
};

export default EditBlog;
