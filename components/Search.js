import { API_URL } from "@/const";
import debounce from "@/utils/debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import Container from "./Container";
import styled from "styled-components";
import SearchItem from "./SearchItem";
import Flex from "./Flex";
import Logo from "./ui/Logo";
import Link from "next/link";

const StyledSearch = styled.div`
  position: relative;
  flex-basis: 50%;
  flex-grow: 1; 

  input {
    padding: 10px 15px;
    margin: 0;
    width: 100%;
    border: 1px solid #aaa;
    border-radius: 0.25em;
    font-size: 18px;
    line-height: 1;
    background-color: #fff;
    background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
  }
  .results {
    position: absolute;
    top: calc(100% + 10px);
    box-shadow: 0 0 15px rgba(0,0,0,.15);
    z-index: 1;
    background-color: #fff;
    width: 100%;
  }
  .status {
    position: absolute;
    top: 100%;
  }

  .logo {
    display: none;
    @media ${props => props.theme.media.sm} {
      display: block;
    }
  }
`

export default function Search() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [alreadyWasLoading, setAlreadyWasLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    document.addEventListener('click', onClickDetect)
    return () => document.removeEventListener('click', onClickDetect)
  }, [])

  const searchGames = useCallback(async (url) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(url)
      const data = await res.json()
      setGames(data.results)
      setShowResults(true)

      if (!alreadyWasLoading) setAlreadyWasLoading(true)
    } catch (e) {
      setError(e)
    }
    finally {
      setLoading(false)
    }
  }, [])

  const debauncedSearchGames = useCallback(debounce(searchGames, 1000), [])

  const onClickDetect = (e) => {
    const withinBoundaries = e.composedPath().includes(elementRef.current);
    if (!withinBoundaries) setShowResults(false)
  }

  return (
    <Container>
      <Flex $gap="40px">
        <Link href='/'>
          <Logo />
        </Link>
        <StyledSearch>
          <input onChange={(e) => debauncedSearchGames(`${API_URL}/games?key=${process.env.apiKey}&page=1&page_size=7&search=${e.target.value}`)} />
          {error && <div className="status">Failed to fetch data</div>}
          {!games.length && alreadyWasLoading && <div className="status">No results...</div>}

          {!!games.length && showResults &&
            <div className="results" ref={elementRef}>
              <Flex $direction="column">
                {games.map((game) => <SearchItem game={game} key={game.id} />)}
              </Flex>
            </div>
          }
        </StyledSearch>
      </Flex>
    </Container >
  )
}
