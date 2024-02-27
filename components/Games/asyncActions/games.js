import {
  FETCH_GAMES_FAILURE,
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_SUCCESS,
  FETCH_MORE_GAMES_REQUEST,
  FETCH_MORE_GAMES_SUCCESS
} from "../const"
import formatURL from "@/utils/formatUrl"

export const fetchGames = async (url, dispatch, state) => {
  dispatch({
    type: FETCH_GAMES_REQUEST,
  })

  try {
    const res = await fetch(formatURL(url))
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

export const fetchMoreGames = async (url, dispatch, state) => {
  dispatch({
    type: FETCH_MORE_GAMES_REQUEST,
  })

  try {
    const res = await fetch(formatURL(url))
    const data = await res.json()

    dispatch({
      type: FETCH_MORE_GAMES_SUCCESS,
      data: data.results
    })
  } catch (error) {
    dispatch({
      type: FETCH_GAMES_FAILURE,
      error
    })
  }
}