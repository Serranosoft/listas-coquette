import ListPresentation from "./list-presentation";
import { ScrollView, Text, View } from "react-native";
import { gap, layout, padding, ui } from "../../src/utils/styles";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getItemsFromListId, getListFromId } from "../../src/utils/storage";
import SvgItem from "../../src/utils/svg-item";
import HeaderListContainer from "../headers/header-list-container";

export default function ListContainer() {

    const { id } = useLocalSearchParams();

    const [list, setList] = useState(null);
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        if (id) {
            getList();
            getChecklist();
        }
    }, [id])

    async function getList() {
        const result = await getListFromId(id);
        setList(result);
    }

    async function getChecklist() {
        const result = await getItemsFromListId(id);
        setItems(result);
    }

    return (
        <>
            <Stack.Screen options={{ header: () => <HeaderListContainer {...{ selectedItems, setSelectedItems, getChecklist }} /> }} />
            <ListPresentation {...{ getChecklist, setItems, items, list, selectedItems, setSelectedItems }}/>
        </>
    )
}