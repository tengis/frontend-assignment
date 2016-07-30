import React from 'react'
import { select, drag, event } from 'd3'
// import classes from './Marker.scss'

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

class Marker extends React.Component {
  componentDidMount () {
    select(this.refs.marker).call(this.handleDrag())
  }
  handleDrag () {
    const props = this.props
    const margin = props.margin
    const obj = {x: margin, y: margin}
    let dot = cartesian(
      add(multiply(rounded(clamped(ref(obj, 'x'), 0, 500), margin), margin), margin),
      add(multiply(rounded(clamped(ref(obj, 'y'), 0, 500), margin), margin), margin))

    return drag()  // capture mouse drag event
      .on('drag', function (d) {
        if (event.defaultPrevented) return
        dot.set([event.x, event.y])
        const coords = dot.get()
        const dataX = (coords[0] - margin * 4) / margin
        const dataY = props.size - (coords[1] - margin * 4) / margin - 3
        if (dataX <= props.size && dataX >= 0 &&
          dataY >= 0 && dataY <= props.size) {
          let coordsObj = {}
          coordsObj[props.name] = [dataX, dataY]
          props.updateCoords(coordsObj)
          select(this)
            .attr('transform', `translate(${coords[0]}, ${coords[1] - 50})`)
        }
      })
  }
  render () {
    const markerPath = 'M0 0c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7' +
                       ' 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z'
    let transform = `translate(${this.props.xCoord},${this.props.yCoord})`
    if (this.props.draggedCoords && this.props.draggedCoords.length) {
      const dataY = (10 - this.props.draggedCoords[1]) * 50
      transform = `translate(${this.props.draggedCoords[0] * 50 + 200},${dataY})`
    }
    return <g className="draggable" ref="marker"
      transform={transform}>
      <path fill={this.props.fill} d={markerPath}></path>
    </g>
  }
}

Marker.propTypes = {
  xCoord: React.PropTypes.number.isRequired,
  yCoord: React.PropTypes.number.isRequired,
  margin: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  fill: React.PropTypes.string.isRequired,
  draggedCoords: React.PropTypes.array
}

export default Marker
