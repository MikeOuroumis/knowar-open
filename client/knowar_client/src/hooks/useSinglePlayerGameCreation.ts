import {useContext} from 'react';
import {useFetchTriviaCategories} from './useFetchTriviaCategories';
import {AuthContext} from '../store/auth-context';

export function useSinglePlayerGameCreation(selectedCategory, navigation) {
  const categories = useFetchTriviaCategories();

  const {userId} = useContext(AuthContext);

  async function startSinglePlayerGameHandler() {
    console.log('startSinglePlayerGameHandler');
    try {
      navigation.navigate('GameScreen', {
        categoryId: selectedCategory.id,
        roomId: userId,
        isHost: true,
        isSinglePlayer: true,
      });
    } catch (error) {
      alert("Couldn't start single player game.");
      console.log("Couldn't start single player game.", error);
    }
  }

  return {startSinglePlayerGameHandler, categories};
}
