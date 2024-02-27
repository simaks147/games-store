'use client'

import { useReducer } from "react";
import styled from "styled-components"
import GamesList from "../GamesList";
import SelectPanel from "../SelectPanel";
import Search from "../Search";
import { gamesReducer, gamestate } from "./reducers/games";
import { GamesContext, GamesDispatchContext } from "./context/GamesContext";
import { PlatformsContext, PlatformsDispatchContext } from "./context/PlatformsContext";
import { platformState, platformsReducer, } from "./reducers/platforms";

const StyledGames = styled.div`
  
`

export default function Games() {
  const [games, gamesDispatch] = useReducer(gamesReducer, gamestate)
  const [platforms, platformsDispatch] = useReducer(platformsReducer, platformState)

  return (
    <StyledGames>
      <GamesContext.Provider value={games}>
        <GamesDispatchContext.Provider value={gamesDispatch}>
          <PlatformsContext.Provider value={platforms}>
            <PlatformsDispatchContext.Provider value={platformsDispatch}>
              <Search />
              <SelectPanel />
              <GamesList />
            </PlatformsDispatchContext.Provider>
          </PlatformsContext.Provider>
        </GamesDispatchContext.Provider>
      </GamesContext.Provider>
    </StyledGames >
  )
}
