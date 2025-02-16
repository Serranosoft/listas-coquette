import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import SvgItem from "../utils/svg-item";
import { components, header, padding, ui } from "../utils/styles";
import ListModal from "../modals/list-modal";
import { Menu, MenuDivider, MenuItem } from "react-native-material-menu";
import { useState } from "react";
import EditIcon from "../utils/icons/edit-icon";
import HeartIcon from "../utils/icons/heart-icon";

export default function ListHero({ list, openListModal, setOpenListModal, getList }) {
    console.log(list);

    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

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
                                <HeartIcon
                                    style={styles.checkbox}
                                    decoration={true}
                                />
                            </TouchableOpacity>
                        )}>
                        <MenuItem style={{ borderWidth: 3, padding: 0}}>
                            <View style={{ flexDirection: "row", padding:0, borderWidth: 3,alignItems: "center", justifyContent: "space-between", gap: 6, width: "100%", flex: 1,}}>
                                <TouchableOpacity style={styles.iconWrapper}>
                                    <HeartIcon
                                        style={styles.checkbox}
                                        decoration={true}
                                    />
                                </TouchableOpacity>
                                <Text style={[ui.text, { color: "#000", fontSize: 14.5 }]}>Corazón</Text>
                            </View>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 6, width: "100%"}}>
                                <TouchableOpacity style={styles.iconWrapper}>
                                    <HeartIcon
                                        style={styles.checkbox}
                                        decoration={true}
                                    />
                                </TouchableOpacity>
                                <Text style={[ui.text, { color: "#000", fontSize: 14.5 }]}>Estándar</Text>
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

    actions: {
        justifyContent: "space-between",
    },

    img: {
        width: 35,
        height: 35,
        objectFit: "contain",
    }
})