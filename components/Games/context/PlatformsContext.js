import { createContext } from 'react';

export const PlatformsContext = createContext({
  platforms: {},
  platformsDispatch: () => { }
});
export const PlatformsDispatchContext = createContext(null);