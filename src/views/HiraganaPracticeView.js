import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

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
    'を' : 'Wo'
};

function shuffleArray(arr) {
    return arr.sort((a, b) => 0.5 - Math.random());
}

const HiraganaPracticeView = () => {
    const keys = Object.keys(hira);
    const values = Object.values(hira);

    var x = Math.floor(Math.random() * keys.length);

    const [currCharacter, setCurrentCharacter] = useState(
        {
            questionText: keys[x],
            answerOption: shuffleArray([
                {answerText: values[x], isCorrect: true},
                {answerText: values[Math.floor(Math.random() * keys.length)], isCorrect: false},
                {answerText: values[Math.floor(Math.random() * keys.length)], isCorrect: false},
                {answerText: values[Math.floor(Math.random() * keys.length)], isCorrect: false},
            ])});
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (isCorrect) => {
        var aux = Math.floor(Math.random() * keys.length);
        /* const nextCharacter = keys[aux];
        const nextValue = values[aux]; */

        if(isCorrect) {
            toast.success("Nice!", {duration: 1000});
            setScore(score + 1);
        } else {
            toast.error("Try again!", {duration: 1000});
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

    return (
        <>
            <motion.div className="main-content"
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: .5 }}>
                <div><Toaster/></div>
                <div className="container-fluid px-0 px-sm-3">
                    <div className="row" style={{height: "45rem"}}>
                        <div className="col-md-7 ps-5 h-100">
                            <div className="card align-items-center mt-3 pb-3 text-white h-100" style={{backgroundColor: "#B98CB3" }}>
                                <div className="d-flex align-items-center w-100 pt-2">
                                    <h2 className="card-title px-4">Practice Mode</h2>
                                    <h4 className="card-subtitle ms-auto px-4 fw-light">Score: {score}</h4>
                                </div>
                                <div className="d-flex align-items-center justify-content-center h-100 w-100">
                                    <div className="cardHiragana" style={{ backgroundColor: "#D7BED4"}}>
                                        <h1 style={{fontSize: "20rem"}}>{currCharacter.questionText}</h1>
                                    </div>
                                    <div className="ms-3 hiraganaPractice">
                                        {currCharacter.answerOption.map((answerOption, index) => (
                                            <button key={index} className="btnHiraganaPractice" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                                                <span>{answerOption.answerText}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <motion.button 
                                    whileHover={{scale: 1.1}}
                                    whileTap = {{scale: 0.9}}
                                    className="hajime-button ms-auto me-3">
                                    More
                                </motion.button>
                            </div>
                        </div>
                        <div className="col-md-5 h-100">
                            <div className="hiraganaContainer mt-3 me-5 scroll border rounded">
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
        </>
    )
}

export default HiraganaPracticeView