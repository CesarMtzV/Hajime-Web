import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import axios from "axios";

const hira  = { 
    'あ' : 'A',
    'い' : 'I',
    'う' : 'U',
    'え' : 'E',
    'お' : 'O',
    'か' : 'Ka',
    'き' : 'Ki',
    'く' : 'Ku',
    'け' : 'Ke',
    'こ' : 'Ko',
    'さ' : 'Sa',
    'し' : 'Shi',
    'す' : 'Su',
    'せ' : 'Se',
    'そ' : 'So',
    'た' : 'Ta',
    'ち' : 'Chi',
    'つ' : 'Tsu',
    'て' : 'Te',
    'と' : 'To',
    'な' : 'Na',
    'に' : 'Ni',
    'ぬ' : 'Nu',
    'ね' : 'Ne',
    'の' : 'No',
    'は' : 'Ha',
    'ひ' : 'Hi',
    'ふ' : 'Fu',
    'へ' : 'He',
    'ほ' : 'Ho',
    'ま' : 'Ma',
    'み' : 'Mi',
    'む' : 'Mu',
    'め' : 'Me',
    'も' : 'Mo',
    'や' : 'Ya',
    'ゆ' : 'Yu',
    'よ' : 'Yo',
    'ら' : 'Ra',
    'り' : 'Ri',
    'る' : 'Ru',
    'れ' : 'Re',
    'ろ' : 'Ro',
    'わ' : 'Wa',
    'を' : 'Wo',
    'ん' : 'N',
};

function shuffleArray(arr) {
    return arr.sort((a, b) => 0.5 - Math.random());
}

const HiraganaPracticeView = () => {
    const keys = Object.keys(hira);
    const values = Object.values(hira);

    var x = Math.floor(Math.random() * keys.length);
    const [showQuiz, setQuizMode] = useState(false);

    const [currCharacter, setCurrentCharacter] = useState(
        {
            questionText: keys[x],
            answerOption: shuffleArray([
                {answerText: values[x], isCorrect: true},
                {answerText: values[Math.floor(Math.random() * keys.length)], isCorrect: false},
                {answerText: values[Math.floor(Math.random() * keys.length)], isCorrect: false},
                {answerText: values[Math.floor(Math.random() * keys.length)], isCorrect: false},
            ])});
    const [practiceScore, setPracticeScore] = useState(0);
    const [quizScore, setQuizScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            var token = localStorage.getItem("token");

            const data = await fetch("/api/achievements/hiraganaHighScore", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            let score;
            if (data) {
                score = await data.json();
            }

            if (score) {                   
                setHighScore(score.hiraganaHighScore);
            }
        }

        fetchData();
    }, [setQuizScore])

    const getAchievements = async () => {
        var token = localStorage.getItem("token");
        
        const data = await fetch("/api/achievements/getAchievements", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        let achievements;
        if (data) {
            achievements = await data.json();
        }

        return(achievements.achievements);
    }

    const updateAchievements = async (updatedAchievements) => {
        var token = localStorage.getItem("token");

        await axios.post("/api/achievements/setAchievements", {'updatedAchievements': updatedAchievements}, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
    }

    const updateHighScore = async (quizScore) => {
        var token = localStorage.getItem("token");

        await axios.post("/api/achievements/hiraganaHighScore", {'hiraganaHighScore': quizScore}, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
    }

    const handleAnswerOptionClick = async (isCorrect) => {
        var aux = Math.floor(Math.random() * keys.length);
        /* const nextCharacter = keys[aux];
        const nextValue = values[aux]; */

        if(!showQuiz) {
            if(isCorrect) {
                toast.success("Nice!", {duration: 1000});
                setPracticeScore(practiceScore + 1);
            } else {
                toast.error("Try again!", {duration: 1000});
                setPracticeScore(0);
            }
        } else {
            if(isCorrect) {
                toast.success("Nice!", {duration: 1000});
                setQuizScore(quizScore + 1);

                if (quizScore + 1 > highScore) {
                    const ach = await getAchievements();

                    if (highScore !== 0) {
                        if (ach[1].progress === 0) {
                            ach[1].progress = 100;
                            await updateAchievements(ach);
                        }
                    }

                    if (ach[8].progress < 1) {
                        if (ach[8].progress < 100) {
                            ach[8].progress += 10;
                            await updateAchievements(ach);
                        }
                    }

                    setHighScore(quizScore + 1);
                    updateHighScore(quizScore + 1);
                }
            } else {
                toast.error("Try again!", {duration: 1000});
                setQuizScore(0);
            }
        }

        const nextCharacter = {
            questionText: keys[aux],
            answerOption: shuffleArray([
                {answerText: values[aux], isCorrect: true},
                {answerText: values[Math.floor(Math.random() * keys.length)], isCorrect: false},
                {answerText: values[Math.floor(Math.random() * keys.length)], isCorrect: false},
                {answerText: values[Math.floor(Math.random() * keys.length)], isCorrect: false},
            ])
        }
        setCurrentCharacter(nextCharacter);
    }

    const handleQuizMode = async () => {

        if(!showQuiz) {
            setQuizMode(true);
            const ach = await getAchievements();

            if (ach[3].progress === 0) {
                ach[3].progress = 100;
                updateAchievements(ach);
            }
            setQuizScore(0);
            console.log(showQuiz);
        } else {
            setQuizMode(false);
            setPracticeScore(0);
            console.log(showQuiz);
        }
        
    }

    return (
        <>
            {showQuiz ?
                <motion.div className="main-content"
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: .5 }}>
                    <div><Toaster/></div>
                    <div className="row">
                        <div className="card align-items-center mt-3 pb-3 h-100 bg-transparent border-0">
                            <div className="d-flex align-items-center w-100 pt-2">
                                <h2 className="card-title px-4 fw-bold">Quiz Mode</h2>
                                <div className="ms-auto d-flex">
                                    <h2 className="px-4 fw-bold">High Score:</h2>
                                    <h2 className="fw-bold me-3" style={{color: "#b98cb3"}}>{highScore}</h2>
                                    <h2 className="ms-auto px-4 fw-bold">Score:</h2>
                                    <h2 className="fw-bold me-3" style={{color: "#b98cb3"}}>{quizScore}</h2>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center h-100 w-100 mt-3">
                                <div className="cardHiragana h-75 w-100 mx-5">
                                    <p style={{fontSize: "20rem"}}>{currCharacter.questionText}</p>
                                </div>
                                <div className="hiraganaPractice h-75 w-100 me-5">
                                    {currCharacter.answerOption.map((answerOption, index) => (
                                        <motion.button whileHover={{scale: 1.1}} whileTap = {{scale: 0.9}} key={index} className="btnHiraganaPractice" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                                            <span>{answerOption.answerText}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                            <motion.button 
                                whileHover={{scale: 1.1}}
                                className="hajime-button ms-auto me-3 text-white" onClick={() => handleQuizMode()}>
                                Practice
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            :
                <motion.div className="main-content"
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: .5 }}>
                    <div><Toaster/></div>
                    <div className="container-fluid px-0 px-sm-3 ">
                        <div className="row" style={{height: "45rem"}}>
                            <div className="col-md px-5 h-100 ">
                                <div className="card align-items-center mt-3 pb-3 h-100 bg-transparent border-0">
                                    <div className="d-flex align-items-center w-100 pt-2">
                                        <h2 className="card-title px-4 fw-bold">Practice Mode</h2>
                                        <h2 className="ms-auto px-4 fw-bold">Score:</h2>
                                        <h2 className="fw-bold me-3" style={{color: "#b98cb3"}}>{practiceScore}</h2>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center h-100 w-100">
                                        <div className="cardHiragana h-75 w-100 mx-5">
                                            <p style={{fontSize: "20rem"}}>{currCharacter.questionText}</p>
                                        </div>
                                        <div className="hiraganaPractice h-75 w-100 me-5">
                                            {currCharacter.answerOption.map((answerOption, index) => (
                                                <motion.button whileHover={{scale: 1.1}} whileTap = {{scale: 0.9}} key={index} className="btnHiraganaPractice" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                                                    <span>{answerOption.answerText}</span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                    <motion.button 
                                        whileHover={{scale: 1.1}}
                                        whileTap = {{scale: 0.9}}
                                        className="hajime-button ms-auto me-3 text-white" onClick={() => handleQuizMode()}>
                                        Quiz
                                    </motion.button>
                                </div>
                            </div>
                            <div className="col-md-5 h-100 mt-3">
                                <div className="hiraganaContainer mx-4 scrollSilabarios">
                                    {Object.keys(hira).map((key, index) => {
                                        return (
                                            <motion.div 
                                                className="hiraganaCard" 
                                                key={key}
                                                whileHover={{scale: 1.1}}>
                                                <p className="mainCharacter">{key}</p>
                                                <p style={{fontSize: "25px"}}>{hira[key]}</p>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            }
        </>
    )
}

export default HiraganaPracticeView