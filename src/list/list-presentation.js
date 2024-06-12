import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, ui } from "../../src/utils/styles";
import ListItem from "./list-item";

export default function ListPresentation({ items, selectedItems, setSelectedItems }) {

    return (

        <View style={styles.checkboxList}>
            <ScrollView style={{ gap: 16, width: "100%", marginVertical: 8 }} contentContainerStyle={{ gap: 8 }}>
                {
                    items.length > 0 ?
                        items.map((item) => {
                            return <ListItem key={item.id} {...{ item, selectedItems, setSelectedItems }} />
                        })
                        :
                        <Text style={[ui.muted, ui.center, { marginVertical: "auto" }]}>No hay registros añadidos</Text>
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