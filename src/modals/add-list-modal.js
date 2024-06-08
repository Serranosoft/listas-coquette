import { StyleSheet, TextInput, View } from "react-native"
import { Text } from "react-native"
import { TouchableOpacity } from "react-native"
import { Modal } from "react-native"
import { colors, ui } from "../utils/styles"
import { useState } from "react"

export default function AddListModal({ setOpenAddModal, openAddModal }) {

    function close() {
        setOpenAddModal(false)
    }

    function save() {

    }

    const [title, setTitle] = useState("");
 
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

                            <Text style={[ui.h3, ui.black]}>Personaliza tu lista</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setTitle}
                                value={title}
                                placeholder="Nombre de tu lista"
                            />

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
        marginTop: 32,
        gap: 8,
        alignItems: "center",
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        borderColor: colors.dark,
        borderRadius: 8,
        padding: 10,
      },
})