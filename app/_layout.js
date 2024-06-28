import { SplashScreen, Stack } from "expo-router";
import { View, StatusBar, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { colors } from "../src/utils/styles";
import { initDb, insertInitialList } from "../src/utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

        // Esperar hasta que las fuentes se carguen
        if (!fontsLoaded) {
            return null;
        }

        return (
            <View style={styles.container}>
                <Stack />
                <StatusBar style="light" />
            </View>
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