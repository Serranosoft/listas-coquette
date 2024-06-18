import { router } from "expo-router";
import HeaderSummary from "./header-summary";

export default function HeaderSummaryContainer() {

    function back() {
        router.back();
    }

    return <HeaderSummary {...{ back }} />
}