import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, gap, layout, padding, ui } from "../../src/utils/styles";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getItemsFromListId, getListFromId } from "../../src/utils/storage";
import SvgItem from "../../src/utils/svg-item";
import ListAddItem from "./list-add-item";
import ListItem from "./list-item";

export default function ListPresentation({ getChecklist, setItems, items, list }) {

    console.log(items);
    return (
        <View style={[layout.flex]}>
            {
                list &&
                <View style={[layout.flex, layout.alignCenter, padding.bigTop, gap.medium]}>
                    <SvgItem {...{ width: 135, height: 135, color: list.color }} />
                    <Text style={[ui.h3, ui.black]}>{list.title}</Text>

                    <ListAddItem {...{ getChecklist, list, setItems }} />

                    <View style={styles.checkboxList}>
                        <ScrollView style={{ gap: 16, width: "100%", marginVertical: 8 }} contentContainerStyle={{ gap: 8}}>
                            {
                                items.length > 0 ?
                                    items.map((item) => {
                                        return <ListItem {...{ item }} />
                                    })
                                    :
                                    <Text style={[ui.muted, ui.center, { marginVertical: "auto" }]}>No hay registros añadidos</Text>
                            }
                        </ScrollView>
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    checkboxList: {
        width: "85%",
        height: "100%",
        flex: 1,
        borderRadius: 12,
        marginVertical: 16,
        backgroundColor: "#e3e3e3"
    },
})