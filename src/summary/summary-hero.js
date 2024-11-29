import { Text, View } from "react-native";
import { borderRadius,  gap, layout, padding, ui } from "../utils/styles";
import { LangContext } from "../utils/Context";
import { useContext } from "react";


export default function SummaryHero({ completed, pending }) {

    const { language } = useContext(LangContext);

    return (
        <View style={[ui.flex, layout.row, gap.big, padding.mediumHorizontal, padding.bigVertical]}>
            <View style={[layout.alignCenter, layout.backgroundLight, layout.flex, borderRadius.medium, padding.mediumHorizontal, padding.mediumVertical]}>
                <Text style={[ui.h2, ui.center, ui.black]}>{ completed }</Text>
                <Text style={[ui.muted, ui.center, ui.black]}>{language.t("_summaryCompletedTask")}</Text>
            </View>
            <View style={[layout.alignCenter, layout.backgroundLight, layout.flex, borderRadius.medium, padding.mediumHorizontal, padding.mediumVertical]}>
                <Text style={[ui.h2, ui.center, ui.black]}>{ pending }</Text>
                <Text style={[ui.muted, ui.center, ui.black]}>{language.t("_summaryPendingTask")}</Text>
            </View>
        </View>
    )
}