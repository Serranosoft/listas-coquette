import Settings from "./settings";
import { Stack } from "expo-router";
import HeaderBackContainer from "../headers/header-back-container";
import { LangContext } from "../utils/Context";
import { useContext } from "react";

export default function SettingsContainer() {
    const { language } = useContext(LangContext);

    return (
        <>
            <Stack.Screen options={{ header: () => <HeaderBackContainer title={language.t("_settingsTitle")} /> }} />
            <Settings />
        </>
    )
}