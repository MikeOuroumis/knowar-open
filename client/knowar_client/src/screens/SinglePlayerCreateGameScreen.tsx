import React, {useState} from 'react';
import {Text, View, ImageBackground, StyleSheet} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import DropdownComponent from '../components/DropdownComponent';
import {LinearGradient} from 'react-native-linear-gradient';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useFetchTriviaCategories} from '../hooks/useFetchTriviaCategories';
import {COLOR_LIST} from '../constants/colors';
import createGameBG from '../assets/images/lobby_bg2.png';
import {getCategoryInfo} from '../util/categories';
import {useSinglePlayerGameCreation} from '../hooks/useSinglePlayerGameCreation';
import {AuthenticatedScreens, RootStackParamList} from '../types/navigation';

export function SinglePlayerCreateGameScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = useFetchTriviaCategories();

  const categoryId = getCategoryInfo(selectedCategory, categories);

  const {startSinglePlayerGameHandler} =
    useSinglePlayerGameCreation(categoryId);

  return (
    <ImageBackground source={createGameBG} style={styles.backgroundImage}>
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
            onSelectOption={selectedItem => {
              setSelectedCategory(selectedItem);
            }}
          />
          <ButtonComponent
            title="Start Game"
            onPress={startSinglePlayerGameHandler}
            disabled={!selectedCategory}
          />
          <ButtonComponent
            title="Back"
            onPress={() =>
              navigation.navigate(AuthenticatedScreens.MainMenuScreen)
            }
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
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
