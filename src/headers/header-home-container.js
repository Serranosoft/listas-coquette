import { useState } from "react";
import HeaderHome from "./header-home";
import AddListModal from "../modals/add-list-modal";

export default function HeaderHomeContainer() {

    const [openAddModal, setOpenAddModal] = useState(false);



    return (
        <>
            <HeaderHome {...{ setOpenAddModal }} />
            <AddListModal {...{ openAddModal }} />
        </>

    )
}