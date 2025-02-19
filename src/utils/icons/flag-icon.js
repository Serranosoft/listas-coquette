import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { colors } from "../styles"

function FlagIcon({styles, checked, onPress, decoration, width, height}) {
  return (
    <Svg
      width={width || "28px"}
      height={height || "28px"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={styles}
      onPress={onPress}
      stroke={decoration ? "#fff" : checked ? "transparent" : "#696969"}
      strokeWidth={1.5}
    >
      <Path
        d="M5.75 1a.75.75 0 01.75.75V3.6l1.72-.344a8.677 8.677 0 014.925.452l.204.081a7.999 7.999 0 004.91.334 1.2 1.2 0 011.491 1.164v7.367c0 .644-.439 1.206-1.064 1.362l-.214.053a8.677 8.677 0 01-5.327-.361 8.676 8.676 0 00-4.924-.452L6.5 13.6v8.15a.75.75 0 01-1.5 0v-20A.75.75 0 015.75 1z"
        fill={checked ? colors.dark : "transparent"}
      />
    </Svg>
  )
}

export default FlagIcon
