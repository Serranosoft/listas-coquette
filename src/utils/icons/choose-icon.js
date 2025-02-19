import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ChooseIcon({ width, height, styles }) {
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.048 2.488a.75.75 0 01-.036 1.06l-4.286 4a.75.75 0 01-1.095-.076l-1.214-1.5a.75.75 0 011.166-.944l.708.875 3.697-3.451a.75.75 0 011.06.036zM11.25 5a.75.75 0 01.75-.75h10a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM8.048 9.488a.75.75 0 01-.036 1.06l-4.286 4a.75.75 0 01-1.095-.076l-1.214-1.5a.75.75 0 111.166-.944l.708.875 3.697-3.451a.75.75 0 011.06.036zM11.25 12a.75.75 0 01.75-.75h10a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zm-3.202 4.488a.75.75 0 01-.036 1.06l-4.286 4a.75.75 0 01-1.095-.076l-1.214-1.5a.75.75 0 111.166-.944l.708.875 3.697-3.451a.75.75 0 011.06.036zM11.25 19a.75.75 0 01.75-.75h10a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                fill="#fff"
            />
        </Svg>
    )
}

export default ChooseIcon
