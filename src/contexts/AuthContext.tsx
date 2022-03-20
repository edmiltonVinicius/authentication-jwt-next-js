import Router from 'next/router';
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies';

import { recoverUserInformation, signinRequest } from "../services/auth";
import { api } from '../services/api';

type UserProps = {
    name: string;
    email: string;
    avatar_url: string;
};

type SignInData = {
    email: string;
    password: string;
};

type AuthContextType = {
    isAuthenticated: boolean;
    user: UserProps;
    signIn: (data: SignInData) => Promise<void>
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
    const [user, setUser] = useState<UserProps | null>(null);

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'authentication-next-token': token } = parseCookies();

        if (token) {
            recoverUserInformation()
                .then(response => setUser(response.user));
        }

    }, []);

    async function signIn({ email, password } : SignInData) {
        const { token, user } = await signinRequest({ email, password });

        setCookie(undefined, 'authentication-next-token', token, {
            maxAge: 60 * 60 * 60, // 1 hour
        });

        setUser(user);

        api.defaults.headers['Auhtorization'] = `Bearer ${token}`;

        Router.replace('/dashboard');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}