import { FlatList, Text, View } from "react-native";
import { gap, layout, padding } from "../utils/styles";
import HeaderHomeContainer from "../headers/header-home-container";
import HomeItem from "./home-item";

export default function Home({ lists }) {


    return (
        <View style={[layout.flex, padding.mediumHorizontal]}>
            <Text>Ok</Text>
            <View style={layout.flex}>
                {
                    <FlatList
                        data={lists}
                        contentContainerStyle={layout.contentList}
                        numColumns={2}
                        columnWrapperStyle={gap.medium}
                        renderItem={({ item, index }) => <HomeItem {...{ item }} />}
                    />
                }

            </View>
        </View>
    )
}