import produce from 'immer'
import ErrorBoundary from 'react-error-boundary'
import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Cursor from './components/cursor.jsx'
import Row from './components/Row.jsx'
import Cell from './components/cell.jsx'

import './app.css';

//initializes a 10x10 vector

const App = () => {
  const [coordinates, updateCoordinates] = useState([0, 0])
  const [data, updateData] = useState(
  new Array(10).fill(new Array(10).fill(false))
      
  )
  
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
    
  }
  
  const moveForward = () => {
    const [x, y] = coordinates
    const cursor = data[x][y]
    
    let newY = y
    let newX = x
    
    const nextMove = {
      up: () => {
        if (x - 1 <= 0) {
          newX = x -1
        } else {
          throw new Error()
        }
      },
      down: () => {
        if (x + 1 < data.length) {
          newX = x +1 
        } else {
          throw new Error()
        }
      },
      right: () => {
        if (y + 1 < data[x].length) {
          newY = y + 1
        } else {
          throw new Error()
        }
      },
      left: () => {
        if (y - 1 <= 0) {
          newY = y - 1
        } else {
           throw new Error()
        }
      },
    }[cursor.direction]
    
    try {
      nextMove()
    } catch {
      turnRight()
    }

    
    updateData(produce(draft => {
      draft[newX][newY] = draft[x][y]
      if (!(newX === x && newY === y)) {
        draft[x][y] = false        
      }
      
    }))
    
    updateCoordinates([newX, newY])
    
  }
  
  
  
  return (
      <div className="App">
        <div className="container">
         {data.map((rows, i) => (
           <div className="row" key={`row-${i}`}>
             {rows.map((item, x) => {
               if (item.isActive) {
                 return (
                   <div
                     className="cell" 
                     key={`cell-${x}${i}`} 
                     id={`cell-${x}${i}`}
                   >
                     <Cursor direction={item.direction} />
                   </div>
                 )
               }
               
               return <Cell />
                
             })}
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

ReactDOM.render(<App />, document.getElementById('root'));
