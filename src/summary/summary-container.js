import { useEffect, useState } from "react";
import SummaryHero from "./summary-hero";
import { getAllList, getItemsCheckedLength, getItemsLength } from "../utils/storage";
import { Stack } from "expo-router";
import SummaryChart from "./summary-chart";
import { View } from "react-native";
import { gap, layout, padding, ui } from "../utils/styles";
import HeaderSummaryContainer from "../headers/header-summary-container";

export default function SummaryContainer() {

    const [completed, setCompleted] = useState(0);
    const [pending, setPending] = useState(0);

    useEffect(() => {
        getAllItems();
        getAllDone();
    }, [])

    async function getAllItems() {
        const result = await getAllList();

        let itemLength = 0;
        let length = 0;

        for (let i = 0; i < result.length; i++) {
            itemLength = await getItemsCheckedLength(result[i].id, false);
            length += itemLength["COUNT(*)"];
        }

        setPending(length);
    }

    async function getAllDone() {
        const result = await getAllList();

        let itemLength = 0;
        let length = 0;

        for (let i = 0; i < result.length; i++) {
            itemLength = await getItemsCheckedLength(result[i].id);
            length += itemLength["COUNT(*)"];
        }

        setCompleted(length);
    }

    return (
        <>
            <Stack.Screen options={{ header: () => <HeaderSummaryContainer /> }} />
            <View style={[layout.flex, gap.big, layout.white, padding.bigVertical]}>
                <SummaryHero {...{ completed, pending }} />
                <SummaryChart />
            </View>
        </>
    )
}