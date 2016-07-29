import React, { Component, PropTypes } from 'react'
// import Square from './Square'
import { canMoveKnight, moveKnight } from '../Grid'
import { ItemTypes } from './Constants'
import { DropTarget } from 'react-dnd'

const squareTarget = {
  drop (props) {
    moveKnight(props.x, props.y)
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class Square extends Component {
  render () {
    const { x, y, connectDropTarget, isOver } = this.props
    const black = (x + y) % 2 === 1

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <div>
          {this.props.children}
        </div>
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow'
          }} />
        }
      </div>
    )
  }
}

Square.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isOver: PropTypes.bool.isRequired
}

export default DropTarget('Pin', squareTarget, collect)(Square)
