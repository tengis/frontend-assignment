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
  message: state.grid.message
})

export default connect(mapStateToProps, mapActionCreators)(Grid)
