import { ScrollView, StyleSheet, TextInput, View } from "react-native"
import { Text } from "react-native"
import { TouchableOpacity } from "react-native"
import { Modal } from "react-native"
import { colors, components, gap, layout, ui } from "../utils/styles"
import { useEffect, useState } from "react"
import ColorPicker, { HueSlider, Panel1 } from 'reanimated-color-picker';
import SvgItem from "../utils/svg-item"
import { ColorsHandler } from "../utils/colors-handler"
import Animated, { useSharedValue, withSpring, useAnimatedStyle, ZoomIn } from 'react-native-reanimated';
import { insertList, updateItem, updateList } from "../utils/storage"


export default function ItemModal({ openItemModal, setOpenItemModal, item, onSave }) {

    const [value, setValue] = useState(item.value || "");

    function close() {
        setOpenItemModal(false);
    }

    function save() {
        updateItem(item.id, value);
        close();
        if (onSave) {
            onSave();
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
                                <Text style={[ui.h3, ui.black, [ui.center]]}>Editar registro</Text>
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
                                    <Text style={[ui.h4, ui.center, ui.black]}>Cambiar valor</Text>
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