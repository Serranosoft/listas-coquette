import { Text, TouchableOpacity, View } from "react-native";
import { borderColor, borderRadius, borderWidth, gap, layout, padding, ui } from "../utils/styles";
import SvgItem from "../utils/svg-item";
import SvgDecoration from "../utils/svg-decoration";
import { Link, router } from "expo-router";

export default function HomeItem({ item }) {

    function navigate() {
        router.navigate({ pathname: "/list", params: { id: item.id } });
    }

    return (
        <TouchableOpacity style={[layout.flexHalf, layout.alignCenter, gap.medium]} onPress={navigate}>
            <SvgItem {...{ width: 135, height: 135, color: item.color }} />
            <Text style={[ui.text, ui.black, ui.center]}>{item.title}</Text>
        </TouchableOpacity>
    )
}