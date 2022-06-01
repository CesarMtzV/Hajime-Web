import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import { WelcomeView } from "./views/WelcomeView";
import { NotFoundView } from "./views/NotFoundView";
import { ProtectedRoute } from "./components/ProtectedRoute";
import {
    AuthContext,
    getLocalToken,
    setLocalToken,
} from "./components/auth/auth";
import HiraganaPracticeView from "./views/HiraganaPracticeView";
import KatakanaPracticaView from "./views/KatakanaPracticeView";
import { AboutView } from "./views/AboutView";

const App = () => {
    const [authToken, setAuthToken] = useState();
    const [email, setEmail] = useState();
    const [userName, setUserName] = useState();
    const [name, setName] = useState();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [render, setRender] = useState(true);

    const setToken = (token) => {
        setAuthToken(token);
        setLocalToken(token);
        setRender(true);
    };

    // Es la función que se mandará a la función de getLocalToken
    const setData = (data) => {
        setEmail(data.email);
        setUserName(data.userName);
        setName(data.name);
        setAuthToken(data.token);
        setLoggedIn(true);
    };

    const destroySession = () => {
        setLoggedIn(false);
        setEmail(undefined);
        setAuthToken(undefined);
        setName(undefined);
        setUserName(undefined);
        localStorage.removeItem("token");
    };

    if (render) {
        // setRender(false);
        getLocalToken(setData, setRender);
        return <></>;
    }

    return (
        <AuthContext.Provider
            value={{
                authToken,
                setAuthToken: setToken,
                email,
                name,
                userName,
                isLoggedIn,
                setLoggedIn,
                destroySession,
            }}
        >
            <Router>
                <Routes>
                    <Route path="/" element={<WelcomeView />} />
                    <Route path="/about" element={<AboutView />} />
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute token={authToken}>
                                <HomeView />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/hiragana"
                        element={
                            <ProtectedRoute token={authToken}>
                                <HiraganaPracticeView />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/katakana"
                        element={
                            <ProtectedRoute token={authToken}>
                                <KatakanaPracticaView />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<LoginView />} />
                    <Route path="/register" element={<RegisterView />} />
                    <Route path="*" element={<NotFoundView />} />
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
