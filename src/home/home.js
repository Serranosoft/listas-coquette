import { FlatList, View } from "react-native";
import { gap, layout, padding } from "../utils/styles";
import HomeItem from "./home-item";

export default function Home({ lists }) {

    return (
        <>
            <View style={[layout.flex, padding.mediumHorizontal]}>
                <View style={[layout.flex]}>
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
        </>

    )
}