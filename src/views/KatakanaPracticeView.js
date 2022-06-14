import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import axios from "axios";

const kata  = { 
    'ア' : 'A',
    'イ' : 'I',
    'ウ' : 'U',
    'エ' : 'E',
    'オ' : 'O',
    'カ' : 'Ka',
    'キ' : 'Ki',
    'ク' : 'Ku',
    'ケ' : 'Ke',
    'コ' : 'Ko',
    'サ' : 'Sa',
    'シ' : 'Shi',
    'ス' : 'Su',
    'セ' : 'Se',
    'ソ' : 'So',
    'タ' : 'Ta',
    'チ' : 'Chi',
    'ツ' : 'Tsu',
    'テ' : 'Te',
    'ト' : 'To',
    'ナ' : 'Na',
    'ニ' : 'Ni',
    'ヌ' : 'Nu',
    'ネ' : 'Ne',
    'ノ' : 'No',
    'ハ' : 'Ha',
    'ヒ' : 'Hi',
    'フ' : 'Fu',
    'ヘ' : 'He',
    'ホ' : 'Ho',
    'マ' : 'Ma',
    'ミ' : 'Mi',
    'ム' : 'Mu',
    'メ' : 'Me',
    'モ' : 'Mo',
    'ヤ' : 'Ya',
    'ユ' : 'Yu',
    'ヨ' : 'Yo',
    'ラ' : 'Ra',
    'リ' : 'Ri',
    'ル' : 'Ru',
    'レ' : 'Re',
    'ロ' : 'Ro',
    'ワ' : 'Wa',
    'ヲ' : 'Wo',
    'ン' : 'n',
};

const shuffleArray = (arr) => {
    return arr.sort((a, b) => 0.5 - Math.random());
}

const KatakanaPracticeView = () => {
    const keys = Object.keys(kata);
    const values = Object.values(kata);

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

    useEffect(() => {
        var token = localStorage.getItem("token");

        const score = axios
            .get("/api/achievements/katakanaHighScore", { headers: { Authorization: `Bearer ${token}` } })
            .then((result) => {
                return(result.json());
            })
            .then(res => {
                console.log(res.items);
            })
            .catch((e) => {
                console.log(e);
            });
        console.log('asdfdsaf', score);
    })

    const handleAnswerOptionClick = (isCorrect) => {
        var aux = Math.floor(Math.random() * keys.length);
        /* const nextCharacter = keys[aux];
        const nextValue = values[aux]; */

        if(!showQuiz) {
            if(isCorrect) {
                toast.success("Nice!", {duration: 1000});
                setPracticeScore(practiceScore + 1);
            } else {
                toast.error("Try again!", {duration: 1000});
            }
        } else {
            if(isCorrect) {
                toast.success("Nice!", {duration: 1000});
                setQuizScore(quizScore + 1);
            } else {
                toast.error("Try again!", {duration: 1000});
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

    const handleQuizMode = () => {

        if(!showQuiz) {
            setQuizMode(true);
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
                        <div className="card border-light align-items-center mt-3 pb-3 h-100">
                            <div className="d-flex align-items-center w-100 pt-2">
                                <h2 className="card-title px-4 fw-bold">Quiz Mode</h2>
                                <div className="ms-auto d-flex">
                                    <h2 className="px-4 fw-bold">High Score:</h2>
                                    <h2 className="fw-bold me-3" style={{color: "#b98cb3"}}>{quizScore}</h2>
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
                    <div className="container-fluid px-0 px-sm-3">
                        <div className="row" style={{height: "45rem"}}>
                            <div className="col-md px-5 h-100">
                                <div className="card border-light align-items-center mt-3 pb-3 h-100">
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
                                <div className="hiraganaContainer mx-4 scroll">
                                    {Object.keys(kata).map((key, index) => {
                                        return (
                                            <motion.div 
                                                className="hiraganaCard" 
                                                key={key}
                                                whileHover={{scale: 1.1}}>
                                                <p className="mainCharacter">{key}</p>
                                                <p style={{fontSize: "25px"}}>{kata[key]}</p>
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

export default KatakanaPracticeView