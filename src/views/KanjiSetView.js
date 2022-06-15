import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../components/auth/auth";
import { kanjiCharacterSchema } from "../static/schema";
import axios from "axios";
import { KanjiCard } from "../components/Kanji/KanjiCard";
import NewModal from "../components/NewModal/NewModal";
import { motion } from "framer-motion";

export const KanjiSetView = () => {
    const params = useParams();
    const { userName, kanjiSets } = useAuth();
    const navigate = useNavigate();
    const [buttonPopup, setButtonPopup] = useState(false);
    const [error, setError] = useState(null);
    const [quizButtonStatus, setQuizButtonStatus] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(kanjiCharacterSchema) });

    const title = params.set.split("_").join(" ");
    let kanji_list = [];
    kanjiSets.forEach((item, index) => {
        if (item.title === title) {
            kanji_list = item.kanji;
        }
    });

    useEffect(() => {
        if (kanji_list.length > 5) {
            setQuizButtonStatus(true);
        }
    }, []);

    const onSubmit = (data) => {
        const kanji = {
            kanji: data.kanji,
            spelling: data.spelling,
            definitions: data.definitions,
            strokes: data.strokes,
            examples: data.examples,
        };

        axios
            .post("/api/kanji/set/character", {
                userName,
                set_title: title,
                kanji,
            })
            .then((result) => {
                setButtonPopup(false);
                window.location.reload();
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setError(error.response.data.body);
                }
            });
    };

    function CreateNewKanjiForm() {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-outline mb-4">
                    {/* KANJI */}
                    <label className="form-label">Kanji</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        {...register("kanji")}
                    />
                    <p className="text-danger fst-italic">
                        {errors.kanji?.message}
                    </p>

                    {/* SPELLING */}
                    <label className="form-label">Spelling</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        {...register("spelling")}
                    />
                    <p className="text-danger fst-italic">
                        {errors.spelling?.message}
                    </p>

                    {/* DEFINITIONS */}
                    <label className="form-label">Definitions</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        {...register("definitions")}
                    />
                    <p className="text-danger fst-italic">
                        {errors.definitions?.message}
                    </p>

                    {/* STROKES */}
                    <label className="form-label">Number of strokes</label>
                    <input
                        type="number"
                        className="form-control form-control-lg"
                        {...register("strokes")}
                    />
                    <p className="text-danger fst-italic">
                        {errors.strokes?.message}
                    </p>

                    {/* EXAMPLES */}
                    <label className="form-label">Examples</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        {...register("examples")}
                    />
                    <p className="text-danger fst-italic">
                        {errors.examples?.message}
                    </p>

                    <div className="pt-1 mb-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="hajime-button text-white text-light fw-bold"
                            type="submit"
                        >
                            Create
                        </motion.button>
                    </div>
                    {error && <p className="text-danger fst-italic">{error}</p>}
                </div>
            </form>
        );
    }

    return (
        <>
            <motion.div
                className="main-content"
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container">
                    <h1 className="text-center py-3 fw-bold">Set: {title}</h1>
                    {kanji_list.length === 0 ? (
                        <div>
                            <div
                                className="card w-50 text-center m-auto"
                                style={{ backgroundColor: "#F7F7F7" }}
                            >
                                <div className="card-body">
                                    <h1 className="card-title">
                                        You haven't added any Kanji to this set
                                    </h1>
                                    <p className="card-text">
                                        Add some Kanji to be displayed
                                    </p>
                                </div>
                            </div>

                            <NewModal
                                isActive={buttonPopup}
                                popModal={setButtonPopup}
                                title="New kanji set"
                                showHeader={true}
                                showOverlay={true}
                                alignModal={"center"}
                                paddingModal={"10px"}
                            >
                                <h3 className="mb-3">New kanji</h3>
                                {CreateNewKanjiForm()}
                            </NewModal>

                            <div className="d-flex justify-content-end">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="hajime-button text-white fw-bold px-3"
                                    onClick={() => setButtonPopup(true)}
                                >
                                    + New kanji
                                </motion.button>
                            </div>
                        </div>
                    ) : (
                        <div className="scroll">
                            {kanji_list.map((item, key) => {
                                return (
                                    <div key={key}>
                                        <KanjiCard
                                            kanji={item.kanji}
                                            spelling={item.spelling}
                                            definitions={item.definitions}
                                            strokes={item.strokes}
                                            examples={item.examples}
                                        />
                                    </div>
                                );
                            })}
                            <div>
                                <NewModal
                                    isActive={buttonPopup}
                                    popModal={setButtonPopup}
                                    title="New kanji set"
                                    showHeader={true}
                                    showOverlay={true}
                                    alignModal={"center"}
                                    paddingModal={"10px"}
                                >
                                    <h3 className="mb-3">New kanji</h3>
                                    {CreateNewKanjiForm()}
                                </NewModal>

                                
                            </div>
                        </div>
                    )}
                    <div className="d-flex justify-content-end">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="hajime-button text-white fw-bold px-3"
                            onClick={() => setButtonPopup(true)}
                        >
                            + New Kanji
                        </motion.button>

                        {quizButtonStatus ? (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="hajime-button text-white fw-bold px-3 mx-3"
                                onClick={() => navigate(`/kanji/${params.set}/practice`)}
                            >
                                Quiz
                            </motion.button>
                        ) : (
                            <div className="hajime-button mx-3 text-white fw-bold px-3">
                                You need more than 5 kanjis to access
                                quiz mode
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </>
    );
};
