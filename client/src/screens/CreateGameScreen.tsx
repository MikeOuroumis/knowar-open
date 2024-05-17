import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {useFetchTriviaCategories, useCreateGame} from '../hooks';
import {LobbyBg} from '../assets/images';
import {LinearGradient} from 'react-native-linear-gradient';
import {colorList} from '../constants/colors';
import CategoriesList from '../components/createGame/CategoriesList';
import {ButtonComponent} from '../components';
import {CategoryInterface} from '../types/categories';

type GameScreenRoute = {params: {isSinglePlayer: boolean}};

export default function CreateGameScreen({
  route,
}: {
  route: GameScreenRoute;
}): JSX.Element {
  const {isSinglePlayer} = route.params;
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryInterface | null>(null);

  const availableCategories = useFetchTriviaCategories();

  const {createRoom, startSinglePlayerGame} = useCreateGame(
    selectedCategory?.name || '',
    selectedCategory?.id || '',
    isSinglePlayer,
  );

  const handleSelectCategory = (category: CategoryInterface) => {
    setSelectedCategory(category);
  };

  return (
    <ImageBackground source={LobbyBg} style={styles.imageBackground}>
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
          <CategoriesList
            categories={availableCategories}
            onCategorySelect={handleSelectCategory}
          />

          <ButtonComponent
            variant="bluish"
            title="Start Game"
            onPress={isSinglePlayer ? startSinglePlayerGame : createRoom}
            disabled={!selectedCategory}
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    textAlign: 'center',
    padding: 20,
    color: '#fff',
    textShadowColor: colorList.brightPurple,
    textShadowRadius: 10,
    fontWeight: '400',
    fontSize: 25,
  },
});
