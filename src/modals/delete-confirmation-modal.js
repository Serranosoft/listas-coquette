import { StyleSheet, View } from "react-native"
import { Text } from "react-native"
import { TouchableOpacity } from "react-native"
import { Modal } from "react-native"
import { components, ui } from "../utils/styles"

export default function DeleteModal({ setOpenDeleteModal, openDeleteModal, removeList }) {

    function close() {
        setOpenDeleteModal(false);
    }

    function remove() {
        removeList();
        close();
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={openDeleteModal}
            onRequestClose={close}>
            <View style={styles.center}>
                <View style={styles.wrapper}>
                    <View style={styles.border}>
                        <TouchableOpacity style={styles.close} onPress={close}>
                            <Text style={[ui.h4, ui.black]}>&#10006;</Text>
                        </TouchableOpacity>
                        <View style={styles.content}>
                            <Text style={[ui.h4, ui.black]}>¿Quieres eliminar esta(s) lista(s)?</Text>
                            <Text style={ui.muted}>Se eliminará el listado de forma permanente junto con todos los recursos que contenga.</Text>
                            <Text style={ui.muted}>Esta acción no se puede deshacer.</Text>
                            <TouchableOpacity style={components.button} onPress={remove}>
                                <Text style={[ui.h4, ui.center, ui.black]}>Eliminar lista(s)</Text>
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
        paddingHorizontal: 16,
        paddingVertical: 24,
    },

    content: {
        gap: 16,
        marginTop: 8,
    },
})