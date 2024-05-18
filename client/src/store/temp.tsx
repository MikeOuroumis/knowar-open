import React, {createContext, useState, useContext} from 'react';

type GameContextType = {
  resetTimerKey: number;
  triggerResetTimer: () => void;
};

export const useGameContext = () => useContext(GameContext);

const GameContext = createContext<GameContextType>({
  resetTimerKey: 0,
  triggerResetTimer: () => {},
});

export const GameProvider = ({children}) => {
  const [resetTimerKey, setResetTimerKey] = useState(0);

  const triggerResetTimer = () => {
    setResetTimerKey(prevKey => prevKey + 1);
  };

  return (
    <GameContext.Provider value={{resetTimerKey, triggerResetTimer}}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
