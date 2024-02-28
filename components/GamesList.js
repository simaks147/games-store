'use client'

import { useEffect, useRef, useContext, useCallback } from "react"
import styled from "styled-components"
import GameItem from "./GameItem"
import Flex from "./Flex"
import { fetchGames } from "./Games/asyncActions/games"
import { GamesContext, GamesDispatchContext } from "./Games/context/GamesContext"
import { PlatformsContext } from "./Games/context/PlatformsContext"
import Container from "./Container"

const StyledGameList = styled.div`
    
`

export default function GamesList() {
  const { games, gamesDispatch } = useContext(GamesContext)
  const { platforms } = useContext(PlatformsContext)

  const observer = useRef(null)

  const lastGame = useCallback(node => {
    if (!node) return
    if (games.loading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(onIntersect)

    observer.current.observe(node)
  }, [games.loading])

  useEffect(() => {
    fetchGames(gamesDispatch, {
      currentPlatform: platforms.currentPlatform,
      order: games.order,
      reversed: games.reversed,
      page: 1
    })
  }, [platforms.currentPlatform, games.order, games.reversed])

  const onIntersect = (entries) => {
    if (entries[0].isIntersecting) {
      fetchGames(gamesDispatch, {
        currentPlatform: platforms.currentPlatform,
        order: games.order,
        reversed: games.reversed,
        page: games.page
      })
    }
  }

  return (
    <Container>
      <StyledGameList>
        <Flex $wrap='wrap' $gap={'20px'}>
          {!!games.entities.length && games.entities
            .map((game, index) => <GameItem game={game} key={game.id} ref={index === games.entities.length - 1 ? lastGame : null} />)}
        </Flex>
        {games.error && 'Failed to fetch data'}
        {games.loading && 'Loading...'}
      </StyledGameList>
    </Container>
  )
}
