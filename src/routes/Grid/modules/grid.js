import { isEqual } from 'lodash/fp'
// ------------------------------------
// Constants
// ------------------------------------
export const SET_DRAGGED_COORDS = 'SET_DRAGGED_COORDS'
export const CHECK_COORDS = 'CHECK_COORDS'
export const RESET = 'RESET'

// ------------------------------------
// Actions
// ------------------------------------
export function setDraggedCoords (coordsObj) {
  return {
    type: SET_DRAGGED_COORDS,
    payload: coordsObj
  }
}

export function checkCoords () {
  return {
    type: CHECK_COORDS
  }
}

export function reset () {
  return {
    type: RESET
  }
}

export const actions = {
  setDraggedCoords,
  checkCoords
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RESET]: (state, action) => {
    return {
      ...state,
      draggedCoords: {},
      results: []
    }
  },
  [SET_DRAGGED_COORDS]: (state, action) => {
    return {
      ...state,
      draggedCoords: {
        ...state.draggedCoords,
        ...action.payload
      }
    }
  },
  [CHECK_COORDS]: (state, action) => {
    let results = []
    state.markers.forEach(marker => {
      const draggedCoords = state.draggedCoords
      let draggedCoord
      if (draggedCoords.hasOwnProperty(marker.name)) {
        draggedCoord = state.draggedCoords[marker.name]
      }
      if (!isEqual(draggedCoord, marker.correctCoords)) {
        results.push(`${marker.name} - wrong coordinate`)
      }
    })
    return {
      ...state,
      results
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  results: [],
  width: 500,
  height: 500,
  margin: 50,
  size: 10,
  draggedCoords: {},
  markers: [
    {
      name: 'blue',
      fill: 'hsla(204, 70%, 53%, 1)',
      xCoord: 125,
      yCoord: 0,
      xText: 30,
      yText: 45,
      correctCoords: [3, 6]
    },
    {
      name: 'purple',
      fill: 'hsla(282, 44%, 47%, 1)',
      xCoord: 125,
      yCoord: 60,
      xText: 30,
      yText: 105,
      correctCoords: [2, 7]
    },
    {
      name: 'orange',
      fill: 'hsla(37, 90%, 51%, 1)',
      xCoord: 125,
      yCoord: 120,
      xText: 30,
      yText: 165,
      correctCoords: [5, 3]
    },
    {
      name: 'red',
      fill: 'hsl(0,50%,50%)',
      xCoord: 125,
      yCoord: 180,
      xText: 30,
      yText: 225,
      correctCoords: [7, 9]
    }
  ]
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
