import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View, Pressable} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useFetchTriviaCategories, useCreateGame} from '../hooks';
import {LobbyBg} from '../assets/images';
import {LinearGradient} from 'react-native-linear-gradient';
import {colorList} from '../constants/colors';
import {AuthenticatedScreens, RootStackParamList} from '../types/navigation';
import CategoriesList from '../components/createGame/CategoriesList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ButtonComponent} from '../components';
import {CategoryInterface} from '../types/categories';

type GameScreenRoute = {params: {isSinglePlayer: boolean}};

export default function CreateGameScreen({
  route,
}: {
  route: GameScreenRoute;
}): JSX.Element {
  const {isSinglePlayer} = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
          <Pressable
            style={styles.backButton}
            onPress={() => {
              if (isSinglePlayer) {
                navigation.navigate(AuthenticatedScreens.MainMenuScreen);
              } else {
                navigation.navigate(
                  AuthenticatedScreens.MultiplayerLobbyScreen,
                );
              }
            }}>
            <Icon name="arrow-back" size={30} color={colorList.white} />
          </Pressable>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
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
