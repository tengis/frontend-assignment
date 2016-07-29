import { connect } from 'react-redux'
import { updateCoords, checkCoords } from '../modules/grid'

import Grid from 'components/Grid'

const mapActionCreators = {
  updateCoords: (coords) => updateCoords(coords),
  checkCoords: () => checkCoords()
}

const mapStateToProps = (state) => ({
  width: 500,
  height: 500,
  margin: 50,
  size: 10,
  message: state.message
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapActionCreators)(Grid)
