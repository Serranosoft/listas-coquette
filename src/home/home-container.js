import { useCallback, useEffect, useState } from "react";
import Home from "./home";
import HeaderHomeContainer from "../headers/header-home-container";
import { Stack, useFocusEffect } from "expo-router";
import { getAllList, getAllListItem } from "../utils/storage";

export default function HomeContainer() {

    const [lists, setLists] = useState([])
    const [openAddModal, setOpenAddModal] = useState(false);

    useFocusEffect(
        useCallback(() => {
            fetchDb();
        }, [])
    );

    useEffect(() => {
        if (!openAddModal) {
            fetchDb();
        }
    }, [openAddModal])

    async function fetchDb() {
        const result = await getAllList();
        setLists(result);
    }

    return (
        <>
            <Stack.Screen options={{ header: () => <HeaderHomeContainer {...{ openAddModal, setOpenAddModal }} /> }} />
            <Home {...{ lists }} />
        </>
    )
}