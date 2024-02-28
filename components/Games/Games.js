'use client'

import { useReducer } from "react";
import styled from "styled-components"
import GamesList from "../GamesList";
import SelectPanel from "../SelectPanel";
import Search from "../Search";
import { gamesReducer, gamestate } from "./reducers/games";
import { GamesContext } from "./context/GamesContext";
import { PlatformsContext } from "./context/PlatformsContext";
import { platformState, platformsReducer, } from "./reducers/platforms";

const StyledGames = styled.div`
  
`

export default function Games() {
  const [games, gamesDispatch] = useReducer(gamesReducer, gamestate)
  const [platforms, platformsDispatch] = useReducer(platformsReducer, platformState)

  return (
    <StyledGames>
      <GamesContext.Provider value={{ games, gamesDispatch }}>
        <PlatformsContext.Provider value={{ platforms, platformsDispatch }}>
          <Search />
          <SelectPanel />
          <GamesList />
        </PlatformsContext.Provider>
      </GamesContext.Provider>
    </StyledGames >
  )
}
