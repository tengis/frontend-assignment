import React from 'react'
import Pin from '../Pin'
import classes from './Marker.scss'

const Marker = (props) => {
  return (
    <div className={classes.marker}>
      <div className={classes.position}>
        <span>X : {props.xCoord}</span>
        <span>Y : {props.yCoord}</span>
      </div>
      <Pin />
    </div>
  )
}

Marker.propTypes = {
  xCoord: React.PropTypes.number.isRequired,
  yCoord: React.PropTypes.number.isRequired
}

export default Marker
