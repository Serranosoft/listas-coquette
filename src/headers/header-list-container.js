import { deleteItemFromId } from "../utils/storage";
import HeaderList from "./header-list";
import { router } from "expo-router";

export default function HeaderListContainer({ setSelectedItems, selectedItems, getChecklist }) {

    function removeItems() {
        selectedItems.map(async (item) => await deleteItemFromId(item));
        setSelectedItems([]);
        getChecklist();
    }

    function back() {
        router.back();
    }

    return <HeaderList {...{ selectedItems, back, removeItems }} />
    
}