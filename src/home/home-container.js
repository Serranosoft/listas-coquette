import { useEffect, useState } from "react";
import Home from "./home";
import HeaderHomeContainer from "../headers/header-home-container";
import { Stack } from "expo-router";

export default function HomeContainer() {

    const [lists, setLists] = useState([]);

    useEffect(() => {
        const tmp = [
            {
                bookColor: "red",
                title: "El primer listado",
                content: [
                    true, false, true, true
                ]
            }
        ]

        setLists(tmp);
    }, [])

    return (
        <>
            <Stack.Screen options={{ header: () => <HeaderHomeContainer {...{ setLists }} /> }} />
            <Home {...{ lists }} />
        </>
    )
}