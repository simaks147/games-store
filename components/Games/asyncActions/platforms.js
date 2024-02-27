import {
  FETCH_PLATFORMS_FAILURE,
  FETCH_PLATFORMS_REQUEST,
  FETCH_PLATFORMS_SUCCESS,
} from "../const"
import formatURL from "@/utils/formatUrl"

export const fetchPlatforms = async (url, dispatch, state) => {
  dispatch({
    type: FETCH_PLATFORMS_REQUEST,
  })

  try {
    const res = await fetch(formatURL(url))
    const data = await res.json()

    dispatch({
      type: FETCH_PLATFORMS_SUCCESS,
      data: data.results
    })
  } catch (error) {
    dispatch({
      type: FETCH_PLATFORMS_FAILURE,
      error
    })
  }
}