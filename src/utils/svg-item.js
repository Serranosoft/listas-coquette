import { useEffect, useState } from "react";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"

export default function SvgItem({ width = 100, height = 100, color }) {

    const [original, setOriginal] = useState("rgb(85, 172, 238)");
    const [darken50, setDarken50] = useState("rgb(59, 136, 195)");
    const [darken75, setDarken75] = useState("rgb(34, 102, 153)");

    useEffect(() => {
        if (color) {
            // const rgbString = hexToRgb(color)
            const rgb = extractRGBValues(color);
            if (rgb) {
                const original = `rgb(${rgb[0]}, ${parseInt(rgb[1])}, ${parseInt(rgb[2])})`;
                setOriginal(original);
                setDarken50(darkenRgb(rgb[0], rgb[1], rgb[2], 0.25));
                setDarken75(darkenRgb(rgb[0], rgb[1], rgb[2], 0.4));
            }
        }
    }, [color])

    function extractRGBValues(rgbString) {
        const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
        const match = rgbString.match(regex);

        if (match) {
            return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
        } else {
            return null;
        }
    }

    function darkenRgb(r, g, b, percentage) {
        // Calcular la reducción   
        r = Math.max(0, Math.floor(r * (1 - percentage)));
        g = Math.max(0, Math.floor(g * (1 - percentage)));
        b = Math.max(0, Math.floor(b * (1 - percentage)));
        return `rgb(${r},${g},${b})`;
    }

    return (
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5" style={{ width: width, height: height }}>
            <Defs>
                <ClipPath id="a">
                    <Path d="M0 38h38V0H0v38z" />
                </ClipPath>
            </Defs>
            <G clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
                <Path
                    fill={darken75} // oscuro
                    d="M36 11a4 4 0 00-4-4H6a4 4 0 00-4 4v19.687C2 32.896 7.791 37 10 37h20.625C33.719 37 36 34.687 36 31.625V11z"
                />
                <Path
                    fill="#ccd6dd"
                    d="M34 7a4 4 0 00-4-4H8a4 4 0 00-4 4v24c0 4.119-.021 4 5 4h21a4 4 0 004-4V7z"
                />
                <Path
                    fill="#e1e8ed"
                    d="M32 6a3 3 0 00-3-3H5a3 3 0 00-3 3v24a3 3 0 003 3h24a3 3 0 003-3V6z"
                />
                <Path
                    fill={darken50} // medio oscuro
                    d="M32 5a4 4 0 00-4-4H7a4 4 0 00-4 4v22a4 4 0 004 4h21a4 4 0 004-4V5z"
                />
                <Path
                    fill={original} // color natural
                    d="M30 5a4 4 0 00-4-4H7a4 4 0 00-4 4v20a4 4 0 004 4h19.335C28.544 29 30 27.544 30 25.335V5z"
                />
                <Path
                    fill={darken75} // oscuro
                    d="M7 31c-1.687 0-1.731 1.922-1 2.75.832.941 2.125 1.25 4.438 1.25H12v2H9.281C5.313 37 2 34.5 2 31.625V5a4 4 0 014-4h2v30H7z"
                />
            </G>
        </Svg>
    )
}