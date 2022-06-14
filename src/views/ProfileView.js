import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAuth } from "../components/auth/auth";


export const ProfileView = () => {
    const { destroySession, email, name, userName } = useAuth();

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-4 text-center p-5">
                        <img
                            className="img-fluid rounded-circle"
                            style={{ width: "200px", height: "200px" }}
                            alt="Profile"
                            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmir-s3-cdn-cf.behance.net%2Fproject_modules%2Fdisp%2Fe034cb46865457.5867907fb1cae.png&f=1&nofb=1"
                        />
                        <div className="w-100"></div>
                        <button
                            type="button"
                            className="btn btn-secondary mt-3"
                        >
                            <FontAwesomeIcon icon={faShuffle} />
                        </button>
                    </div>

                    <div className="col-12 col-lg-8 p-5">
                        <h1 className="mb-5">Profile information</h1>

                        <h3>
                            <span className="fw-bold">Name: </span> {name}
                        </h3>
                        <h3>
                            <span className="fw-bold">Username: </span>{" "}
                            {userName}
                        </h3>
                        <h3>
                            <span className="fw-bold">Email: </span>
                            {email}
                        </h3>

                        <button
                            type="button"
                            className="btn btn-danger mt-5"
                            onClick={destroySession}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
