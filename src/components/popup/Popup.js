import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Popup.css";

export const Popup = (props) => {
    return props.trigger ? (
        <div className="popup">
            <div className="popup-inner">
                <button
                    className="close-btn"
                    onClick={() => props.setPopUp(false)}
                >
                    <FontAwesomeIcon style={{width: "25px", height: "25px"}} icon={faCircleXmark} />
                </button>
                {props.children}
            </div>
        </div>
    ) : (
        ""
    );
};
