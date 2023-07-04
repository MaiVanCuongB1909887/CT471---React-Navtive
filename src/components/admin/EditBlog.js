import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateBlog} from '../store/blog/BlogSlice';
import {Input} from 'react-native-elements';

const EditBlog = () => {
  const dispatch = useDispatch();
  // const [selectedFile, setSelectedFile] = useState(null);

  const blog = useSelector(state => state.blog.blog);

  // const handleChange = event => {
  //   setSelectedFile(event.target.files[0]);
  // };

  const blogContent = blog[0]?.content;
  const blogTitle = blog[0]?.title;
  const blogId = blog[0]?.blog_id;
  const blogCreatetime = blog[0]?.created_at;
  const [currentBlog, setCurrentBlog] = useState({
    title: blogContent,
    content: blogTitle,
    blog_id: blogId,
    created_at: blogCreatetime,
  });
  const handleUpdateBlog = async data => {
    if (
      currentBlog ==
      {
        title: blogContent,
        content: blogTitle,
      }
    ) {
      alert('chua thay doi gi het');
    } else {
      await dispatch(updateBlog(data));
    }
  };

  return (
    <View>
      <Text style={{color: '#000'}}>Current Blog</Text>

      <TextInput
        style={{color: '#000'}}
        placeholder="Title"
        value={currentBlog.title}
        onChangeText={text => setCurrentBlog(prev => ({...prev, title: text}))}
      />
      <TextInput
        style={{color: '#000'}}
        placeholder="Content"
        value={currentBlog.content}
        onChangeText={text =>
          setCurrentBlog(prev => ({...prev, content: text}))
        }
      />
      {/* <Input id="fileInput" type="file" onChange={handleChange} /> */}
      <Button title="Update" onPress={() => handleUpdateBlog(currentBlog)} />
    </View>
  );
};

export default EditBlog;
