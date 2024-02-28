import { PAGE_SIZE } from "@/const"
import {
  FETCH_GAMES_FAILURE,
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_SUCCESS
} from "../const"
import formatURL from "@/utils/formatUrl"

export const fetchGames = async (dispatch, params) => {
  const { currentPlatform, reversed, order, page } = params
  dispatch({
    type: FETCH_GAMES_REQUEST,
    page
  })

  try {
    const res = await fetch(formatURL(`/api/games?page_size=${PAGE_SIZE}&page=${page}&platforms=${currentPlatform}&ordering=${reversed ? '-' : ''}${order}`))
    const data = await res.json()

    dispatch({
      type: FETCH_GAMES_SUCCESS,
      data: data.results
    })
  } catch (error) {
    dispatch({
      type: FETCH_GAMES_FAILURE,
      error
    })
  }
}