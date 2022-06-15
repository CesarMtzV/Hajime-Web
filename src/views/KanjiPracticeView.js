import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../components/auth/auth";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import axios from "axios";

export const KanjiPracticeView = () => {
    const params = useParams();
    const { kanjiSets } = useAuth();
    const title = params.set.split("_").join(" ");
    let kanji_list = [];
    kanjiSets.forEach((item, index) => {
        if (item.title === title) {
            kanji_list = item.kanji;
        }
    });

    function shuffleArray(arr) {
        return arr.sort((a, b) => 0.5 - Math.random());
    }

    const keys = kanji_list.map( function(item) { return item.kanji } )
    const values = kanji_list.map( function(item) { return item.definitions } )
    const [quizScore, setQuizScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    var x = Math.floor(Math.random() * keys.length);
    const [currCharacter, setCurrentCharacter] = useState({
        questionText: keys[x],
        answerOption: shuffleArray([
            { 
                answerText: values[x], 
                isCorrect: true 
            },
            {
                answerText: values[Math.floor(Math.random() * keys.length)],
                isCorrect: false,
            },
            {
                answerText: values[Math.floor(Math.random() * keys.length)],
                isCorrect: false,
            },
            {
                answerText: values[Math.floor(Math.random() * keys.length)],
                isCorrect: false,
            },
        ]),
    });

    useEffect(() => {
        const fetchData = async () => {
            var token = localStorage.getItem("token");

            const data = await fetch("/api/achievements/kanjiHighScore", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            let score;
            if (data) {
                score = await data.json();
            }

            if (score) {                   
                setHighScore(score.kanjiHighScore);
            }
        }

        fetchData();
    }, [setQuizScore])
    
    const updateHighScore = async (quizScore) => {
        var token = localStorage.getItem("token");

        await axios.post("/api/achievements/kanjiHighScore", {'kanjiHighScore': quizScore}, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
    }

    const handleAnswerOptionClick = async (isCorrect) => {
        var aux = Math.floor(Math.random() * keys.length);

        if (isCorrect) {
            toast.success("Nice!", { duration: 1000 });
            setQuizScore(quizScore + 1);

            if (quizScore + 1 > highScore) {
                // const ach = await getAchievements();

                // if (highScore !== 0) {
                //     if (ach[1].progress === 0) {
                //         ach[1].progress = 1;
                //         await updateAchievements(ach);
                //     }
                // }

                // if (ach[8].progress < 1) {
                //     if (ach[8].progress < (quizScore + 1) / 30) {
                //         ach[8].progress = (quizScore + 1) / 30;
                //         await updateAchievements(ach);
                //     }
                // }

                setHighScore(quizScore + 1);
                updateHighScore(quizScore + 1);
            }
        } else {
            toast.error("Try again!", { duration: 1000 });
            setQuizScore(0);
        }

        const nextCharacter = {
            questionText: keys[aux],
            answerOption: shuffleArray([
                { answerText: values[aux], isCorrect: true },
                {
                    answerText: values[Math.floor(Math.random() * keys.length)],
                    isCorrect: false,
                },
                {
                    answerText: values[Math.floor(Math.random() * keys.length)],
                    isCorrect: false,
                },
                {
                    answerText: values[Math.floor(Math.random() * keys.length)],
                    isCorrect: false,
                },
            ]),
        };
        setCurrentCharacter(nextCharacter);
    };

    return (
        <motion.div
            className="main-content"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <div>
                <Toaster />
            </div>
            <div className="row">
                <div className="card align-items-center mt-3 pb-3 h-100 bg-transparent border-0">
                    <div className="d-flex align-items-center w-100 pt-2">
                        <h2 className="card-title px-4 fw-bold">Quiz Mode</h2>
                        <div className="ms-auto d-flex">
                            <h2 className="px-4 fw-bold">High Score:</h2>
                            <h2
                                className="fw-bold me-3"
                                style={{ color: "#b98cb3" }}
                            >
                                {highScore}
                            </h2>
                            <h2 className="ms-auto px-4 fw-bold">Score:</h2>
                            <h2
                                className="fw-bold me-3"
                                style={{ color: "#b98cb3" }}
                            >
                                {quizScore}
                            </h2>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center h-100 w-100 mt-3">
                        <div className="cardHiragana h-75 w-100 mx-5">
                            <p style={{ fontSize: "20rem" }}>
                                {currCharacter.questionText}
                            </p>
                        </div>
                        <div className="hiraganaPractice h-75 w-100 me-5">
                            {currCharacter.answerOption.map(
                                (answerOption, index) => (
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        key={index}
                                        className="btnHiraganaPractice"
                                        onClick={() =>
                                            handleAnswerOptionClick(
                                                answerOption.isCorrect
                                            )
                                        }
                                    >
                                        <span>{answerOption.answerText}</span>
                                    </motion.button>
                                )
                            )}
                        </div>
                    </div>
                    {/* <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="hajime-button ms-auto me-3 text-white"
                        onClick={() => handleQuizMode()}
                    >
                        Practice
                    </motion.button> */}
                </div>
            </div>
        </motion.div>
    );
};
