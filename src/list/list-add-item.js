import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../utils/styles";
import { useRef, useState } from "react";
import { insertItemToListId } from "../utils/storage";

export default function ListAddItem({ getChecklist, list }) {

    const [value, setValue] = useState("");
    const input = useRef();

    function onAdd() {
        input.current.clear();
        Keyboard.dismiss();
        setValue("")
    }

    async function add() {
        if (value.length > 0) {
            await insertItemToListId(list.id, value, false);
            getChecklist();
            onAdd();
        }
    }

    return (
        <View style={styles.addWrapper}>
            <TextInput
                ref={input}
                style={[styles.input, ui.muted]}
                onChangeText={setValue}
                value={value}
                placeholder="Añade un nuevo recurso"
                placeholderTextColor={"#858585"}
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
        backgroundColor: colors.gray,
        width: "85%",
        padding: 8,
        borderRadius: 12,
        marginTop: 16,
        paddingHorizontal: 12,
    },
    input: {
        height: 50,
        borderRadius: 8,
        fontSize: 17
    },
})