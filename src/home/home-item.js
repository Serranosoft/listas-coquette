import { View } from "react-native";
import SvgItem from "./svg";
import { layout } from "../utils/styles";

export default function HomeItem({ item }) {

    return (
        <View style={[layout.flex]}>
            <SvgItem />
        </View>

    )
}