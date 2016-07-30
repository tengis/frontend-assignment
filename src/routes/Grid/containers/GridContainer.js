import { connect } from 'react-redux'
import { setDraggedCoords, checkCoords, reset } from '../modules/grid'

import Grid from 'components/Grid'

const mapActionCreators = {
  updateCoords: (coordsObj) => setDraggedCoords(coordsObj),
  checkCoords: () => checkCoords(),
  reset: () => reset()
}
const mapStateToProps = (state) => ({
  ...state.grid
})

export default connect(mapStateToProps, mapActionCreators)(Grid)
