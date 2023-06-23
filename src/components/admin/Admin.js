import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';

const Admin = () => {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({title: '', content: ''});

  // const getArticles = useCallback(async () => {
  //   const response = await userAPI.getArticles({});
  //   setArticles(response);
  // }, []);

  // useEffect(() => {
  //   getArticles();
  // }, [getArticles]);

  // const handleCreateArticle = useCallback(async () => {
  //   const response = await userAPI.postArticles({title, content});
  //   setArticles([...articles, response]);
  //   setNewArticle({title: '', content: ''});
  // }, [newArticle, articles]);

  // const handleDeleteArticle = useCallback(
  //   async id => {
  //     await userAPI.getArticles();
  //     setArticles(articles.filter(article => article.id !== id));
  //   },
  //   [articles],
  // );

  return (
    <View>
      <Text style={{color: '#000'}}>Create Article</Text>
      <TextInput
        placeholder="Title"
        value={newArticle.title}
        onChangeText={text => setNewArticle(prev => ({...prev, title: text}))}
      />
      <TextInput
        placeholder="Content"
        value={newArticle.content}
        onChangeText={text => setNewArticle(prev => ({...prev, content: text}))}
      />
      <Button
        title="Create"
        // onPress={handleCreateArticle}
      />
      <FlatList
        data={articles}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={{color: '#000'}}>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
            <Button
              title="Delete"
              // onPress={() => handleDeleteArticle(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Admin;
