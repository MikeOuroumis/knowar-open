import {AuthContext} from '../store/auth-context';
import socket from '../socket/socket';
import {apiUrl} from '../constants/constants';
import axios from 'axios';
import {useContext} from 'react';
import {useFetchTriviaCategories} from './useFetchTriviaCategories';
import {Alert} from 'react-native';
import {AuthenticatedScreens, RootStackParamList} from '../types/navigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export const useCreateGame = (
  selectedCategory: {id: number; name: string} | null,
) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const categories = useFetchTriviaCategories();

  const {userId, userName} = useContext(AuthContext);

  async function createGameHandler() {
    if (!selectedCategory) {
      Alert.alert('Please select a category.');
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/create-room`, {
        category: selectedCategory.name,
        userId: userId,
      });

      if (response.data && response.data.status === 'ok') {
        socket.emit('create_room', {
          roomId: userId,
          userName: userName,
          category: selectedCategory.name,
        });

        navigation.navigate(AuthenticatedScreens.GameScreen, {
          categoryId: selectedCategory.id,
          roomId: userId,
          isHost: true,
          isSinglePlayer: false,
        });
      } else {
        Alert.alert('Failed to create game room.');
      }
    } catch (error) {
      Alert.alert("Couldn't create game room.");
      console.log("Couldn't create game room.", error);
    }
  }

  return {createGameHandler, categories};
};
