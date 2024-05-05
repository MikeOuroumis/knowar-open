import {useFetchTriviaCategories} from './useFetchTriviaCategories';
import {Alert} from 'react-native';
import {CategoryInterface} from '../types/category';
import {AuthenticatedScreens, RootStackParamList} from '../types/navigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export function useSinglePlayerGameCreation(
  selectedCategory: CategoryInterface,
) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const categories = useFetchTriviaCategories();

  async function startSinglePlayerGameHandler() {
    try {
      navigation.navigate(AuthenticatedScreens.GameScreen, {
        categoryId: selectedCategory.id,
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
