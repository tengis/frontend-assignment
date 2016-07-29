import React from 'react'
import { axisBottom, axisLeft, select } from 'd3'
import classes from './Axis.scss'

class Axis extends React.Component {
  componentDidUpdate () {
    this.renderAxis()
  }

  componentDidMount () {
    this.renderAxis()
  }

  renderAxis () {
    var node = this.refs.axis
    let axis
    if (this.props.orient === 'bottom') {
      axis = axisBottom(this.props.scale)
        .tickSizeInner(-this.props.height)
        .tickSizeOuter(0)
        .tickPadding(10)
    } else {
      axis = axisLeft(this.props.scale)
				.tickSizeInner(-this.props.width)
				.tickSizeOuter(0)
				.tickPadding(10)
    }

    select(node).call(axis)
  }

  render () {
    return <g className={classes.axis} ref='axis' transform={this.props.translate}></g>
  }
}

Axis.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  orient: React.PropTypes.string.isRequired,
  translate: React.PropTypes.string,
  scale: React.PropTypes.func.isRequired
}

export default Axis
