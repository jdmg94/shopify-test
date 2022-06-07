import produce from 'immer'
import ReactDOM from 'react-dom';
import React, { 
  useState, 
  useEffect, 
  useCallback,
} from 'react';

import './app.css';
import Cursor from './cursor.jsx'

const initializeMatrix = (size = 10, fillValue = false) => 
  new Array(size).fill(new Array(size).fill(fillValue))

const App = () => {
  const [coordinates, updateCoordinates] = useState([0, 0])
  const [data, updateData] = useState(initializeMatrix(10))
    
  useEffect(() => {
    updateData(produce(draft => {
      draft[0][0] = {
        isActive: true,
        direction: "right"
      }
    }))
  }, [])
  
  const turnRight = () => {
    const [x, y] = coordinates
    const cursor = data[x][y]
    
    const nextDirection = {
      right: "down",
      left: "up",
      up: "right",
      down: "left",    
    }[cursor.direction]
        
    updateData(produce(draft => {
      draft[x][y].direction = nextDirection
    }))
    
    return [x, y]
  }
  
  const moveForward = () => {
    const [x, y] = coordinates
    const cursor = data[x][y]

    const nextMove = {
      up: () => {
        if (x - 1 >= 0) {
          return [x - 1, y]
        }
        return turnRight()
      },
      down: () => {
        if (x + 1 < data.length) {
          return [x + 1, y]
        }
        return turnRight()
      },
      right: () => {
        if (y + 1 < data.length) {
          return [x, y + 1]
        }
        return turnRight()
      },
      left: () => {
        if (y - 1 >= 0) {
          return [x, y - 1]
        }
        return turnRight()
      },
    }[cursor.direction]

    const [newX, newY] = nextMove()

    updateData(produce(draft => {      
      if (!(newX === x && newY === y)) {
        draft[newX][newY] = draft[x][y]
        draft[x][y] = false        
      }
    }))
 
    updateCoordinates([newX, newY])
  }

  return (
    <div className="App">
      <div className="container">
        {data.map((rows, x) => (
          <div className="row" key={`row-${x}`}>
            {rows.map((item, y) => (
                <div
                  className="cell" 
                  key={`cell-${x}${y}`}
                >
                 {item.isActive && (<Cursor direction={item.direction} />)}
                </div>
             ))}
             </div>
          ))}
        </div>
        <div className="row">
          <button 
            className="button" 
            onClick={turnRight}
          >
            Turn Right
          </button>
          <button 
            className="button"
            onClick={moveForward}
          >
            Move Forward
          </button>
        </div>
      </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
