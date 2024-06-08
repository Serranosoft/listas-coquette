import { StyleSheet, TextInput, View } from "react-native"
import { Text } from "react-native"
import { TouchableOpacity } from "react-native"
import { Modal } from "react-native"
import { colors, components, gap, layout, ui } from "../utils/styles"
import { useState } from "react"
import ColorPicker, { HueSlider, Panel1 } from 'reanimated-color-picker';
import SvgItem from "../utils/svg-item"
import { ColorsHandler } from "../utils/colors-handler"

export default function AddListModal({ setOpenAddModal, openAddModal }) {
    
    const [color, setColor] = useState("rgb(85, 172, 238)")
    const [title, setTitle] = useState("");
    
    function close() {
        setOpenAddModal(false)
    }
    const isReadable = ColorsHandler.isReadableForBlackBackground(color);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={openAddModal}
            onRequestClose={close}>
            <View style={styles.center}>
                <View style={styles.wrapper}>
                    <View style={styles.border}>
                        <TouchableOpacity style={styles.close} onPress={close}>
                            <Text style={[ui.h4, ui.black]}>&#10006;</Text>
                        </TouchableOpacity>
                        <View style={styles.content}>

                            <SvgItem {...{ width: 125, height: 125, color }} />

                            <Text style={[ui.h3, ui.black]}>Personaliza tu lista</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setTitle}
                                value={title}
                                placeholder="Nombre de tu lista"
                            />

                            <ColorPicker
                                style={[layout.w100, gap.big]}
                                value={color}
                                onComplete={({ rgb }) => setColor(rgb)}
                                sliderThickness={25}
                                thumbSize={24}
                                thumbShape='circle'
                            >
                                <View style={[layout.row, gap.big]}>
                                    <HueSlider vertical={true} style={styles.sliderStyle} />
                                    <Panel1 style={styles.panelStyle} />
                                </View>
                            </ColorPicker>

                            <TouchableOpacity style={[components.button, { backgroundColor: color }]}>
                                <Text style={[ui.h4, { color: isReadable ? "black" : "white" }]}>Crear lista</Text>
                            </TouchableOpacity>

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
        paddingHorizontal: 24,
        paddingVertical: 32,
    },

    content: {
        marginTop: 16,
        gap: 16,
        alignItems: "center",
    },

    input: {
        width: "100%",
        height: 40,
        margin: 12,
        borderWidth: 4,
        borderColor: colors.light,
        borderRadius: 8,
        padding: 10,
    },
    panelStyle: {
        width: "100%",
        flex: 1,
        height: 200,
        borderRadius: 16,
    
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
      },
    sliderStyle: {
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
})