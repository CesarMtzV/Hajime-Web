import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { welcomeView_routes } from "../static/navbarRoutes";

export const WelcomeView = () => {
    return (
        <>
            {/* ***** NAVBAR ***** */}
            <NavBar navbarRoutes={welcomeView_routes} />

            {/* ****** MAIN CONTENT ***** */}
            <div className="container d-flex align-items-center flex-column">
                <img
                    src={require("../assets/WhiteBG_LogoHajime.png")}
                    alt="Logo"
                    className="img-fluid"
                    style={{ width: "15rem" }}
                />
                <h1>Hajime</h1>
                <p className="" style={{ fontSize: "1.25rem" }}>
                    Japanese learning app
                </p>
            </div>
        </>
    );
};
