import React, { useState, useEffect } from 'react';
import Modal from "../components/NewModal/NewModal";
import { motion } from "framer-motion";

const HomeView = () => {
    const [randomKanji, setRandomKanji] = useState();
    const [achievements, setAchievements] = useState();
    const [modal1, showModal1] = useState(false);

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

        setAchievements(achievements.achievements);
    }

    const generateKanji =  async () => {
        const randomGrade = Math.floor(Math.random() * 5) + 1;
        const grade = await fetch(`https://kanjiapi.dev/v1/kanji/grade-${randomGrade}`);

        let data
        if (grade)
        data = await grade.json();

        let kanji, kanjiJson;
        if (data) {
        const randomKanji = Math.floor(Math.random() * data.length);
        kanji = await fetch(`https://kanjiapi.dev/v1/kanji/${data[randomKanji]}`);

        if (kanji)
            kanjiJson = await kanji.json();
        }

        if (kanjiJson)
        setRandomKanji(kanjiJson);
    }

    useEffect(() => {
        getAchievements();
        generateKanji();
    }, [setRandomKanji, setAchievements]);
    

    const handleGenerate = async (e) => {
        e.preventDefault();
        generateKanji();
    }

    return (
        <>
            <Modal
                isActive={modal1}
                popModal={showModal1}
                title="Your Achievements"
                showHeader={true}
                showOverlay={true}
                alignModal={'start'}
                paddingModal={'30px'}
            >
                {achievements && achievements.map(ach => {
                    return(
                        <div>
                            <p>{ach.title}</p>
                            <p>{ach.description}</p>
                            {ach.progress == 1 ? <div>Completado</div> : <div>Te falta</div>}
                            <br></br>
                        </div>
                    )
                })}
            </Modal>
            <div className="main-content">
                <div className="container-fluid px-0 px-sm-3">
                    <div className="row pt-3 px-5" style={{ height: "80vh" }}>
                        <div className="col-md-4">
                            <div
                                className="card d-flex flex-column align-items-center text-white h-100 p-3"
                                style={{ backgroundColor: "#b98cb3" }}
                            >
                                <h2>Kanji Generator</h2>
                                <div className="kanji-info py-4">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h1>{randomKanji && randomKanji.kanji}</h1>
                                        </div>
                                        <div className="col-md-6">
                                            <h4>Number of strokes:</h4>
                                            <p>{randomKanji && randomKanji.stroke_count}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h4>Kun reading:</h4>
                                            {randomKanji && randomKanji.kun_readings.map((key, kun) => {
                                                return(
                                                    <p key={key}>{key}</p>
                                                );
                                            })}
                                        </div>
                                        <div className="col-md-6">
                                            <h4>On reading:</h4>
                                            {randomKanji && randomKanji.on_readings.map((key, on) => {
                                                return(
                                                    <p key={key}>{key}</p>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="meaning-div">
                                    <h3>Meaning:</h3>
                                    <ul>
                                        {randomKanji && randomKanji.meanings.map((key, meaning) => {
                                            return(
                                                <p key={key}>{key}</p>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <motion.button 
                                        whileHover={{scale: 1.1}}
                                        whileTap = {{scale: 0.9}}
                                        className="hajime-button text-white" onClick={handleGenerate}>
                                        Generate
                                </motion.button>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-12">
                                    <div
                                        className="card text-white p-3"
                                        style={{ backgroundColor: "#b98cb3" }}
                                    >
                                        <h2>Achievements</h2>
                                        <div className="row achievements-card">
                                            <div className="col-md-3 d-flex flex-column align-items-center">
                                                <div className="progress yellow">
                                                    {" "}
                                                    <span className="progress-left">
                                                        {" "}
                                                        <span className="progress-bar"></span>{" "}
                                                    </span>{" "}
                                                    <span className="progress-right">
                                                        {" "}
                                                        <span className="progress-bar"></span>{" "}
                                                    </span>
                                                    <div className="progress-value">
                                                        37.5%
                                                    </div>
                                                </div>
                                                <p>Random</p>
                                            </div>
                                            <div className="col-md-3  d-flex flex-column align-items-center">
                                                <div className="progress blue">
                                                    {" "}
                                                    <span className="progress-left">
                                                        {" "}
                                                        <span className="progress-bar"></span>{" "}
                                                    </span>{" "}
                                                    <span className="progress-right">
                                                        {" "}
                                                        <span className="progress-bar"></span>{" "}
                                                    </span>
                                                    <div className="progress-value">
                                                        90%
                                                    </div>
                                                </div>
                                                <p>New Record!</p>
                                            </div>
                                            <div className="col-md-3  d-flex flex-column align-items-center">
                                                <div className="progress green">
                                                    {" "}
                                                    <span className="progress-left">
                                                        {" "}
                                                        <span className="progress-bar"></span>{" "}
                                                    </span>{" "}
                                                    <span className="progress-right">
                                                        {" "}
                                                        <span className="progress-bar"></span>{" "}
                                                    </span>
                                                    <div className="progress-value">
                                                        50%
                                                    </div>
                                                </div>
                                                <p>Artist</p>
                                            </div>
                                            <div className="col-md-3  d-flex flex-column align-items-center">
                                                <div className="progress green">
                                                    {" "}
                                                    <span className="progress-left">
                                                        {" "}
                                                        <span className="progress-bar"></span>{" "}
                                                    </span>{" "}
                                                    <span className="progress-right">
                                                        {" "}
                                                        <span className="progress-bar"></span>{" "}
                                                    </span>
                                                    <div className="progress-value">
                                                        50%
                                                    </div>
                                                </div>
                                                <p>ヘルプ</p>
                                            </div>
                                        </div>
                                        <motion.button 
                                        whileHover={{scale: 1.1}}
                                        whileTap = {{scale: 0.9}}
                                        className="hajime-button ms-auto text-white" onClick={() => showModal1(!modal1)}>
                                            More
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col-md-4">
                                    <motion.button 
                                        whileHover={{scale: 1.1}}
                                        whileTap = {{scale: 0.9}}
                                        className="btnBigHome"
                                    >
                                        <h1>さ</h1>
                                        <h2>Hiragana</h2>
                                    </motion.button>
                                </div>
                                <div className="col-md-4">
                                    <motion.button 
                                        whileHover={{scale: 1.1}}
                                        whileTap = {{scale: 0.9}}
                                        className="btnBigHome"
                                    >
                                        <h1>オ</h1>
                                        <h2>Katakana</h2>
                                    </motion.button>
                                </div>
                                <div className="col-md-4">
                                    <motion.button 
                                        whileHover={{scale: 1.1}}
                                        whileTap = {{scale: 0.9}}
                                        className="btnBigHome"
                                    >
                                        <h1>件</h1>
                                        <h2>Kanji</h2>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeView;
