import { ScrollView, StyleSheet, TextInput, View } from "react-native"
import { Text } from "react-native"
import { TouchableOpacity } from "react-native"
import { Modal } from "react-native"
import { colors, components, gap, layout, ui } from "../utils/styles"
import { useContext, useEffect, useState } from "react"
import ColorPicker, { HueSlider, Panel1 } from 'reanimated-color-picker';
import SvgItem from "../utils/svg-item"
import { ColorsHandler } from "../utils/colors-handler"
import Animated, { useSharedValue, withSpring, useAnimatedStyle, ZoomIn } from 'react-native-reanimated';
import { insertList, updateList } from "../utils/storage"
import { convertDateToString } from "../utils/date"
import { LangContext } from "../utils/Context"

export default function ListModal({ setOpenListModal, openListModal, list, isEdit = false, onSave }) {

    const { language } = useContext(LangContext);

    const [color, setColor] = useState(list ? list.color : "rgb(85, 172, 238)")
    const [title, setTitle] = useState(list ? list.title : "");
    const [isReadable, setIsReadable] = useState(false);

    async function save() {
        if (title.length > 0) {
            
            if (!isEdit) {
                await insertList(color, title, convertDateToString(new Date()));
                setTitle("");
            } else {
                await updateList(list.id, color, title, convertDateToString(new Date()));
            }

            if (onSave) {
                onSave();
            }

            setOpenListModal(false);
        }
    }

    // Encargado de cerrar el modal
    function close() {
        setOpenListModal(false);

        if (!isEdit) {
            setTitle("");
        }
    }

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

        // Boolean que me devuelve true/false cuando el background es muy oscuro para pintar el texto de blanco o negro
        const isReadable = ColorsHandler.isReadableForBlackBackground(color);
        setIsReadable(isReadable);
    }, [color]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={openListModal}
            onRequestClose={close}>
            <View style={styles.center}>
                <View style={styles.wrapper}>
                    <View style={styles.border}>
                        <TouchableOpacity style={styles.close} onPress={close}>
                            <Text style={[ui.h4, ui.black]}>&#10006;</Text>
                        </TouchableOpacity>
                        <View style={styles.content}>
                            <ScrollView style={{ gap: 16, width: "100%" }} contentContainerStyle={{ alignItems: "center", gap: 16 }}>

                                <Animated.View>
                                    <SvgItem {...{ width: 110, height: 110, color }} />
                                </Animated.View>

                                <Animated.View>
                                    <Text style={[ui.h3, ui.black, ui.center]}>{language.t("_listModalTitle")}</Text>
                                </Animated.View>


                                <Animated.View style={[layout.w100]}>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor={"#4d4d4dff"}
                                        onChangeText={setTitle}
                                        value={title}
                                        placeholder={language.t("_listModalNamePlaceholder")}
                                    />
                                </Animated.View>


                                <Animated.View style={[layout.w100]}>
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

                                <View style={[components.button, layout.w100, { backgroundColor: color }]}> 
                                    <Animated.View style={animatedStyle}>
                                        <TouchableOpacity onPress={save}>
                                            <Text style={[ui.h4, ui.center, { color: isReadable ? "black" : "white" }]}>{isEdit ? language.t("_listModalEditButton") : language.t("_listModalAddButton")}</Text>
                                        </TouchableOpacity>
                                    </Animated.View>
                                </View>
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
        maxHeight: 650,
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
        fontSize: 17,
        fontFamily: "madimi",
        color: "#000"
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