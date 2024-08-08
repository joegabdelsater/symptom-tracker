import { createBrowserRouter } from "react-router-dom";
import OverviewSectionsList from "../features/OverviewListing/screens/OverviewSectionsList";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <OverviewSectionsList />,
    },
    {
        path: "/overview",
        element: <OverviewSectionsList />,
    },
]);
