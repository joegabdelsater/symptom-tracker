import { createBrowserRouter } from "react-router-dom";
import OverviewSectionsList from "../features/OverviewListing/screens/OverviewSectionsList";
import TodayScreen from "../features/OverviewListing/screens/TodayScreen";
import CreateMealScreen from "../features/CreateEntry/screens/CreateMealScreen";
import CreateSymptomsScreen from "../features/CreateEntry/screens/CreateSymptomsScreen";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <TodayScreen />,
    },
    {
        path: "/overview",
        element: <OverviewSectionsList />,
    },
    {
        path: "/meal/create",
        element: <CreateMealScreen />,
    },
    {
        path: "/symptoms/create",
        element: <CreateSymptomsScreen />,
    },
]);
