import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import DropdownComponent from '../components/DropdownComponent';
import {useCreateGame} from '../hooks/useCreateGame';
import {useNavigation} from '@react-navigation/native';
import {useFetchTriviaCategories} from '../hooks/useFetchTriviaCategories';
import createGameBG from '../assets/images/lobby_bg2.png';
import {LinearGradient} from 'react-native-linear-gradient';
import {COLOR_LIST} from '../constants/colors';

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
    <ImageBackground
      source={createGameBG}
      style={{width: '100%', height: '100%'}}>
      <LinearGradient
        colors={[
          'rgba(0,0,0,0.8)',
          'rgba(0,0,0,0.3)',
          'rgba(0,0,0,0.2)',
          'rgba(0,0,0,0.4)',
          'rgba(0,0,0,1)',
        ]}
        style={styles.linearGradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <View style={styles.container}>
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
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  lobbyScreenContainer: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 20,
    borderColor: COLOR_LIST.brightPurple,
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  title: {
    textAlign: 'center',
    padding: 20,
    color: '#fff',
    textShadowColor: COLOR_LIST.brightPurple,
    textShadowRadius: 10,
    marginBottom: 70,
    fontWeight: '400',
    fontSize: 25,
  },
});
