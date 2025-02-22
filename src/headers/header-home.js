import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { components, header, padding, ui } from "../utils/styles";
import { Link, router } from "expo-router";
import { Path, Svg } from "react-native-svg";
import { useContext, useState } from "react";
import { AdsContext, LangContext } from "../utils/Context";
import { Menu, MenuDivider, MenuItem } from "react-native-material-menu";

export default function HeaderHome({ setOpenListModal, selectedLists, setOpenDeleteModal, visible, hideMenu, showMenu }) {


    const { language } = useContext(LangContext);
    const { setAdTrigger } = useContext(AdsContext);

    return (
        <View style={components.header}>

            {/* <Link href="/summary" asChild>
                <TouchableOpacity>
                    <Image source={require("../../assets/more.png")} style={header.img} />
                </TouchableOpacity>
            </Link> */}

            <Menu
                visible={visible}
                onRequestClose={hideMenu}
                anchor={(
                    <TouchableWithoutFeedback onPress={showMenu}>
                        <Image style={header.img} source={require("../../assets/more.png")} />
                    </TouchableWithoutFeedback>
                )}>
                <MenuItem onPress={() => {
                    setAdTrigger((adTrigger) => adTrigger + 1);
                    router.push("summary");
                    hideMenu();
                }}>
                    <View style={[components.row, padding.smallHorizontal]}>
                        <Image style={header.img} source={require("../../assets/activity.png")} />
                        <Text>{language.t("_headerDropdownOption2")}</Text>
                    </View>
                </MenuItem>
                <MenuDivider />
                <MenuItem onPress={() => {
                    setAdTrigger((adTrigger) => adTrigger + 1);
                    router.push("settings");
                    hideMenu();
                }}>
                    <View style={[components.row, padding.smallHorizontal]}>
                        <Image style={header.img} source={require("../../assets/settings.png")} />
                        <Text>{language.t("_headerDropdownOption1")}</Text>
                    </View>
                </MenuItem>
            </Menu>



            <Text style={[ui.h4, ui.black]}>{language.t("_homeTitle")}</Text>
            {
                selectedLists.length > 0 ?
                    <TouchableOpacity onPress={() => setOpenDeleteModal(true)}>
                        <Svg style={header.img} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <Path d="M10 18a1 1 0 001-1v-6a1 1 0 00-2 0v6a1 1 0 001 1zM20 6h-4V5a3 3 0 00-3-3h-2a3 3 0 00-3 3v1H4a1 1 0 000 2h1v11a3 3 0 003 3h8a3 3 0 003-3V8h1a1 1 0 000-2zM10 5a1 1 0 011-1h2a1 1 0 011 1v1h-4zm7 14a1 1 0 01-1 1H8a1 1 0 01-1-1V8h10zm-3-1a1 1 0 001-1v-6a1 1 0 00-2 0v6a1 1 0 001 1z" />
                        </Svg>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => setOpenListModal(true)}>
                        <Image style={header.img} source={require("../../assets/plus.png")} />
                    </TouchableOpacity>
            }
        </View>
    )
}

