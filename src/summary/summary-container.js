import { useContext, useEffect, useState } from "react";
import SummaryHero from "./summary-hero";
import { getAllList, getItemsCheckedLength } from "../utils/storage";
import { Stack } from "expo-router";
import SummaryChart from "./summary-chart";
import { View } from "react-native";
import { gap, layout, padding } from "../utils/styles";
import HeaderBackContainer from "../headers/header-back-container";
import { LangContext } from "../utils/Context";

export default function SummaryContainer() {

    const { language } = useContext(LangContext);

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
            <Stack.Screen options={{ header: () => <HeaderBackContainer title={language.t("_summaryTitle")} /> }} />
            <View style={[layout.flex, gap.big, layout.white, padding.bigVertical]}>
                <SummaryHero {...{ completed, pending }} />
                {/* <SummaryChart /> */}
            </View>
        </>
    )
}