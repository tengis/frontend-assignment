import React from 'react'

const Circle = (props) => <circle {...props} />

Circle.propTypes = {
  cx: React.PropTypes.number.isRequired,
  cy: React.PropTypes.number.isRequired,
  'r': React.PropTypes.number.isRequired
}

export default Circle
