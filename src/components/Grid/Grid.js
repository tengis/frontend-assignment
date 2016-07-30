import React from 'react'
import XYAxis from '../XYAxis'
import Marker from '../Marker'
import Circle from '../Circle'
import { max, scaleLinear, range, drag, event, select, selectAll } from 'd3'
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

class Grid extends React.Component {
  render () {
    const props = this.props
    const data = range(props.size + 1).map((n) => ({x: n, y: n}))
    const d3Props = mainProps({...props, data})
    return (
      <div>
        <svg width={props.width + props.margin * 6} height={props.height + props.margin * 2}>
          <g className="xy-axis" transform={`translate(${props.margin * 4}, ${props.margin})`}>
            <XYAxis height={props.height} {...d3Props} />
            {range(props.size + 1).map((num) => {
              let cy = 500 - 50 * num
              return data.map((obj, key) => {
                return <Circle cx={obj.x * props.margin}
                  cy={cy}
                  r={5}
                  key={key}
                />
              })
            })}
          </g>

          {this.props.markers.map((marker, i) => (
            <g key={`marker${i}`}>
              <text x={marker.xText} y={marker.yText} fill={marker.fill}>
                {`${i + 1}. x: ${marker.correctCoords[0]} y: ${marker.correctCoords[1]}`}
              </text>
              <Marker {...marker}
                size={this.props.size}
                margin={this.props.margin}
                updateCoords={this.props.updateCoords}
                draggedCoords={this.props.draggedCoords[marker.name]}
              />
            </g>
          ))}

        </svg>
        <div className="text-center">
          {this.props.results.map((msg, i) => <p key={`msg${i}`}>{msg}</p>)}
          <button className="btn btn-primary btn-lg"
            onClick={this.props.checkCoords}>
            Check
          </button>
          <button className="btn btn-default btn-lg"
            onClick={this.props.reset}
            style={{marginLeft: '10px'}}
          >
            Reset
          </button>
        </div>
      </div>
    )
  }
}

Grid.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  size: React.PropTypes.number.isRequired,
  draggedCoords: React.PropTypes.object,
  margin: React.PropTypes.number,
  updateCoords: React.PropTypes.func.isRequired,
  checkCoords: React.PropTypes.func.isRequired,
  reset: React.PropTypes.func.isRequired,
  markers: React.PropTypes.array.isRequired,
  results: React.PropTypes.array
}

export default Grid
