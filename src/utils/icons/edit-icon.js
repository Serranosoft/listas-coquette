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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.25 22a.75.75 0 01.75-.75h16a.75.75 0 010 1.5H4a.75.75 0 01-.75-.75z"
                fill="#fff"
            />
            <Path
                d="M11.52 14.929l5.917-5.917a8.232 8.232 0 01-2.661-1.787 8.232 8.232 0 01-1.788-2.662L7.07 10.48c-.462.462-.693.692-.891.947a5.24 5.24 0 00-.599.969c-.139.291-.242.601-.449 1.22l-1.088 3.267a.848.848 0 001.073 1.073l3.266-1.088c.62-.207.93-.31 1.221-.45.344-.163.669-.364.969-.598.255-.199.485-.43.947-.891zM19.079 7.37a3.146 3.146 0 00-4.45-4.449l-.71.71.031.09c.26.749.751 1.732 1.674 2.655A7.003 7.003 0 0018.37 8.08l.71-.71z"
                fill="#fff"
            />
        </Svg>
    )
}

export default EditIcon
