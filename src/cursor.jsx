import React, { useState } from 'react'

const to = (direction) => ({
  down: '90deg',
  up: '-90deg',
  right: '0deg',
  left: '180deg',
})[direction]

const flip = (direction) => direction === "left" ? "-1, -1" : "-1, 1"

const Cursor = ({ direction = "right", emoji = "🏎" }) => (
  <span
    style={{
     display: 'flex',     
     transform: `rotate(${to(direction)}) scale(${flip(direction)})`,
    }}
  >
    {emoji}
  </span>
)

export default Cursor
