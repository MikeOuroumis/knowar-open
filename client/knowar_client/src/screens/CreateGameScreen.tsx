import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import DropdownComponent from '../components/DropdownComponent';
import {useCreateGame} from '../hooks/useCreateGame';
import {useNavigation} from '@react-navigation/native';
import {useFetchTriviaCategories} from '../hooks/useFetchTriviaCategories';

export default function CreateGameScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Track the selected category ID

  const categories = useFetchTriviaCategories();

  const categoriesMap = categories.reduce((categoryMap, category) => {
    categoryMap[category.name] = category.id;
    return categoryMap;
  }, {});

  function getCategoryInfo(categoryName) {
    const categoryId = categoriesMap[categoryName];
    return {id: categoryId, name: categoryName};
  }

  const categoryId = getCategoryInfo(selectedCategory);

  const {createGameHandler} = useCreateGame(categoryId, navigation);

  return (
    <View style={styles.lobbyScreenContainer}>
      <Text style={styles.title}>Choose a category to start the game!</Text>
      <DropdownComponent
        options={categories.map(category => category.name)} // Pass an array of category names as options
        onSelectOption={(selectedItem, index) => {
          setSelectedCategory(selectedItem);
          setSelectedCategoryId(categories[index].id); // Get the ID based on the selected index
        }}
      />
      <ButtonComponent
        title="Start Game"
        onPress={createGameHandler}
        disabled={!selectedCategory}
      />
      <ButtonComponent
        title="Back to Lobby"
        onPress={() => navigation.navigate('MultiplayerLobbyScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lobbyScreenContainer: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    padding: 20,
    color: '#fff',
    marginBottom: 70,
    fontWeight: '400',
    fontSize: 25,
  },
});
