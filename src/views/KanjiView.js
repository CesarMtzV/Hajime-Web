import React, { useState } from "react";
import { KanjiSetCard } from "../components/Kanji/KanjiSetCard";
import { useAuth } from "../components/auth/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { kanjiSetSchema } from "../static/schema";
import axios from "axios";
import { motion } from "framer-motion";
import NewModal from '../components/NewModal/NewModal';

export const KanjiView = () => {
    const { userName, kanjiSets } = useAuth();
    const [buttonPopup, setButtonPopup] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(kanjiSetSchema) });
    const [error, setError] = useState(null);

    const onSubmit = (data) => {
        const kanji_set = {
            title: data.title,
            kanji: [],
        };

        axios
            .post("/api/kanji/set", { userName, kanji_set })
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

    return (
        <>
            <div className="container">
                <h1 className="my-5 fw-bold">Your Kanji sets</h1>

                {/* KANJI SETS GRID */}
                <div className="row">
                    {kanjiSets.map((set, key) => {
                        return (
                            <KanjiSetCard
                                key={key}
                                title={set.title}
                                numberOfKanji={set.kanji.length}
                            />
                        );
                    })}
                </div>

                {/* POP UP MENU FOR CREATING NEW KANJI SET */}
                <NewModal
                    isActive={buttonPopup}
                    popModal={setButtonPopup}
                    title="New kanji set"
                    showHeader={true}
                    showOverlay={true}
                    alignModal={'center'}
                    paddingModal={'10px'}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-outline mb-4">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                {...register("title")}
                            />
                            <p className="text-danger fst-italic">
                                {errors.title?.message}
                            </p>
                            <div>
                                <motion.button
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.9}}
                                    className="hajime-button text-white p-2"
                                    type="submit"
                                >
                                    Create
                                </motion.button>
                            </div>
                            {error && (
                                <p className="text-danger fst-italic">
                                    {error}
                                </p>
                            )}
                        </div>
                    </form>
                </NewModal>

                {/* NEW SET BUTTON */}
                <div className="d-flex justify-content-end">
                    <motion.button
                        whileHover={{scale: 1.1}}
                        whileTap = {{scale: 0.9}}
                        className="hajime-button text-white mt-2"
                        onClick={() => setButtonPopup(true)}
                    >
                        + New set
                    </motion.button>
                </div>
            </div>
        </>
    );
};
