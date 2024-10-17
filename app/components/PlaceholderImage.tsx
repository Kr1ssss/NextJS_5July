import React from 'react'

interface PlaceholderImageProps {
  width: number
  height: number
}

export default function PlaceholderImage({ width, height }: PlaceholderImageProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={width} height={height} fill="#cccccc" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#999999"
        fontSize="14"
      >
        {width}x{height}
      </text>
    </svg>
  )
}