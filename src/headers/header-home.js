import { Image, Text, TouchableOpacity, View } from "react-native";
import { colors, components, header, ui } from "../utils/styles";
import { Link } from "expo-router";

export default function HeaderHome({ setOpenAddModal }) {

    return (
        <View style={components.header}>

            <Link href="/settings" asChild>
                <TouchableOpacity>
                    <Image style={header.img} source={require("../../assets/settings.png")} />
                </TouchableOpacity>
            </Link>

            <Text style={[ui.h4, ui.black]}>Listas Coquette</Text>

            <TouchableOpacity onPress={() => setOpenAddModal(true)}>
                <Image style={header.img} source={require("../../assets/plus.png")} />
            </TouchableOpacity>
        </View>
    )
}