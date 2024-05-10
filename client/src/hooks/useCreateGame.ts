import {AuthContext} from '../store/auth-context';
import socket from '../socket/socket';
import {apiUrl} from '../config';
import axios from 'axios';
import {useContext} from 'react';
import {useFetchTriviaCategories} from './useFetchTriviaCategories';
import {Alert} from 'react-native';
import {AuthenticatedScreens, RootStackParamList} from '../types/navigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';

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
      const response = await axios.post(`${apiUrl}/create-room`, {
        category: categoryName,
        userId: userId,
        userName,
      });

      if (response.data && response.data.status === 'ok') {
        socket.emit('create_room', {
          roomId: userId,
          userName: userName,
          category: categoryName,
        });

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
      console.log("Couldn't create game room.", error);
    }
  }

  return {createRoom, startSinglePlayerGame, categories};
};
