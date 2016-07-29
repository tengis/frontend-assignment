import React from 'react'
import Axis from '../Axis'

export const XYAxis = (props) => {
  const xSettings = {
    translate: `translate(0, ${props.height})`,
    scale: props.xScale,
    orient: 'bottom',
    height: props.height,
    width: props.width
  }
  const ySettings = {
    scale: props.yScale,
    orient: 'left',
    height: props.height,
    width: props.width
  }
  return <g>
    <Axis {...xSettings} />
    <Axis {...ySettings} />
  </g>
}

XYAxis.propTypes = {
  yScale: React.PropTypes.func.isRequired,
  xScale: React.PropTypes.func.isRequired,
  margin: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired
}

export default XYAxis
