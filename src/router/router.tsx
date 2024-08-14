import { useMemo } from "react";
import OverviewSectionsList from "../features/OverviewListing/screens/OverviewSectionsList";
import TodayScreen from "../features/OverviewListing/screens/TodayScreen";
import CreateMealScreen from "../features/CreateEntry/screens/CreateMealScreen";
import CreateSymptomsScreen from "../features/CreateEntry/screens/CreateSymptomsScreen";
import LoginScreen from "../screens/LoginScreen";
import { useAuth } from "../contexts/auth";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";


const AppRouter = () => {
    const { token } = useAuth();

    const routes = useMemo(() => {
        if (token) {
            return (
                <Routes>
                    <Route path="/today" element={<TodayScreen />} />
                    <Route path="/overview" element={<OverviewSectionsList />} />
                    <Route path="/meal/create" element={<CreateMealScreen />} />
                    <Route path="/symptoms/create" element={<CreateSymptomsScreen />} />
                    <Route path="*" element={<Navigate to="/today" />} />
                </Routes>
            )
        }
        return (
            <Routes>
                <Route path="/login" element={<LoginScreen />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        )
    }, [token])

    return routes
}

export default AppRouter;