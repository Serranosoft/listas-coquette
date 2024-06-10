import Checkbox from "expo-checkbox"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { colors, ui } from "../utils/styles";
import { updateItemStatus } from "../utils/storage";

export default function ListItem({ item }) {

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (item && item.hasOwnProperty("checked")) {
            if (item.checked === "0" || item.checked === 0) {
                setChecked(false);
            } else {
                setChecked(true);
            }
        }
    }, [item])

    async function handleChange() {
        updateItemStatus(item.id, !checked);
        setChecked(!checked);
    }

    return (
        <View style={styles.wrapper}>
            <Text style={[ui.h4, ui.black]}>{item.value}</Text>
            <Checkbox
                style={styles.checkbox}
                value={checked}
                onValueChange={handleChange}
                color={checked ? colors.dark : undefined}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
        borderRadius: 12,
        borderBottomWidth: 1,
        paddingBottom: 12,
        borderBottomColor: "#c4c4c4",
    },

    checkbox: {
        borderRadius: 100,
        height: 32,
        width: 32,
    }

})