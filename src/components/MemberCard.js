import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "../style.css";

export const MemberCard = ({ name, role, github_link, profile_picture }) => {
    return (
        <div className="col-xl-3 col-sm-6 mb-5">
            <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                    src={profile_picture}
                    alt="Profile"
                    width="100"
                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">{name}</h5>
                <span className="small text-uppercase text-muted">
                    {role}
                </span>
                <ul className="social mb-0 list-inline mt-3">
                    <li className="list-inline-item">
                        <a
                            href={github_link}
                            target="_blank"
                            rel="noreferrer"
                            className="social-link"
                        >
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};
