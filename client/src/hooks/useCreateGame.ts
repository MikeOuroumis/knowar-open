import {AuthContext} from '../store/auth-context';
import {useContext} from 'react';
import {useFetchTriviaCategories} from './useFetchTriviaCategories';
import {Alert} from 'react-native';
import {AuthenticatedScreens, RootStackParamList} from '../types/navigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import * as SocketService from '../services/SocketService';

export const useCreateGame = (
  categoryName: string | null,
  categoryId: string | null,
  isSinglePlayer: boolean,
) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const categories = useFetchTriviaCategories();

  const {userId, userName} = useContext(AuthContext);

  function startSinglePlayerGame() {
    if (!categoryId) {
      Alert.alert('Please select a category.');
      return;
    }

    navigation.navigate(AuthenticatedScreens.GameScreen, {
      categoryId,
      isHost: true,
      isSinglePlayer: true,
    });
  }

  async function createRoom() {
    if (!categoryName || !categoryId) {
      Alert.alert('Please select a category.');
      return;
    }
    try {
      const roomId = await SocketService.createRoom(
        categoryName,
        userId,
        userName,
      );

      if (roomId) {
        navigation.navigate(AuthenticatedScreens.GameScreen, {
          categoryId,
          isHost: true,
          isSinglePlayer,
        });
      } else {
        Alert.alert('Failed to create game room.');
      }
    } catch (error) {
      Alert.alert("Couldn't create game room.");
      console.error("Couldn't create game room.", error);
    }
  }

  return {createRoom, startSinglePlayerGame, categories};
};
