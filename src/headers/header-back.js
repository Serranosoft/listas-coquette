import { Image, Pressable, Text, View } from "react-native";
import { components, header, ui } from "../utils/styles";

export default function HeaderBack({ title, onBackPress }) {
    return (
        <View style={components.header}>
            <Pressable onPress={onBackPress}>
                <Image style={header.img} source={require("../../assets/back.png")} />
            </Pressable>
            <Text style={[ui.h4, ui.black]}>{ title }</Text>
            <Text></Text>
        </View>
    )
}