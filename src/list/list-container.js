import ListPresentation from "./list-presentation";
import { ScrollView, Text, View } from "react-native";
import { gap, layout, padding, ui } from "../../src/utils/styles";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getItemsFromListId, getListFromId } from "../../src/utils/storage";
import SvgItem from "../../src/utils/svg-item";
import HeaderListContainer from "../headers/header-list-container";
import ListHero from "./list-hero";
import ListAddItem from "./list-add-item";

export default function ListContainer() {

    const { id } = useLocalSearchParams();

    const [list, setList] = useState(null);
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [openListModal, setOpenListModal] = useState(false);

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
            <View style={[layout.flex, layout.white]}>
                {
                    list &&
                    <View style={[layout.flex, layout.alignCenter, padding.bigTop, gap.medium]}>
                        <ListHero {...{ list, openListModal, setOpenListModal, getList }} />
                        <ListAddItem {...{ getChecklist, list }} />
                        <ListPresentation {...{ items, selectedItems, setSelectedItems }} />
                    </View>

                }
            </View>
        </>
    )
}