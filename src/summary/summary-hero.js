import { Text, View } from "react-native";
import { borderRadius,  gap, layout, padding, ui } from "../utils/styles";


export default function SummaryHero({ completed, pending }) {

    return (
        <View style={[ui.flex, layout.row, gap.big, padding.mediumHorizontal, padding.bigVertical]}>
            <View style={[layout.alignCenter, layout.backgroundLight, layout.flex, borderRadius.medium, padding.mediumHorizontal, padding.mediumVertical]}>
                <Text style={[ui.h2, ui.center, ui.black]}>{ completed }</Text>
                <Text style={[ui.muted, ui.center, ui.black]}>Tareas completadas</Text>
            </View>
            <View style={[layout.alignCenter, layout.backgroundLight, layout.flex, borderRadius.medium, padding.mediumHorizontal, padding.mediumVertical]}>
                <Text style={[ui.h2, ui.center, ui.black]}>{ pending }</Text>
                <Text style={[ui.muted, ui.center, ui.black]}>Tareas pendientes</Text>
            </View>
        </View>
    )
}