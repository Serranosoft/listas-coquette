import { useState } from "react";
import HeaderHome from "./header-home";
import AddListModal from "../modals/add-list-modal";
import { init, insertTest } from "../utils/storage";
import HeaderList from "./header-list";

export default function HeaderListContainer({ selectedItems }) {


    return <HeaderList {...{ selectedItems }} />
    
}