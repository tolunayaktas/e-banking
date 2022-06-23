import React from 'react'
import "./Select.scss"

export const Select = ({children, value, onChange, className = '',...props}) => {
    const selectClassName  = className ? className : ''
  return (
    <select value={value} onChange={onChange} className={`select ${selectClassName}`} {...props}>
        {children}
    </select>
  )
}
