import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { welcomeView_routes } from "../static/navbarRoutes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "../style.css";

export const AboutView = () => {
    return (
        <>
            <NavBar navbarRoutes={welcomeView_routes} />
            <div className="container py-5">
                <div className="row text-center">
                    <div className="col-lg-8 mx-auto">
                        <h1 className="display-4">About Us</h1>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row text-center">
                    {/* <!-- Team item --> */}
                    <div className="col-xl-3 col-sm-6 mb-5">
                        <div className="bg-white rounded shadow-sm py-5 px-4">
                            <img
                                src="https://avatars.githubusercontent.com/u/42587773?v=4"
                                alt="César"
                                width="100"
                                className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                            />
                            <h5 className="mb-0">César Martínez</h5>
                            <span className="small text-uppercase text-muted">
                                Programmer
                            </span>
                            <ul className="social mb-0 list-inline mt-3">
                                <li className="list-inline-item">
                                    <a
                                        href="https://github.com/CesarMtzV"
                                        className="social-link"
                                    >
                                        <FontAwesomeIcon icon={faGithub} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <!-- Team item --> */}
                    <div className="col-xl-3 col-sm-6 mb-5">
                        <div className="bg-white rounded shadow-sm py-5 px-4">
                            <img
                                src="https://avatars.githubusercontent.com/u/43385032?v=4"
                                alt="César"
                                width="100"
                                className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                            />
                            <h5 className="mb-0">Alex Vargas</h5>
                            <span className="small text-uppercase text-muted">
                                Programmer
                            </span>
                            <ul className="social mb-0 list-inline mt-3">
                                <li className="list-inline-item">
                                    <a
                                        href="https://github.com/alexvargas01"
                                        className="social-link"
                                    >
                                        <FontAwesomeIcon icon={faGithub} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <!-- Team item --> */}
                    <div className="col-xl-3 col-sm-6 mb-5">
                        <div className="bg-white rounded shadow-sm py-5 px-4">
                            <img
                                src="https://avatars.githubusercontent.com/u/54334789?v=4"
                                alt="César"
                                width="100"
                                className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                            />
                            <h5 className="mb-0">Daniel David</h5>
                            <span className="small text-uppercase text-muted">
                                Programmer
                            </span>
                            <ul className="social mb-0 list-inline mt-3">
                                <li className="list-inline-item">
                                    <a
                                        href="https://github.com/Danyboyyy"
                                        className="social-link"
                                    >
                                        <FontAwesomeIcon icon={faGithub} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <!-- Team item --> */}
                    <div className="col-xl-3 col-sm-6 mb-5">
                        <div className="bg-white rounded shadow-sm py-5 px-4">
                            <img
                                src="https://avatars.githubusercontent.com/u/78878007?v=4"
                                alt="César"
                                width="100"
                                className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                            />
                            <h5 className="mb-0">Santiago Cano</h5>
                            <span className="small text-uppercase text-muted">
                                Programmer
                            </span>
                            <ul className="social mb-0 list-inline mt-3">
                                <li className="list-inline-item">
                                    <a
                                        href="https://github.com/canosantiago12"
                                        className="social-link"
                                    >
                                        <FontAwesomeIcon icon={faGithub} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
