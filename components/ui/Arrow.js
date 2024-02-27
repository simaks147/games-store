import styled from "styled-components"
import { IoIosArrowDropdown } from "react-icons/io";
import { useContext } from "react";
import { GamesContext, GamesDispatchContext } from "../Games/context/GamesContext";
import { REVERSE_GAMES } from "../Games/const";

const StyledArrow = styled(IoIosArrowDropdown)`
  rotate: ${props => props.$reversed ? '0deg' : '180deg'};
  height: 24px;
  width: 24px;
  padding: 4px;
  position: absolute;
  right: 10px;
  cursor: pointer;
`

export default function Arrow() {
  const games = useContext(GamesContext)
  const gamesDispatch = useContext(GamesDispatchContext)
  return (
    !!games.order && <StyledArrow onClick={() => gamesDispatch({ type: REVERSE_GAMES, reversed: !games.reversed })}
      $reversed={games.reversed} size={24} />
  )
}
