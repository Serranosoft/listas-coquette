import { ScrollView, Text, View } from "react-native";
import { gap, layout, padding, ui } from "../../src/utils/styles";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getItemsFromListId, getListFromId } from "../../src/utils/storage";
import SvgItem from "../../src/utils/svg-item";

export default function ListPresentation({ list, items }) {

    return (
        <View style={[layout.flex]}>
            {
                list &&
                <View style={[layout.flex, layout.alignCenter, padding.bigTop, gap.medium]}>
                    <SvgItem {...{ width: 135, height: 135, color: list.color }} />
                    <Text style={[ui.h3, ui.black]}>{list.title}</Text>
                    <ScrollView style={{ gap: 16, width: "100%" }} contentContainerStyle={{ alignItems: "center", gap: 16 }}>
                        {
                            items.map((item, index) => {

                                return (
                                    <View>
                                        <Text>{item}</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            }
        </View>
    )
}