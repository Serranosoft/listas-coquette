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

                    <ScrollView style={{ gap: 16, width: "100%" }} contentContainerStyle={{ alignItems: "center", gap: 16 }}>
                        <View style={styles.checkboxList}>

                            {
                                items.map((item, index) => {
                                    return <ListItem {...{ item }}/>
                                })
                            }
                        </View>
                    </ScrollView>
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
        borderWidth: 2,
        borderColor: colors.dark,
        borderRadius: 12,
        marginTop: 8
    },

    addWrapper: {
        backgroundColor: "lightgray",
        width: "85%",
        padding: 8,
        borderRadius: 12,
        marginTop: 24,
    }

})