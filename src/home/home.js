import { FlatList, View } from "react-native";
import { gap, layout, padding } from "../utils/styles";
import HomeListElement from "./home-list-element";

export default function Home({ lists, selectedLists, setSelectedLists }) {

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
                            renderItem={({ item, index }) => <HomeListElement {...{ list: item, selectedLists, setSelectedLists }} />}
                        />
                    }
                </View>
            </View>
        </>

    )
}