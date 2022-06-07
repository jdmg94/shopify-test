import React, { useState } from 'react'

const to = (direction = "right") => ({
  right: '90deg',
  left: '-90deg',
  up: '0deg',
  down: '180deg',
})[direction]

const Cursor = ({ direction = "right" }) => (
  <span
    style={{
     display: 'flex',     
     transform: `rotate(${to(direction)})`,
    }}
  >
    ☝️
  </span>
)

export default Cursor
