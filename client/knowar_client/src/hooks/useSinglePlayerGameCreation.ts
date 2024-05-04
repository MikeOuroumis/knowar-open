import {useContext} from 'react';
import {useFetchTriviaCategories} from './useFetchTriviaCategories';
import {AuthContext} from '../store/auth-context';
import {Alert} from 'react-native';
import {CategoryInterface} from '../types/category';
import {AuthenticatedScreens} from '../types/navigation';

export function useSinglePlayerGameCreation(
  selectedCategory: CategoryInterface,
  navigation: any,
) {
  const categories = useFetchTriviaCategories();

  const {userId} = useContext(AuthContext);

  async function startSinglePlayerGameHandler() {
    try {
      navigation.navigate(AuthenticatedScreens.GameScreen, {
        categoryId: selectedCategory.id,
        roomId: userId,
        isHost: true,
        isSinglePlayer: true,
      });
    } catch (error) {
      Alert.alert("Couldn't start single player game.");
      console.log("Couldn't start single player game.", error);
    }
  }

  return {startSinglePlayerGameHandler, categories};
}
