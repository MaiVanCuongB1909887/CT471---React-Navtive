import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SearchBar} from 'react-native-elements';

import {StyleSheet, Text, View} from 'react-native';
export default function SearchScreen() {
  const [search, setSearch] = React.useState('');

  const updateSearch = search => {
    setSearch(search);
  };

  return (
    <View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />
      <Text>Search Results</Text>
    </View>
  );
}
