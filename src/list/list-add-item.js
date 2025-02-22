import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../utils/styles";
import { useContext, useRef, useState } from "react";
import { insertItemToListId } from "../utils/storage";
import { convertDateToString } from "../utils/date";
import { LangContext } from "../utils/Context";

export default function ListAddItem({ getChecklist, list }) {

    const { language } = useContext(LangContext);
    const [value, setValue] = useState("");
    const input = useRef();

    function onAdd() {
        input.current.clear();
        Keyboard.dismiss();
        setValue("")
    }

    async function add() {
        if (value.length > 0) {
            await insertItemToListId(list.id, value, false, convertDateToString(new Date()));
            getChecklist();
            onAdd();
        }
    }

    return (
        <View style={styles.addWrapper}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 0} // Ajusta según el diseño
                style={{ flex: 1 }}
            >
                <TextInput
                    ref={input}
                    style={[styles.input, ui.muted]}
                    onChangeText={setValue}
                    value={value}
                    placeholder={language.t("_listAddItemInputPlaceholder")}
                    placeholderTextColor={"#858585"}
                />

            </KeyboardAvoidingView>
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