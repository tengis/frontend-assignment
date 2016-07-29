import React from 'react'
import classes from './Pin.scss'
import PinIcon from './assets/map-marker-icon.png'

const Pin = (props) => (
  <div className={classes.image}>
    <img src={PinIcon} alt="" />
    <span className={classes.dot}></span>
  </div>
)

// Pin.propTypes = {
//   xCoord: React.PropTypes.number.isRequired,
//   yCoord: React.PropTypes.number.isRequired
// }

export default Pin
