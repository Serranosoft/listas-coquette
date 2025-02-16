import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EditIcon({ width, height, styles }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      styles={styles}
    >
      <Path
        d="M13 21h8M20.065 7.394L7.1 20.411A2 2 0 015.683 21h-1.68A1.007 1.007 0 013 19.992V18.3a2 2 0 01.583-1.412l12.969-13.02c3.011-2.52 6.023 1.008 3.513 3.527zM15.31 5.31l3.417 3.418"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.25}
      />
    </Svg>
  )
}

export default EditIcon
