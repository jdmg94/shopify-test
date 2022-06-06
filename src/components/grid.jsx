import React, { useState } from 'react'

import Row from './Row.jsx'
import Cell from './cell.jsx'
import Cursor from './cursor.jsx'

const Grid = ({ data }) => {
  
  console.log('the data', data[0].length, data[0][0])
  
  return (<Cell><Cursor /></Cell>)
}

export default Grid
