import { StyleSheet, TextInput, View } from "react-native"
import { Text } from "react-native"
import { TouchableOpacity } from "react-native"
import { Modal } from "react-native"
import { colors, components, layout, ui } from "../utils/styles"
import { useContext, useState } from "react"
import Animated, { ZoomIn } from 'react-native-reanimated';
import { updateItem } from "../utils/storage"
import { convertDateToString } from "../utils/date"
import { LangContext } from "../utils/Context"


export default function ItemModal({ openItemModal, setOpenItemModal, item, onSave }) {
    const { language } = useContext(LangContext);

    const [value, setValue] = useState(item.value || "");

    function close() {
        setOpenItemModal(false);
    }

    function save() {
        if (value.length > 0) {
            updateItem(item.id, value, convertDateToString(new Date()));
            close();
            if (onSave) {
                onSave();
            }
        }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={openItemModal}
            onRequestClose={close}>
            <View style={styles.center}>
                <View style={styles.wrapper}>
                    <View style={styles.border}>
                        <TouchableOpacity style={styles.close} onPress={close}>
                            <Text style={[ui.h4, ui.black]}>&#10006;</Text>
                        </TouchableOpacity>
                        <View style={styles.content}>
                            <Animated.View entering={ZoomIn.delay(50)}>
                                <Text style={[ui.h3, ui.black, [ui.center]]}>{language.t("_listEditItemTitle")}</Text>
                            </Animated.View>
                            <Animated.View entering={ZoomIn.delay(125)} style={[layout.w100]}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setValue}
                                    value={value}
                                />
                            </Animated.View>

                            <Animated.View style={[components.button, layout.w100]} entering={ZoomIn.delay(175)}>
                                <TouchableOpacity onPress={save}>
                                    <Text style={[ui.h4, ui.center, ui.black]}>{language.t("_listEditItemAcceptButton")}</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    wrapper: {
        width: "90%",
        paddingHorizontal: 4,
        paddingVertical: 4,
        gap: 8,
        backgroundColor: '#fafafa',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    close: {
        position: "absolute",
        top: 0,
        right: 8,
    },

    border: {
        borderWidth: 6,
        borderRadius: 20,
        borderColor: "#FACCD6",
        paddingHorizontal: 16,
        paddingVertical: 24,
    },

    content: {
        marginTop: 8,
        alignItems: "center",
        gap: 16
    },

    input: {
        height: 50,
        borderWidth: 3,
        borderColor: colors.light,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 17
    },
})