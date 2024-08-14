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
                    <Route path="symptom-tracker/today" element={<TodayScreen />} />
                    <Route path="symptom-tracker/overview" element={<OverviewSectionsList />} />
                    <Route path="symptom-tracker/meal/create" element={<CreateMealScreen />} />
                    <Route path="symptom-tracker/symptoms/create" element={<CreateSymptomsScreen />} />
                    <Route path="*" element={<Navigate to="symptom-tracker/today" />} />
                </Routes>
            )
        }
        return (
            <Routes>
                <Route path="symptom-tracker/login" element={<LoginScreen />} />
                <Route path="*" element={<Navigate to="symptom-tracker/login" />} />
            </Routes>
        )
    }, [token])

    return routes
}

export default AppRouter;