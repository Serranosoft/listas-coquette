import { SplashScreen, Stack } from "expo-router";
import { View, StatusBar, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { colors } from "../src/utils/styles";
import { initDb, insertInitialList } from "../src/utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AdsContext, LangContext } from "../src/utils/Context";
import { getLocales } from "expo-localization";
import { I18n } from 'i18n-js'
import { translations } from "../src/utils/localizations";
import AdsHandler from "../src/components/AdsHandler";

SplashScreen.preventAutoHideAsync();

export default function Layout() {

    // Carga de fuentes.
    const [fontsLoaded] = useFonts({ "madimi": require("../assets/fonts/Madimi.ttf") });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    useEffect(() => {
        init();
    }, []);

    async function init() {
        await initDb();
        await setInitialList();
    }

    async function setInitialList() {
        const value = await AsyncStorage.getItem("FIRST_LAUNCH_APP");
        if (!value) {
            await insertInitialList();
            await AsyncStorage.setItem("FIRST_LAUNCH_APP", "true");
        }
    }

    // Idioma
    const [language, setLanguage] = useState(getLocales()[0].languageCode || "es");
    const i18n = new I18n(translations);
    i18n.locale = language;
    i18n.enableFallback = true
    i18n.defaultLocale = "es";

    // Gestión de anuncios
    const [adTrigger, setAdTrigger] = useState(0);
    const [showOpenAd, setShowOpenAd] = useState(true);
    const adsHandlerRef = createRef();

    useEffect(() => {
        if (adTrigger > 4) {
            adsHandlerRef.current.showIntersitialAd();
            setAdTrigger(0);
        }
    }, [adTrigger])

    // Esperar hasta que las fuentes se carguen
    if (!fontsLoaded) {
        return null;
    }

    return (
        <AdsContext.Provider value={{ setAdTrigger: setAdTrigger }}>
            <LangContext.Provider value={{ setLanguage: setLanguage, language: i18n }}>
                <AdsHandler ref={adsHandlerRef} showOpenAd={showOpenAd} setShowOpenAd={setShowOpenAd} />
                <View style={styles.container}>
                    <Stack />
                    <StatusBar style="light" />
                </View>
            </LangContext.Provider>
        </AdsContext.Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
        paddingTop: StatusBar.currentHeight,
        backgroundColor: colors.light
    },
    wrapper: {
        flex: 1,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
    }
})