import React, {useEffect} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteBlog, getBlogById, getBlog} from '../../store/blog/BlogSlice';
import {SpeedDial} from '@rneui/themed';

const Admin = ({navigation}) => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blog.blogs);
  const [open, setOpen] = React.useState(false);

  const handleAddBlog = () => {
    navigation.navigate('AddBlog');
    setOpen(false);
  };

  const handleEditBlog = async id => {
    await dispatch(getBlogById(id));
    navigation.navigate('EditBlog');
  };

  const handleDeleteBlog = async id => {
    await dispatch(deleteBlog(id));
  };

  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  return (
    <>
      <View>
        <FlatList
          data={blogs}
          keyExtractor={item => item.blog_id}
          renderItem={({item}) => (
            <View>
              <Text style={{color: '#000'}}>Title: {item.title}</Text>
              <Text style={{color: '#000'}}>Content: {item.content}</Text>
              <TouchableOpacity onPress={() => handleEditBlog(item.blog_id)}>
                <Text
                  style={{
                    color: '#29B1B0',
                    fontWeight: 'bold',
                  }}>
                  <Icon name="pencil-square-o" size={18} /> Update
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteBlog(item.blog_id)}>
                <Text
                  style={{
                    color: '#29B1B0',
                    fontWeight: 'bold',
                  }}>
                  <Icon name="trash" size={18} /> Update
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <SpeedDial
        isOpen={open}
        icon={{name: 'edit', color: '#fff'}}
        openIcon={{name: 'close', color: '#fff'}}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}>
        <SpeedDial.Action
          icon={{name: 'add', color: '#fff'}}
          title="Add"
          onPress={() => handleAddBlog()}
        />
      </SpeedDial>
    </>
  );
};

export default Admin;
