import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SvgItem from "../utils/svg-item";
import { layout, ui } from "../utils/styles";
import ListModal from "../modals/list-modal";

export default function ListHero({ list, openListModal, setOpenListModal, getList }) {

    return (
        <>
            <View>
                <SvgItem {...{ width: 135, height: 135, color: list.color }} />
                <TouchableOpacity onPress={() => setOpenListModal(true)}>
                    <Image source={require("../../assets/edit.png")} style={styles.edit} />
                </TouchableOpacity>
            </View>
            <Text style={[ui.h3, ui.black]}>{list.title}</Text>

            <ListModal {...{ list, openListModal, setOpenListModal, isEdit: true, onSave: getList }}/>
        </>
    )
}

const styles = StyleSheet.create({
    edit: {
        width: 50,
        height: 50,
        position: "absolute",
        bottom: -8,
        right: -48,
    }
})