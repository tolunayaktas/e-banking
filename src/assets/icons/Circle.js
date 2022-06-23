import * as React from "react"

const Circle = (props) => (
  <svg
    width={124}
    height={124}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      opacity={0.15}
      cx={62}
      cy={62}
      r={61.5}
      fill="url(#a)"
      stroke="#000"
    />
    <defs>
      <linearGradient
        id="a"
        x1={28}
        y1={47.5}
        x2={104}
        y2={46.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#171A1F" />
        <stop offset={0.318} stopColor="#2D4F5B" />
        <stop offset={0.68} stopColor="#3C6D72" />
        <stop offset={1} stopColor="#BE9497" />
      </linearGradient>
    </defs>
  </svg>
)

export default Circle
