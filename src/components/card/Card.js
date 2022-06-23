import React from 'react'
import "./Card.scss"

export const Card = ({children, className = ''}) => {
 
  return (
    <div className={`card${className ? ` ${className}` : '' }`} >{children}</div>
  )
}
