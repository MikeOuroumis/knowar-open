import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {DropdownComponent, ButtonComponent} from '../components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useFetchTriviaCategories, useCreateGame} from '../hooks';
import {LobbyBg} from '../assets/images';
import {LinearGradient} from 'react-native-linear-gradient';
import {colorList} from '../constants/colors';
import {AuthenticatedScreens, RootStackParamList} from '../types/navigation';

type GameScreenRoute = {params: {isSinglePlayer: boolean}};

export default function CreateGameScreen({
  route,
}: {
  route: GameScreenRoute;
}): JSX.Element {
  const {isSinglePlayer} = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  const availableCategories = useFetchTriviaCategories();

  const {createRoom, startSinglePlayerGame} = useCreateGame(
    selectedCategoryName,
    selectedCategoryId,
    isSinglePlayer,
  );

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
          <Text style={styles.title}>Choose a category to start the game!</Text>
          <DropdownComponent
            options={availableCategories.map(category => category.name)}
            onSelectOption={(selectedItem, index) => {
              setSelectedCategoryName(selectedItem);
              setSelectedCategoryId(availableCategories[index].id);
            }}
          />
          <ButtonComponent
            title="Start Game"
            onPress={isSinglePlayer ? startSinglePlayerGame : createRoom}
            disabled={!selectedCategoryName}
          />
          {isSinglePlayer && (
            <ButtonComponent
              title="Back to main menu"
              onPress={() =>
                navigation.navigate(AuthenticatedScreens.MainMenuScreen)
              }
            />
          )}
          {!isSinglePlayer && (
            <ButtonComponent
              title="Back to Lobby"
              onPress={() =>
                navigation.navigate(AuthenticatedScreens.MultiplayerLobbyScreen)
              }
            />
          )}
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
    justifyContent: 'center',
    paddingBottom: 20,
    borderColor: colorList.brightPurple,
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
    textShadowColor: colorList.brightPurple,
    textShadowRadius: 10,
    marginBottom: 70,
    fontWeight: '400',
    fontSize: 25,
  },
});
