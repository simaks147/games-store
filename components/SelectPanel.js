import styled from "styled-components"
import Flex from "./Flex"
import Arrow from "./ui/Arrow";
import { useContext, useEffect } from "react";
import { GamesContext, GamesDispatchContext } from "./Games/context/GamesContext"
import { PlatformsContext, PlatformsDispatchContext } from "./Games/context/PlatformsContext";
import { fetchPlatforms } from "./Games/asyncActions/platforms";
import { SET_PLATFORM, SORT_GAMES } from "./Games/const";
import Container from "./Container";

const StyledSelectPanel = styled.div`
  .item {
    width: 100%;
    position: relative;

    @media ${props => props.theme.media.sm} {
      flex-basis: 40%;
      flex-grow: 1;
    }

    @media ${props => props.theme.media.md} {
      max-width: 340px;
    }
  }
  .caption {
    min-width: 70px;
  }
`

const StyledSelector = styled.select`
  appearance: none;
  padding: 5px 10px;
  margin: 0;
  width: 100%;
  border: 1px solid #aaa;
  border-radius: 0.25em;
  font-size: 16px;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
  outline: none;
`

export default function SelectPanel() {
  const gamesDispatch = useContext(GamesDispatchContext)
  const platforms = useContext(PlatformsContext)
  const platformsDispatch = useContext(PlatformsDispatchContext)

  useEffect(() => {
    fetchPlatforms(`/api/platforms`, platformsDispatch, platforms)
  }, [])

  const onChangePlatform = async (e) => {
    platformsDispatch({
      type: SET_PLATFORM,
      platform: e.target.value
    })
  }

  const onSortGames = async (e) => {
    gamesDispatch({
      type: SORT_GAMES,
      order: e.target.value
    })
  }

  return (
    <Container>
      <StyledSelectPanel>
        <Flex $wrap='wrap' $gap="10px 30px">
          <Flex $align={'center'} className="item" $gap="10px">
            <div className="caption">Order by:</div>
            <StyledSelector onChange={onSortGames}>
              <option value=''>None</option>
              <option value='released'>Release date</option>
              <option value='rating'>Rating</option>
              <option value='name'>Name</option>
            </StyledSelector>

            <Arrow />
          </Flex>
          <Flex $align={'center'} className="item" $gap="10px">
            <div className="caption">Platforms:</div>
            <StyledSelector onChange={onChangePlatform} defaultValue={null}>
              <option value=''>All</option>
              {
                !!platforms.entities.length &&
                platforms.entities.map(({ id, name }) => <option key={id} value={id}>{name}</option>)
              }
            </StyledSelector>
          </Flex>
        </Flex>
      </StyledSelectPanel>
    </Container>
  )
}
