import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SvgItem from "../utils/svg-item";
import { colors, padding, ui } from "../utils/styles";
import ListModal from "../modals/list-modal";
import { Menu, MenuDivider, MenuItem } from "react-native-material-menu";
import { useState } from "react";
import EditIcon from "../utils/icons/edit-icon";
import HeartIcon from "../utils/icons/heart-icon";
import Checkbox from "expo-checkbox";
import { updateListCheckbox } from "../utils/storage";
import FlagIcon from "../utils/icons/flag-icon";
import StarIcon from "../utils/icons/star-icon";
import FaceIcon from "../utils/icons/face-icon";
import BulbIcon from "../utils/icons/bulb-icon";
import ChooseIcon from "../utils/icons/choose-icon";

export default function ListHero({ list, openListModal, setOpenListModal, getList }) {

    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    function updateCheckbox(icon) {
        updateListCheckbox(list.id, icon);
        getList();
        hideMenu();
    }

    return (
        <>
            <View style={{ flexDirection: "row" }}>
                <SvgItem {...{ width: 135, height: 135, color: list.color }} />
                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => setOpenListModal(true)} style={styles.iconWrapper}>
                        <EditIcon width={28} height={28} styles={styles.img} />
                    </TouchableOpacity>
                    <Menu
                        visible={visible}
                        onRequestClose={hideMenu}
                        anchor={(
                            <TouchableOpacity onPress={showMenu} style={styles.iconWrapper}>
                                <ChooseIcon width={28} height={28} styles={styles.img} />
                            </TouchableOpacity>
                        )}>
                        <MenuItem onPress={() => updateCheckbox("standard")}>
                            <View style={styles.menuItemWrapper}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={true}
                                    color={colors.dark}
                                />
                                <Text style={[ui.text, { color: "#000", fontSize: 14.5 }]}>Estándar</Text>
                            </View>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onPress={() => updateCheckbox("heart")}>
                            <View style={styles.menuItemWrapper}>
                                <HeartIcon
                                    styles={styles.checkbox}
                                    checked={true}
                                />
                                <Text style={[ui.text, { color: "#000", fontSize: 14.5 }]}>Corazón</Text>
                            </View>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onPress={() => updateCheckbox("flag")}>
                            <View style={styles.menuItemWrapper}>
                                <FlagIcon
                                    styles={styles.checkbox}
                                    checked={true}
                                />
                                <Text style={[ui.text, { color: "#000", fontSize: 14.5 }]}>Bandera</Text>
                            </View>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onPress={() => updateCheckbox("star")}>
                            <View style={styles.menuItemWrapper}>
                                <StarIcon
                                    styles={styles.checkbox}
                                    checked={true}
                                />
                                <Text style={[ui.text, { color: "#000", fontSize: 14.5 }]}>Estrella</Text>
                            </View>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onPress={() => updateCheckbox("face")}>
                            <View style={styles.menuItemWrapper}>
                                <FaceIcon
                                    styles={styles.checkbox}
                                    checked={true}
                                />
                                <Text style={[ui.text, { color: "#000", fontSize: 14.5 }]}>Cara</Text>
                            </View>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onPress={() => updateCheckbox("bulb")}>
                            <View style={styles.menuItemWrapper}>
                                <BulbIcon
                                    styles={styles.checkbox}
                                    checked={true}
                                />
                                <Text style={[ui.text, { color: "#000", fontSize: 14.5 }]}>Bombilla</Text>
                            </View>
                        </MenuItem>


                    </Menu>
                </View>
            </View>
            <Text style={[ui.h3, ui.black, ui.center, padding.bigHorizontal]}>{list.title}</Text>
            {list.last_update && <Text style={[ui.muted, { fontSize: 14, marginTop: -12 }]}>{list.last_update}</Text>}

            <ListModal {...{ list, openListModal, setOpenListModal, isEdit: true, onSave: getList }} />
        </>
    )
}

const styles = StyleSheet.create({

    iconWrapper: {
        width: 40,
        height: 40,
        padding: 6,
        borderRadius: 100,
        backgroundColor: "#FACCD6",
        justifyContent: "center",
        alignItems: "center",
    },

    menuItemWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },

    actions: {
        justifyContent: "space-between",
    },

    checkbox: {
        borderRadius: 100,
        height: 28,
        width: 28,
        zIndex: 1
    },

    img: {
        width: 35,
        height: 35,
        objectFit: "contain",
    }
})