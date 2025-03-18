import { StyleSheet, Text, View } from "react-native";
import { colors, margin, ui } from "../../src/utils/styles";
import ListItem from "./list-item";
import { useContext } from "react";
import { LangContext } from "../utils/Context";
import { ScrollView } from "react-native-gesture-handler";

export default function ListPresentation({ scrollRef, items, selectedItems, setSelectedItems, getChecklist, checkbox }) {
    const { language } = useContext(LangContext);

    return (

        <View style={styles.checkboxList}>
            <ScrollView ref={scrollRef} style={{ gap: 16, width: "100%", marginVertical: 8 }} contentContainerStyle={{ gap: 8 }}>
                {
                    items.length > 0 ?
                        items.map((item) => {
                            return <ListItem key={item.id} {...{ item, selectedItems, setSelectedItems, getChecklist, checkbox }} />
                        })
                        :
                        <Text style={[ui.muted, ui.center, margin.bigTop]}>{language.t("_listPresentationNoItems")}</Text>
                }
            </ScrollView>
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
        backgroundColor: colors.gray,
    }
})