import ListPresentation from "./list-presentation";
import { Dimensions, View } from "react-native";
import { gap, layout, padding } from "../../src/utils/styles";
import { Stack, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { getItemsFromListId, getListFromId, getNextIdFromCurrentId, getPrevIdFromCurrentId, getPreviousIdFromCurrentId } from "../../src/utils/storage";
import HeaderListContainer from "../headers/header-list-container";
import ListHero from "./list-hero";
import ListAddItem from "./list-add-item";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { bannerId } from "../utils/constants";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { AdsContext } from "../utils/Context";

export default function ListContainer() {

    const { initialId } = useLocalSearchParams();
    const { adsLoaded } = useContext(AdsContext);
    

    const [list, setList] = useState(null);
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [openListModal, setOpenListModal] = useState(false);
    const [id, setId] = useState(initialId);

    const scrollRef = useRef();
    const textInputRef = useRef();

    useEffect(() => {
        if (id) {
            getList();
            getChecklist();
        }
    }, [id])

    async function getList() {
        const result = await getListFromId(id);
        setList(result);
    }

    async function getChecklist() {
        const result = await getItemsFromListId(id);
        setItems(result);
    }

    const position = useSharedValue(0);
    const tap = Gesture.Pan().runOnJS(true)
        .activeOffsetX([60, 60])
        .onUpdate((e) => {
            position.value = e.translationX;
        })
        .onEnd(async (e) => {
            if (e.translationX < -60) {
                const x = await getNextIdFromCurrentId(id);
                setId(x.id);
            } else if (e.translationX > 60) {
                const x = await getPrevIdFromCurrentId(id);
                setId(x.id);
            }
            position.value = withDelay(50, withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) }));
        })
        .shouldCancelWhenOutside(true)
        .requireExternalGestureToFail(scrollRef || textInputRef);



    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
    }));

    return (
        <>
            <Stack.Screen options={{ header: () => <HeaderListContainer {...{ list, selectedItems, setSelectedItems, getChecklist }} /> }} />
            <GestureDetector gesture={tap}>
                <Animated.View style={[layout.flex, layout.white, animatedStyle]}>
                    {adsLoaded && <BannerAd unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />}
                    {
                        list &&
                        <View style={[layout.flex, layout.alignCenter, padding.bigTop, gap.medium]}>
                            <ListHero {...{ list, openListModal, setOpenListModal, getList }} />
                            <ListAddItem {...{ textInputRef, getChecklist, list }} />
                            <ListPresentation {...{ scrollRef, items, selectedItems, setSelectedItems, getChecklist, checkbox: list.checkbox }} />
                        </View>

                    }
                </Animated.View>

            </GestureDetector>
        </>
    )
}