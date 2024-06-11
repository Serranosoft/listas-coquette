import { Text, TouchableOpacity, View } from "react-native";
import { borderColor, borderRadius, borderWidth, colors, gap, layout, padding, ui } from "../utils/styles";
import SvgItem from "../utils/svg-item";
import SvgDecoration from "../utils/svg-decoration";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";

export default function HomeItem({ item, selectedLists, setSelectedLists }) {

    const [selected, setSelected] = useState(false);

    function navigate() {
        router.navigate({ pathname: "/list", params: { id: item.id } });
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
            setSelectedLists(prevState => [...prevState, item.id]);
        } else {
            if (selectedLists.includes(item.id)) {
                setSelectedLists(selectedLists.filter(selectedItem => selectedItem !== item.id));
            }
        }
    }, [selected])

    return (
        <TouchableOpacity
            style={[layout.flexHalf, layout.alignCenter, gap.medium, padding.mediumVertical, selected && { backgroundColor: colors.light, borderRadius: 16 }]}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <SvgItem {...{ width: 135, height: 135, color: item.color }} />
            <Text style={[ui.text, ui.black, ui.center]}>{item.title}</Text>
        </TouchableOpacity>
    )
}