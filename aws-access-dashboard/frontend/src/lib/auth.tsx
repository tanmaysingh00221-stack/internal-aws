import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import type { User } from "../types";
import { api } from "./api";

type Ctx = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [user, setUser] = useState<User | null>(() => {
        try {
            return JSON.parse(
                localStorage.getItem("user") || "null"
            );
        } catch {
            return null;
        }
    });

    async function login(
        email: string,
        password: string
    ) {
        const r = await api<{
            token: string;
            user: User;
        }>("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
        });

        localStorage.setItem("token", r.token);
        localStorage.setItem(
            "user",
            JSON.stringify(r.user)
        );

        setUser(r.user);
    }

    function logout() {
        localStorage.clear();
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)!;