import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { colors, components, header, ui } from "../utils/styles";
import { Link, router } from "expo-router";

export default function HeaderList({ setOpenAddModal }) {

    function back() {
        router.back();
    }

    return (
        <View style={components.header}>

            <Pressable onPress={back}>
                <Image style={header.img} source={require("../../assets/back.png")} />
            </Pressable>

            <Text style={[ui.h4, ui.black]}>Personaliza tu lista</Text>

            <Link href="/settings" asChild>
                <TouchableOpacity>
                    <Image style={header.img} source={require("../../assets/settings.png")} />
                </TouchableOpacity>
            </Link>
        </View>
    )
}