import { useState } from "react";
import HeaderHome from "./header-home";
import AddListModal from "../modals/add-list-modal";
import { init, insertTest } from "../utils/storage";

export default function HeaderHomeContainer({ setOpenAddModal, openAddModal }) {


    return (
        <>
            <HeaderHome {...{ setOpenAddModal }} />
            <AddListModal {...{ setOpenAddModal, openAddModal }} />
        </>

    )
}