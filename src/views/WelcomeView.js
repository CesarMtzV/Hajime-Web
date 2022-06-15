import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { welcomeView_routes } from "../static/navbarRoutes";
import { motion } from "framer-motion";

export const WelcomeView = () => {
    return (
        <>
            <div className="landing-content">
                <div className="grayOverlay">
                    <NavBar navbarRoutes={welcomeView_routes} />
                    {/* ****** MAIN CONTENT ***** */}
                    <motion.div 
                        className="container d-flex align-items-center flex-column"
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 100 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 1 }}
                    >
                        <img
                            src={require("../assets/PinkNoBG_HajimeLogo.png")}
                            alt="Logo"
                            className="img-fluid mt-5"
                            style={{ width: "20rem" }}
                        />
                        <h1 className="mt-4 text-white" style={{ fontSize: "5rem", fontWeight:"600" }}>Hajime</h1>
                        <p className="text-white" style={{ fontSize: "3rem" }}>
                            Japanese learning app
                        </p>
                    </motion.div>
                </div>
            </div>
            {/* ***** NAVBAR ***** */}
        </>
    );
};
