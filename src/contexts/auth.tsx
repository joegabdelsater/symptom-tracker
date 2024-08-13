import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from "react-router-dom";

interface authContext {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;

}
const AuthContext = createContext<authContext>({
    token: null,
    setToken: (token: string) => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [token, setToken] = useLocalStorage("token", null);
    
    const login = (token: string | null) => {
        if (!token) return;

        setToken(token);
        navigate("/today", { replace: true });
    };

    const logout = () => {
        setToken(null);
        navigate("/login", { replace: true });
    };


    return (<AuthContext.Provider value={{
        token,
        setToken: login,
        logout,
    }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
