import { createContext } from 'react';

export const GamesContext = createContext({
  games: {},
  gamesDispatch: () => { }
});