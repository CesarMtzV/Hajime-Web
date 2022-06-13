import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import React, { useEffect, useState } from "react";
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
import NavBar from "./components/NavBar/NavBar";
import { loggedIn_routes } from "./static/navbarRoutes";

const App = () => {
    const [authToken, setAuthToken] = useState();
    const [email, setEmail] = useState();
    const [userName, setUserName] = useState();
    const [name, setName] = useState();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [render, setRender] = useState(true);
    const [kanjiSets, setKanjiSets] = useState([]);

    const setToken = (token) => {
        setAuthToken(token);
        setLocalToken(token);
        setRender(true);
        getLocalToken(setData, setRender);
    };

    // Es la función que se mandará a la función de getLocalToken
    const setData = (data) => {
        setEmail(data.email);
        setUserName(data.userName);
        setName(data.name);
        setKanjiSets(data.kanji_sets)
        setAuthToken(data.token);
        setLoggedIn(true);
    };

    const destroySession = () => {
        setLoggedIn(false);
        setEmail(undefined);
        setAuthToken(undefined);
        setName(undefined);
        setKanjiSets(undefined);
        setUserName(undefined);
        localStorage.removeItem("token");
    };

    useEffect(() => {
        getLocalToken(setData, setRender);
    }, [])

    if (render) {
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
                kanjiSets,
                isLoggedIn,
                setLoggedIn,
                destroySession,
            }}
        >
            <Router>
                {console.log(isLoggedIn)}
                {isLoggedIn ? <NavBar navbarRoutes={loggedIn_routes} /> : <></>}
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
                    <Route
                        path="/kanji"
                        element={
                            <ProtectedRoute token={authToken}>
                                <KanjiView />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/kanji/:set"
                        element={
                            <ProtectedRoute token={authToken}>
                                <KanjiSetView />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute token={authToken}>
                                <ProfileView />
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
