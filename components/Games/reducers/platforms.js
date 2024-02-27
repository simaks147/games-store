import {
  FETCH_PLATFORMS_FAILURE,
  FETCH_PLATFORMS_REQUEST,
  FETCH_PLATFORMS_SUCCESS,
  SET_PLATFORM,
} from "../const"

export const platformState = {
  entities: [],
  loading: false,
  error: null,
  currentPlatform: ''
}

export const platformsReducer = (platforms, action) => {
  const { type, data, error, platform } = action

  switch (type) {
    case FETCH_PLATFORMS_REQUEST:
      return {
        ...platforms,
        loading: true
      }
    case FETCH_PLATFORMS_SUCCESS:
      return {
        ...platforms,
        entities: data,
        loading: false,
      }
    case FETCH_PLATFORMS_FAILURE:
      return {
        ...platforms,
        loading: false,
        error
      }
    case SET_PLATFORM:
      return {
        ...platforms,
        currentPlatform: +platform
      }
    default:
      return platforms
  }
}