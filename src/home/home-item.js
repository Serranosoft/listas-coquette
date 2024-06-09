import { Text, View } from "react-native";
import { borderColor, borderRadius, borderWidth, gap, layout, padding, ui } from "../utils/styles";
import SvgItem from "../utils/svg-item";
import SvgDecoration from "../utils/svg-decoration";

export default function HomeItem({ item }) {

    return (
        <>
            <View style={[layout.flexHalf, layout.alignCenter, gap.medium]}>
                <SvgItem {...{ width: 135, height: 135, color: item.color }} />
                <Text style={[ui.text, ui.black, ui.center]}>{item.title}</Text>
            </View>
        </>

    )
}