import React from 'react'
import XYAxis from '../XYAxis'
import Marker from '../Marker'
import Circle from '../Circle'
import { max, scaleLinear, range, drag, event, select } from 'd3'
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
    // const obj = {pos: [200, 50]}
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

    const draggable = drag()  // capture mouse drag event
      .on('drag', () => {
        dot.set([event.x, event.y])
        const coords = dot.get()
        const dataX = (coords[0] - margin) / margin
        const dataY = this.props.size - (coords[1] - margin) / margin
        console.log({x: dataX, y: dataY})
        select('#handle')
          .attr('transform', `translate(${dot.get()})`)
      })
    select('#handle').call(draggable)
  }
  render () {
    const props = this.props
    const data = range(props.size + 1).map((n) => ({x: n, y: n}))
    const d3Props = mainProps({...props, data})
    return (
      <div className='row'>
        <div className='col-sm-3'>
          <Marker xCoord={5} yCoord={6} />
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
                    r={5}
                    key={key}
                  />
                })
              })}
            </g>
            <g id="handle" className="draggable" transform="translate(200,50)">
              <circle className="shadow" r="10"></circle>
              <circle className="circle" r="10" fill="hsl(0,50%,50%)"></circle>
            </g>
          </svg>
        </div>
      </div>
    )
  }
}

Grid.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  size: React.PropTypes.number.isRequired,
  margin: React.PropTypes.number
}

export default Grid
