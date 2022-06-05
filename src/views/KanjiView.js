import React from "react";
import { KanjiSetCard } from "../components/KanjiSetCard";
import NavBar from "../components/NavBar/NavBar";
import { loggedIn_routes } from "../static/navbarRoutes";

export const KanjiView = () => {
    return (
        <>
            <NavBar navbarRoutes={loggedIn_routes} />
            <div className="container">
                <h1 className="my-5">Your Kanji sets</h1>

                <div className="row">
                    <KanjiSetCard title="Leccion 1" numberOfKanji={12} />
                    <KanjiSetCard title="Leccion 2" numberOfKanji={12} />
                    <KanjiSetCard title="Leccion 3" numberOfKanji={12} />
                    <KanjiSetCard title="Practice N5" numberOfKanji={25} />
                    <KanjiSetCard title="Random" numberOfKanji={32} />
                </div>

                <div className="d-flex justify-content-end">
                    <div>
                        <button
                            className="btn btn-primary btn-lg rounded-pill btn-info text-white fw-bold px-3"
                        >
                            + New set
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
