import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { colors } from "../styles"

function FaceIcon({ styles, checked, onPress, decoration, width, height }) {
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
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-3.603-6.447a.75.75 0 011.05-.155c.728.54 1.607.852 2.553.852s1.825-.313 2.553-.852a.75.75 0 11.894 1.204A5.766 5.766 0 0112 17.75a5.766 5.766 0 01-3.447-1.148.75.75 0 01-.156-1.049zM16 10.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5.448-1.5 1-1.5 1 .672 1 1.5zM9 12c.552 0 1-.672 1-1.5S9.552 9 9 9s-1 .672-1 1.5.448 1.5 1 1.5z"
                fill={checked ? colors.dark : "transparent"}
            />
        </Svg>
    )
}

export default FaceIcon
