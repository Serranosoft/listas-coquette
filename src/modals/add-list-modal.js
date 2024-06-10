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
import { insertList } from "../utils/storage"

export default function AddListModal({ setOpenAddModal, openAddModal }) {

    const [color, setColor] = useState("rgb(85, 172, 238)")
    const [title, setTitle] = useState("");

    async function save() {
        if (title.length > 0) {
            await insertList(color, title);
            setOpenAddModal(false);
        }
    }

    // Encargado de cerrar el modal
    function close() {
        setOpenAddModal(false)
    }

    // Boolean que me devuelve true/false cuando el background es muy oscuro para pintar el texto de blanco o negro
    const isReadable = ColorsHandler.isReadableForBlackBackground(color);

    // Animación "salto" para el botón «Crear lista» cuando cambia de color
    const translateY = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });
    const onBounce = () => translateY.value = withSpring(-5, { stiffness: 100, duration: 100 }, () => translateY.value = withSpring(0, { stiffness: 500 }));

    useEffect(() => {
        if (color) {
            onBounce();
        }
    }, [color]);

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
                            <ScrollView style={{ gap: 16, width: "100%" }} contentContainerStyle={{ alignItems: "center", gap: 16 }}>

                                <Animated.View entering={ZoomIn}>
                                    <SvgItem {...{ width: 110, height: 110, color }} />
                                </Animated.View>

                                <Animated.View entering={ZoomIn.delay(125)}>
                                    <Text style={[ui.h3, ui.black]}>Personaliza tu lista</Text>
                                </Animated.View>


                                <Animated.View entering={ZoomIn.delay(225)} style={[layout.w100]}>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={setTitle}
                                        value={title}
                                        placeholder="Nombre de tu lista"
                                    />
                                </Animated.View>


                                <Animated.View entering={ZoomIn.delay(325)} style={[layout.w100]}>
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
                                </Animated.View>

                                <Animated.View style={[components.button, layout.w100, { backgroundColor: color }]} entering={ZoomIn.delay(425)}>
                                    <Animated.View style={animatedStyle}>
                                        <TouchableOpacity onPress={save}>
                                            <Text style={[ui.h4, ui.center, { color: isReadable ? "black" : "white" }]}>Crear lista</Text>
                                        </TouchableOpacity>
                                    </Animated.View>
                                </Animated.View>
                            </ScrollView>


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
    },

    input: {
        height: 50,
        borderWidth: 3,
        borderColor: colors.light,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 17
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