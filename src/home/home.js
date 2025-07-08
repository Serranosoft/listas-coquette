import { FlatList, View } from "react-native";
import { gap, layout } from "../utils/styles";
import HomeListElement from "./home-list-element";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { bannerId } from "../utils/constants";
import { useContext } from "react";
import { AdsContext } from "../utils/Context";

export default function Home({ lists, selectedLists, setSelectedLists }) {

    const { adsLoaded } = useContext(AdsContext);

    return (
        <>
            <View style={[layout.flex]}>
                {adsLoaded && <BannerAd unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} /> }
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
                {adsLoaded && <BannerAd unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} /> }
            </View>
        </>

    )
}