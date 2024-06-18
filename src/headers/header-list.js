import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { components, header, ui } from "../utils/styles";
import { Path, Svg } from "react-native-svg";

export default function HeaderList({ list, selectedItems, back, removeItems }) {

    return (
        <View style={components.header}>

            <Pressable onPress={back}>
                <Image style={header.img} source={require("../../assets/back.png")} />
            </Pressable>

            { list ? <Text style={[ui.h4, ui.black]}>{list.title}</Text> : <Text></Text> }

            {
                selectedItems.length > 0 ?
                    <TouchableOpacity onPress={removeItems}>
                        <Svg style={header.img} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <Path d="M10 18a1 1 0 001-1v-6a1 1 0 00-2 0v6a1 1 0 001 1zM20 6h-4V5a3 3 0 00-3-3h-2a3 3 0 00-3 3v1H4a1 1 0 000 2h1v11a3 3 0 003 3h8a3 3 0 003-3V8h1a1 1 0 000-2zM10 5a1 1 0 011-1h2a1 1 0 011 1v1h-4zm7 14a1 1 0 01-1 1H8a1 1 0 01-1-1V8h10zm-3-1a1 1 0 001-1v-6a1 1 0 00-2 0v6a1 1 0 001 1z" />
                        </Svg>
                    </TouchableOpacity>
                :
                <Text style={header.img}></Text>

            }
        </View>
    )
}