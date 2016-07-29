// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_COORDS = 'UPDATE_COORDS'
export const CHECK_COORDS = 'CHECK_COORDS'

// ------------------------------------
// Actions
// ------------------------------------
export function updateCoords (coords) {
  return {
    type: UPDATE_COORDS,
    payload: coords
  }
}

export function checkCoords () {
  return {
    type: CHECK_COORDS
  }
}

export const actions = {
  updateCoords,
  checkCoords
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_COORDS]: (state, action) => {
    return {
      ...state,
      dataX: action.payload.dataX,
      dataY: action.payload.dataY
    }
  },
  [CHECK_COORDS]: (state, action) => {
    let message = 'Wrong coordinates. Please choose corrent coordinates'
    if (state.dataX === state.checkX &&
      state.dataY === state.checkY) {
      message = 'Yeah!. That is correct'
    }
    return {
      ...state,
      message: message
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  checkX: 5,
  checkY: 6,
  message: 'drag the red dot'
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
