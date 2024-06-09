import { ScrollView, Text, View } from "react-native";
import { gap, layout, padding, ui } from "../src/utils/styles";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getItemsFromListId, getListFromId } from "../src/utils/storage";
import SvgItem from "../src/utils/svg-item";
import ListContainer from "../src/list/list-container";

export default function List() {
    return <ListContainer />
}