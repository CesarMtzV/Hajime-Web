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

    const getAchievements = async () => {
        var token = localStorage.getItem("token");

        const data = await fetch("/api/achievements/getAchievements", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        let achievements;
        if (data) {
            achievements = await data.json();
        }

        return achievements.achievements;
    };

    const updateAchievements = async (updatedAchievements) => {
        var token = localStorage.getItem("token");

        await axios.post(
            "/api/achievements/setAchievements",
            { updatedAchievements: updatedAchievements },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    };

    const onSubmit = async (data) => {
        const kanji_set = {
            title: data.title,
            kanji: [],
        };

        axios
            .post("/api/kanji/set", { userName, kanji_set })
            .then(async (result) => {
                const ach = await getAchievements();

                if (ach[5].progress !== 1) {
                    ach[5].progress = 1;
                    await updateAchievements(ach);
                }

                if (ach[6].progress < 1) {
                    ach[6].progress += 0.1;
                    ach[6].progress = ach[6].progress.toFixed(2);
                    await updateAchievements(ach);
                }

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
            <motion.div
                className="main-content"
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: .5 }}
            >
                <div className="container">
                    <h1 className="pt-5 pb-3 fw-bold">Your Kanji sets</h1>

                    {/* KANJI SETS GRID */}
                    <div className="row cardsKanjiContainer">
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
                                        {errors.title?.message}
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
                            className="hajime-button text-white mt-2 mb-2"
                            onClick={() => setButtonPopup(true)}
                        >
                            + New set
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </>
    );
};
