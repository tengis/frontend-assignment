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
  componentDidMount () {
    const ref = (obj, prop) => {
      return {
        get: () => { return obj[prop] },
        set: (v) => { obj[prop] = v }
      }
    }
    const cartesian = (x, y) => {
      return {
        get: () => { return [x.get(), y.get()] },
        set: (p) => { x.set(p[0]); y.set(p[1]) }
      }
    }
    const clamped = (m, lo, hi) => {
      return {
        get: () => { return m.get() },
        set: (v) => { m.set(Math.min(hi, Math.max(lo, v))) }
      }
    }

    const add = (m, a) => {
      return {
        get: () => { return m.get() + a },
        set: (v) => { m.set(v - a) }
      }
    }
    const multiply = (m, k) => {
      return {
        get: () => { return m.get() * k },
        set: (v) => { m.set(v / k) }
      }
    }
    const rounded = (m) => {
      return {
        get: () => { return m.get() },
        set: (v) => { m.set(Math.round(v)) }
      }
    }
    const margin = this.props.margin
    const obj = {x: margin, y: margin}
    let dot = cartesian(
      add(multiply(rounded(clamped(ref(obj, 'x'), 0, this.props.width), margin), margin), margin),
      add(multiply(rounded(clamped(ref(obj, 'y'), 0, this.props.width), margin), margin), margin))
    // console.log(dot.get())
    const props = this.props
    const draggable = drag()  // capture mouse drag event
      .on('drag', function (d) {
        if (event.defaultPrevented) return
        dot.set([event.x, event.y])
        const coords = dot.get()
        // const dataX = (coords[0] - margin) / margin
        const dataX = (coords[0] - margin * 4) / margin
        const dataY = props.size - (coords[1] - margin * 4) / margin - 3
        props.updateCoords({dataX: dataX, dataY: dataY})
        if (dataX <= props.size && dataX >= 0 &&
          dataY >= 0 && dataY <= props.size) {
          select(this)
            .attr('transform', `translate(${coords[0]}, ${coords[1] - 50})`)
        }

        // .attr('transform', `translate(${coords[0] + 26}, ${coords[1] - 48})`)
      })
    selectAll('.draggable').call(draggable)
  }
  render () {
    const props = this.props
    const data = range(props.size + 1).map((n) => ({x: n, y: n}))
    const d3Props = mainProps({...props, data})
    const markerPath = 'M0 0c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7' +
                       ' 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z'
    return (
      <div>
        <svg width={props.width + props.margin * 6} height={props.height + props.margin * 6}>
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
          <text x="30" y="45" fill="hsla(204, 70%, 53%, 1)">
            1. x: 1 y: 3
          </text>
          <g className="draggable" transform="translate(125,0)">
            <path fill="hsla(204, 70%, 53%, 1)" d={markerPath}></path>
          </g>
          <text x="30" y="105" fill="hsla(282, 44%, 47%, 1)">
            2. x: 1 y: 3
          </text>
          <g className="draggable" transform="translate(125,60)">
            <path fill="hsla(282, 44%, 47%, 1)" d={markerPath}></path>
          </g>
          <text x="30" y="165" fill="hsla(37, 90%, 51%, 1)">
            3. x: 1 y: 3
          </text>
          <g className="draggable" transform="translate(125,120)">
            <path fill="hsla(37, 90%, 51%, 1)" d={markerPath}></path>
          </g>
          <text x="30" y="225" fill="hsl(0,50%,50%)">
            4. x: 1 y: 3
          </text>
          <g className="draggable" transform="translate(125,180)">
            <path fill="hsl(0,50%,50%)" d={markerPath}></path>
          </g>
        </svg>
      </div>
    )
  }
}

Grid.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  size: React.PropTypes.number.isRequired,
  margin: React.PropTypes.number,
  updateCoords: React.PropTypes.func.isRequired
}

export default Grid
