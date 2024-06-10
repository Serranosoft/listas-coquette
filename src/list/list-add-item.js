import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../utils/styles";
import { useState } from "react";
import { insertItemToListId } from "../utils/storage";

export default function ListAddItem({ getChecklist, list }) {

    const [value, setValue] = useState("");

    async function add() {
        await insertItemToListId(list.id, value, false);
        getChecklist();
    }

    return (
        <View style={styles.addWrapper}>
            <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder="Añade un nuevo recurso"
            />
            <TouchableOpacity onPress={add}>
                <Text style={[ui.h2, ui.black, ui.center]}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    addWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "lightgray",
        width: "85%",
        padding: 8,
        borderRadius: 12,
        marginTop: 24,
        paddingHorizontal: 12,
    },
    input: {
        height: 50,
        borderRadius: 8,
        fontSize: 17
    },
})