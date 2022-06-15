import React, { useState } from "react";
import { useAuth } from "../components/auth/auth";
import pp1 from "../assets/profile-pictures/profilePreset_1.jpg";
import pp2 from "../assets/profile-pictures/profilePreset_2.jpg";
import pp3 from "../assets/profile-pictures/profilePreset_3.jpg";
import pp4 from "../assets/profile-pictures/profilePreset_4.jpg";
import pp5 from "../assets/profile-pictures/profilePreset_5.jpg";
import pp6 from "../assets/profile-pictures/profilePreset_6.jpg";
import pp7 from "../assets/profile-pictures/profilePreset_7.jpg";
import pp8 from "../assets/profile-pictures/profilePreset_8.jpg";
import pp9 from "../assets/profile-pictures/profilePreset_9.jpg";
import axios from "axios";
import { motion } from "framer-motion";

export const ProfileView = () => {
    const { destroySession, email, name, userName, pp } = useAuth();

    const [showProfilePictures, setShowProfilePictures] = useState(false);
    const [profilePicture, setProfilePicture] = useState();

    const onClickToggleProfilePicture = () => {
        setShowProfilePictures(!showProfilePictures);
    };

    const onClickProfilePicture = (pp) => {
        setProfilePicture(pp);
    };

    const updateProfilePicture = async () => {
        var token = localStorage.getItem("token");

        await axios.post(
            "/api/users/setpp",
            { pp: profilePicture },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        window.location.reload();
    };

    return (
        <>
            <motion.div
                className="main-content"
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: .5 }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-4 text-center p-5">
                            <img
                                className="img-fluid rounded-circle"
                                style={{ width: "200px", height: "200px" }}
                                alt="Profile"
                                src={profilePicture ? profilePicture : pp}
                            />
                            <div className="w-100"></div>
                            <button
                                type="button"
                                className="btn btn-secondary mt-3"
                                onClick={onClickToggleProfilePicture}
                            >
                                Change Profile Picture
                            </button>
                        </div>
                        {showProfilePictures ? (
                            <div
                                className="modal"
                                style={{ display: "block" }}
                                tabIndex="-1"
                            >
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">
                                                Select Your Profile Picture
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={
                                                    onClickToggleProfilePicture
                                                }
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <img
                                                        src={pp1}
                                                        className="ppImage"
                                                        onClick={() =>
                                                            onClickProfilePicture(
                                                                pp1
                                                            )
                                                        }
                                                        aria-hidden
                                                        alt="profile-picture-1"
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <img
                                                        src={pp4}
                                                        className="ppImage"
                                                        onClick={() =>
                                                            onClickProfilePicture(
                                                                pp4
                                                            )
                                                        }
                                                        aria-hidden
                                                        alt="profile-picture-2"
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <img
                                                        src={pp2}
                                                        className="ppImage"
                                                        onClick={() =>
                                                            onClickProfilePicture(
                                                                pp2
                                                            )
                                                        }
                                                        aria-hidden
                                                        alt="profile-picture-3"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-md-4">
                                                    <img
                                                        src={pp3}
                                                        className="ppImage"
                                                        onClick={() =>
                                                            onClickProfilePicture(
                                                                pp3
                                                            )
                                                        }
                                                        aria-hidden
                                                        alt="profile-picture-4"
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <img
                                                        src={pp5}
                                                        className="ppImage"
                                                        onClick={() =>
                                                            onClickProfilePicture(
                                                                pp5
                                                            )
                                                        }
                                                        aria-hidden
                                                        alt="profile-picture-5"
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <img
                                                        src={pp6}
                                                        className="ppImage"
                                                        onClick={() =>
                                                            onClickProfilePicture(
                                                                pp6
                                                            )
                                                        }
                                                        aria-hidden
                                                        alt="profile-picture-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-md-4">
                                                    <img
                                                        src={pp7}
                                                        className="ppImage"
                                                        onClick={() =>
                                                            onClickProfilePicture(
                                                                pp7
                                                            )
                                                        }
                                                        aria-hidden
                                                        alt="profile-picture-7"
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <img
                                                        src={pp8}
                                                        className="ppImage"
                                                        onClick={() =>
                                                            onClickProfilePicture(
                                                                pp8
                                                            )
                                                        }
                                                        aria-hidden
                                                        alt="profile-picture-8"
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <img
                                                        src={pp9}
                                                        className="ppImage"
                                                        onClick={() =>
                                                            onClickProfilePicture(
                                                                pp9
                                                            )
                                                        }
                                                        aria-hidden
                                                        alt="profile-picture-9"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-dark btn-lg btn-block mt-2"
                                                onClick={updateProfilePicture}
                                                aria-label="Close"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
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
            </motion.div>
        </>
    );
};
