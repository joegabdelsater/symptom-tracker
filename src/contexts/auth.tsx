import React, { createContext, useContext, useState } from 'react';

interface authContext {
    token: string | null;
    login: (userData: any) => void;
    logout: () => void;
}
const AuthContext = createContext<authContext>({
    token: null,
    login: (token) => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    const login = (token: string | null) => {
        if (!token) return;

        setToken(token);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (<AuthContext.Provider value={{ token, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
