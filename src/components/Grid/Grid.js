import React from 'react'

import XYAxis from '../XYAxis'
import Marker from '../Marker'
import Circle from '../Circle'
import { max, scaleLinear, range } from 'd3'
import classes from './Grid.scss'

const xMax = (data) => max(data, (d) => d.x)
const yMax = (data) => max(data, (d) => d.y)
const xScale = (props) => {
  return scaleLinear()
    .domain([0, xMax(props.data)])
    .range([0, props.width])
}
const yScale = (props) => {
  return scaleLinear()
    .domain([0, yMax(props.data)])
    .range([props.height, 0])
}

const mainProps = (props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) }
  return {
    ...props,
    ...scales
  }
}

export const Grid = (props) => {
  const data = range(props.size + 1).map((n) => ({x: n, y: n}))
  const d3Props = mainProps({...props, data})
  return (
    <div className='row'>
      <div className='col-sm-3'>
        <Marker xCoord={5} yCoord={6} />
        <Marker xCoord={3} yCoord={4} />
        <Marker xCoord={1} yCoord={8} />
        <Marker xCoord={4} yCoord={3} />
      </div>
      <div className={`col-sm-9 ${classes.grid}`}>
        <svg width={props.width + props.margin * 2} height={props.height + props.margin * 2}>
          <g className="xy-axis" transform={`translate(${props.margin}, ${props.margin})`}>
            <XYAxis height={props.height} {...d3Props} />
            {range(props.size + 1).map((num) => {
              let cy = 500 - 50 * num
              return data.map((obj, key) => {
                return <Circle cx={obj.x * props.margin}
                  cy={cy}
                  data-x={obj.x}
                  data-y={10 - (props.width / props.margin - num)}
                  r={5}
                  key={key}
                />
              })
            })}
          </g>
        </svg>
      </div>
    </div>
  )
}

Grid.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  size: React.PropTypes.number.isRequired,
  margin: React.PropTypes.number
}

export default Grid
