import React from 'react'
import "./button.scss"

export const Button = ({ size = "full", color = "primary", rounded = false, children, className, ...props }) => {

  const typeClass = `button--${color}`
  const sizeClass = `button--${size}`
  const roundedClass = rounded ? `button--rounded` : ''
  return (
    <button className={`button ${typeClass} ${sizeClass} ${roundedClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

