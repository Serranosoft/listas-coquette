import { Alert, Dimensions, Platform, Text, ToastAndroid, View } from "react-native"
import { layout, padding, ui } from "../utils/styles"
// import { ContributionGraph } from "react-native-chart-kit";
import { useContext, useEffect, useState } from "react";
import { getAllList, getItemsFromListId } from "../utils/storage";
import { convertStringDateToDateObject, parseDateToString } from "../utils/date";
import { LangContext } from "../utils/Context";

export default function SummaryChart() {

    const { language } = useContext(LangContext);
    const [changes, setChanges] = useState([]);

    useEffect(() => {
        groupByLastUpdate();
    }, [])


    async function groupByLastUpdate() {
        // Obtengo todas las listas
        const lists = await getAllList();

        // JSON donde agrupar cada fecha
        const group = {};

        // Para cada lista obtengo sus registros
        for (let i = 0; i < lists.length; i++) {
            let items = await getItemsFromListId(lists[i].id);
            // Itero cada item de la lista actual
            items.forEach(item => {
                // Obtengo el last_update del item en cuestión
                let { last_update } = item;
                last_update = parseDateToString(convertStringDateToDateObject(last_update));
                // Si en el last_update hay un json con esa fecha, le aumenta el count
                // sino crea un objeto dentro del json
                if (group[last_update]) {
                    group[last_update].count += 1;
                } else {
                    group[last_update] = {

                        date: last_update,
                        count: 1
                    };
                }
            });
        }

        setChanges(Object.values(group));
    }

    return (
        <View style={[layout.flex, padding.bigVertical]}>
            {changes.length > 0 &&
                <>
                    <Text style={[ui.h4, ui.black, padding.mediumHorizontal, ui.center]}>{language.t("_summaryChartTitle")}</Text>
                    <Text style={[ui.muted, ui.center, padding.mediumHorizontal]}>{language.t("_summaryChartSubtitle")}</Text>

                    {/* <ContributionGraph
                        values={changes}
                        endDate={`${new Date().getFullYear()}-0${new Date().getMonth() + 4}-01`}
                        numDays={105}
                        width={Dimensions.get("window").width}
                        height={220}
                        onDayPress={({ count, date }) => count > 0 && Platform.OS === "android" ? ToastAndroid.showWithGravityAndOffset(`${count} tareas creadas el día ${date}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) : Alert.alert(`${count} tareas creadas el día ${date}`)}
                        chartConfig={{
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            color: (opacity = 1) => `rgba(204, 82, 122, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                    /> */}
                </>

            }
        </View>
    )
}