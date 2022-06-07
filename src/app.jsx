import produce from 'immer'
import ReactDOM from 'react-dom';
import React, { 
  useState, 
  useEffect,
} from 'react';

import './app.css';
import Cursor from './cursor.jsx'

const initializeMatrix = (size = 10, fillValue = false) => 
  new Array(size).fill(new Array(size).fill(fillValue))

const rides = ["🏎", "🚲", "🚜", "👩🏽‍🦼", "🏍", "🚕"]

const App = () => {
  const [ride, setRide] = useState(rides[0])
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
  
  const updateRide = (newRide) => () => setRide(newRide)
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
      },
      down: () => {
        if (x + 1 < data.length) {
          return [x + 1, y]
        }
      },
      right: () => {
        if (y + 1 < data.length) {
          return [x, y + 1]
        }
      },
      left: () => {
        if (y - 1 >= 0) {
          return [x, y - 1]
        }
      },
    }[cursor.direction]

    const [newX, newY] = nextMove() || turnRight()

    if (!(newX === x && newY === y)) {
      updateData(produce(draft => {      
        draft[newX][newY] = draft[x][y]
        draft[x][y] = false        
      }))

      updateCoordinates([newX, newY])
    } 
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
                  {
                    item.isActive && (
                      <Cursor 
                        emoji={ride} 
                        direction={item.direction} 
                      />
                    )
                  }
                </div>
             ))}
             </div>
          ))}
        </div>
        <div className="row">
          {rides.map(item => (
            <button
              className="button"
              onClick={updateRide(item)}
            >
              {item}
            </button>
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
