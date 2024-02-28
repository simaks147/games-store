import {
  FETCH_GAMES_FAILURE,
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_SUCCESS,
  REVERSE_GAMES,
  SORT_GAMES
} from "../const"

export const gamestate = {
  entities: [],
  loading: false,
  error: null,
  order: '',
  reversed: true,
  page: 1
}

export const gamesReducer = (games, action) => {
  const { type, data, error, order, reversed, page } = action

  switch (type) {
    case FETCH_GAMES_REQUEST:
      return {
        ...games,
        loading: true,
        page
      }
    case FETCH_GAMES_SUCCESS:
      return {
        ...games,
        entities: (games.page == 1) ? data : [...games.entities, ...data],
        loading: false,
        page: games.page + 1
      }
    case FETCH_GAMES_FAILURE:
      return {
        ...games,
        loading: false,
        error
      }
    case SORT_GAMES:
      return {
        ...games,
        order
      }
    case REVERSE_GAMES:
      return {
        ...games,
        reversed
      }
    default:
      return games
  }
}