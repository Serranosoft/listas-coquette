import Checkbox from "expo-checkbox"
import { useEffect, useState } from "react"
import { Alert, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native"
import { colors, gap, layout, ui } from "../utils/styles";
import { deleteItemFromId, updateItemStatus } from "../utils/storage";
import * as Clipboard from 'expo-clipboard';
import ItemModal from "../modals/item-modal";
import HeartIcon from "../utils/icons/heart-icon";
import FlagIcon from "../utils/icons/flag-icon";
import StarIcon from "../utils/icons/star-icon";
import FaceIcon from "../utils/icons/face-icon";
import BulbIcon from "../utils/icons/bulb-icon";

export default function ListItem({ item, selectedItems, setSelectedItems, getChecklist, checkbox }) {

    const [checked, setChecked] = useState(false);
    const [selected, setSelected] = useState(false);
    const [openItemModal, setOpenItemModal] = useState(false);

    useEffect(() => {
        if (item && item.hasOwnProperty("checked")) {
            if (item.checked === "0" || item.checked === 0) {
                setChecked(false);
            } else {
                setChecked(true);
            }
        }
    }, [item])

    async function handleChange() {
        updateItemStatus(item.id, !checked);
        setChecked(!checked);
    }

    async function onLongPress() {
        if (selected) {
            setSelected(false);
        } else {
            setSelected(true);
        }

        await Clipboard.setStringAsync(item.value);
        
        if (Platform.OS === "android") {
            ToastAndroid.showWithGravityAndOffset(`¡${item.value} Copiado!`, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else {
            Alert.alert(`¡${item.value} Copiado!`);
        }
    }

    function onPress() {
        if (selectedItems.length > 0) {
            if (!selected) {
                setSelected(true);
            } else {
                setSelected(false);
            }
        }
    }

    function removeItem() {
        deleteItemFromId(item.id);
        getChecklist();
    }

    function openEditItemModal() {
        setOpenItemModal(true);
    }

    useEffect(() => {
        if (selected) {
            setSelectedItems(prevState => [...prevState, item.id]);
        } else {
            if (selectedItems.includes(item.id)) {
                setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item.id));
            }
        }
    }, [selected])

    return (
        <>
            <View style={[styles.wrapper, selected && { backgroundColor: colors.light, borderBottomColor: colors.gray }]} >
                <TouchableOpacity style={[layout.row, layout.alignCenter, gap.big]} onPress={onPress} onLongPress={onLongPress}>
                    <TouchableOpacity onPress={removeItem}>
                        <Text style={[ui.muted]}>x</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openEditItemModal}>
                        <Text style={[ui.h4, ui.black, checked && { textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: colors.muted }]}>{item.value}</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                {
                    checkbox == null ||
                    checkbox == "standard" ?
                        <Checkbox
                            style={styles.checkbox}
                            value={checked}
                            onValueChange={handleChange}
                            color={checked ? colors.dark : undefined}
                        />
                        :
                    checkbox == "heart" ?
                        <HeartIcon
                            style={styles.checkbox}
                            checked={checked}
                            onPress={() => handleChange()}
                        />
                        :
                    checkbox == "flag" ?
                        <FlagIcon
                            style={styles.checkbox}
                            checked={checked}
                            onPress={() => handleChange()}
                        />
                        :
                    checkbox == "star" ?
                        <StarIcon
                            style={styles.checkbox}
                            checked={checked}
                            onPress={() => handleChange()}
                        />
                        :
                    checkbox == "face" ?
                        <FaceIcon
                            style={styles.checkbox}
                            checked={checked}
                            onPress={() => handleChange()}
                        />
                        :
                    checkbox == "bulb" &&
                        <BulbIcon
                            style={styles.checkbox}
                            checked={checked}
                            onPress={() => handleChange()}
                        />

                }
            </View>
            <ItemModal {...{ openItemModal, setOpenItemModal, item, onSave: getChecklist }} />
        </>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
        borderRadius: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#c4c4c4",
        marginHorizontal: 8
    },

    checkbox: {
        borderRadius: 100,
        height: 28,
        width: 28,
        zIndex: 1
    }

})