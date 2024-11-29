import { useEffect, useState } from "react";
import HeaderHome from "./header-home";
import ListModal from "../modals/list-modal";
import { deleteListFromId } from "../utils/storage";
import DeleteModal from "../modals/delete-confirmation-modal";

export default function HeaderHomeContainer({ setSelectedLists, selectedLists, fetchDb }) {

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openListModal, setOpenListModal] = useState(false);

    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    function removeList() {
        selectedLists.forEach(list => deleteListFromId(list));
        setSelectedLists([]);
    }

    useEffect(() => {
        if (!openListModal || !openDeleteModal) {
            fetchDb();
        }
    }, [openListModal, openDeleteModal])

    return (
        <>
            <HeaderHome {...{ setOpenListModal, selectedLists, setOpenDeleteModal, visible, hideMenu, showMenu }} />
            <ListModal {...{ setOpenListModal, openListModal }} />
            <DeleteModal {...{ setOpenDeleteModal, openDeleteModal, removeList }} />
        </>

    )
}