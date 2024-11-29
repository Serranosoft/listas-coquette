import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, layout, padding, ui } from "../utils/styles";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { bannerId } from "../utils/constants";
import LangList from "../components/lang-list";
import { useContext } from "react";
import { LangContext } from "../utils/Context";

export default function Settings() {

    const { language } = useContext(LangContext);

    return (
        <View style={[layout.flex, layout.backgroundLight, padding.bigHorizontal]}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.box}>
                    <Text style={[ui.h4, ui.black]}>{language.t("_settingsApp")}</Text>
                    <Text style={[ui.text, ui.black]}>{language.t("_settingsLang")}</Text>
                    <LangList />
                </View>
            </ScrollView>
            <BannerAd unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />

        </View>
    )
}

const styles = StyleSheet.create({

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
        paddingBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: "#f0f0f0"
    },

    column: {
        alignItems: "flex-start",
        marginVertical: 8,
    },

    switch: {
        transform: [{ scale: 1.3 }]
    },

    box: {
        gap: 12,
        backgroundColor: "#fff",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginVertical: 16
    },

    typoItem: {
        width: 120,
        position: "relative",
        height: 80,
        backgroundColor: "#fff",
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
        marginRight: 8
    },

    typoImg: {
        width: "90%",
        height: "90%",
        resizeMode: "contain",
    },

    typoSelected: {
        borderWidth: 3,
        borderColor: colors.dark
    },

    btn: {
        width: "100%",
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.dark,
        padding: 8,
    }
})