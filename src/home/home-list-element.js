import { Text, TouchableOpacity } from "react-native";
import { colors, layout, margin, padding, ui } from "../utils/styles";
import SvgItem from "../utils/svg-item";
import {  router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { getItemsCheckedLength, getItemsLength } from "../utils/storage";

export default function HomeListElement({ list, selectedLists, setSelectedLists }) {

    const [selected, setSelected] = useState(false);
    const [progress, setProgress] = useState(null);

    async function getProgress() {
        const totalProgress = await getItemsLength(list.id);
        const currentProgress = await getItemsCheckedLength(list.id);

        const progress = { current: currentProgress["COUNT(*)"], total: totalProgress["COUNT(*)"] };
        setProgress(progress);
    }

    function navigate() {
        router.navigate({ pathname: "/list", params: { id: list.id } });
    }

    function onLongPress() {
        if (selected) {
            setSelected(false);
        } else {
            setSelected(true);
        }
    }

    function onPress() {
        if (selectedLists.length > 0) {
            if (!selected) {
                setSelected(true);
            } else {
                setSelected(false);
            }
        } else {
            navigate();
        }
    }

    useEffect(() => {
        if (selected) {
            setSelectedLists(prevState => [...prevState, list.id]);
        } else {
            if (selectedLists.includes(list.id)) {
                setSelectedLists(selectedLists.filter(selectedItem => selectedItem !== list.id));
            }
        }
    }, [selected])

    useFocusEffect(
        useCallback(() => {
            getProgress();
        }, [])
    );

    return (
        <TouchableOpacity
            style={[layout.flexHalf, layout.alignCenter, padding.mediumVertical, selected && { backgroundColor: colors.light, borderRadius: 16 }]}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <SvgItem {...{ width: 135, height: 135, color: list.color }} />
            { progress && <Text style={[ui.muted, margin.smallTop, { fontSize: 12.5 }]}>{progress.current} / {progress.total}</Text> }
            <Text style={[ui.text, ui.black, ui.center]}>{list.title}</Text>
        </TouchableOpacity>
    )
}