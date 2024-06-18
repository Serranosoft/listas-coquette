import { useCallback, useState } from "react";
import Home from "./home";
import HeaderHomeContainer from "../headers/header-home-container";
import { Stack, useFocusEffect } from "expo-router";
import { getAllList } from "../utils/storage";

export default function HomeContainer() {

    const [lists, setLists] = useState([])
    const [selectedLists, setSelectedLists] = useState([]);

    useFocusEffect(
        useCallback(() => {
            fetchDb();
        }, [])
    );

    async function fetchDb() {
        const result = await getAllList();
        setLists(result);
    }

    return (
        <>
            <Stack.Screen options={{ header: () => <HeaderHomeContainer {...{ setSelectedLists, selectedLists, fetchDb }} /> }} />
            <Home {...{ lists, selectedLists, setSelectedLists }} />
        </>
    )
}