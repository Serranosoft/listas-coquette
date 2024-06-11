import { useEffect, useState } from "react";
import HeaderHome from "./header-home";
import AddListModal from "../modals/add-list-modal";
import { deleteListFromId, init, insertTest } from "../utils/storage";
import DeleteModal from "../modals/delete-confirmation-modal";

export default function HeaderHomeContainer({ setSelectedLists, selectedLists, fetchDb }) {

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    function removeList() {
        selectedLists.forEach(list => deleteListFromId(list));
        setSelectedLists([]);
    }

    useEffect(() => {
        if (!openAddModal || !openDeleteModal) {
            fetchDb();
        }
    }, [openAddModal, openDeleteModal])

    return (
        <>
            <HeaderHome {...{ setOpenAddModal, selectedLists, setOpenDeleteModal }} />
            <AddListModal {...{ setOpenAddModal, openAddModal }} />
            <DeleteModal {...{ setOpenDeleteModal, openDeleteModal, removeList }} />
        </>

    )
}