import Checkbox from "expo-checkbox"
import { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { colors, ui } from "../utils/styles";
import { updateItemStatus } from "../utils/storage";

export default function ListItem({ item, selectedItems, setSelectedItems }) {

    const [checked, setChecked] = useState(false);
    const [selected, setSelected] = useState(false);

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

    function onLongPress() {
        if (selected) {
            setSelected(false);
        } else {
            setSelected(true);
        }
    }

    function onPress() {
        if (selectedItems.length > 0) {
            if (!selected) {
                setSelected(true);
            } else {
                setSelected(false);
            }
        } else {
            setSelected(false);
        }
    }

    useEffect(() => {
        if (selected) {
            setSelectedItems(prevState => [...prevState, item.id]);
        } else {
            if (selectedItems.includes(item.id)) {
                setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item.id));
            }
        }
    }, [selected])

    return (
        <Pressable style={[styles.wrapper, selected && { backgroundColor: "#F7B4B4", borderBottomColor: colors.gray}]} onPress={onPress} onLongPress={onLongPress}>
            <Text style={[ui.h4, ui.black]}>{item.value}</Text>
            <Checkbox
                style={styles.checkbox}
                value={checked}
                onValueChange={handleChange}
                color={checked ? colors.dark : undefined}
            />
        </Pressable>
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
        borderBottomColor: "#c4c4c4",
    },

    checkbox: {
        borderRadius: 100,
        height: 32,
        width: 32,
    }

})