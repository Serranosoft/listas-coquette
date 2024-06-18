import { Image, Pressable, Text, View } from "react-native";
import { components, header, ui } from "../utils/styles";

export default function HeaderSummary({ back }) {

    return (
        <View style={components.header}>
            <Pressable onPress={back}>
                <Image style={header.img} source={require("../../assets/back.png")} />
            </Pressable>
            <Text style={[ui.h4, ui.black]}>Resumen</Text>
            <Text></Text>
        </View>
    )
}