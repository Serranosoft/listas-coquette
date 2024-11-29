import { router } from "expo-router";
import HeaderBack from "./header-back";

export default function HeaderBackContainer({ title }) {

    function back() {
        router.back();
    }

    return <HeaderBack {...{ onBackPress: back, title }} />
}