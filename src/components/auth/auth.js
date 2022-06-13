import axios from "axios";

import { createContext, useContext } from "react";

export const AuthContext = createContext();

// Custom hook
export function useAuth() {
    return useContext(AuthContext);
}

export function getLocalToken(setData, setRender) {
    var token = localStorage.getItem("token");
    
    if (!token) {
        setRender(false);
        return;
    }

    axios
        .get("/api/home/", { headers: { Authorization: `Bearer ${token}` } })
        .then((result) => {
            axios.defaults.headers.common = {
                Authorization: `Bearer ${token}`,
            };
            setData({
                ...result.data,
                token,
            });
            setRender(false);
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("token");
            }
            setRender(false);
            return;
        });
}

export function setLocalToken(token) {
    localStorage.setItem("token", token);
}

