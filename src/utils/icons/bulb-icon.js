import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { colors } from "../styles"

function BulbIcon({ styles, checked, onPress, decoration, width, height }) {
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.25 18.709c0-.42.336-.76.75-.76h4c.414 0 .75.34.75.76s-.336.76-.75.76h-4a.755.755 0 01-.75-.76zm.667 2.532c0-.42.335-.76.75-.76h2.666c.415 0 .75.34.75.76 0 .419-.335.759-.75.759h-2.666a.755.755 0 01-.75-.76z"
                fill={checked ? colors.dark : "transparent"}
            />
            <Path
                d="M7.41 13.828l1.105 1.053c.31.295.485.707.485 1.137 0 .647.518 1.172 1.157 1.172h3.686c.639 0 1.157-.525 1.157-1.172 0-.43.176-.842.485-1.137l1.104-1.053c1.542-1.48 2.402-3.425 2.41-5.446L19 8.297C19 4.842 15.866 2 12 2S5 4.842 5 8.297v.085c.009 2.021.87 3.966 2.41 5.446z"
                fill={checked ? colors.dark : "transparent"}
            />
        </Svg>
    )
}

export default BulbIcon
