import React, { useState, useEffect } from "react";
import NewModal from "../components/NewModal/NewModal";
import { motion } from "framer-motion";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

const HomeView = () => {
  const [randomKanji, setRandomKanji] = useState();
  const [achievements, setAchievements] = useState();
  const [modal1, showModal1] = useState(false);

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

    setAchievements(achievements.achievements);
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

  const generateKanji = async () => {
    const randomGrade = Math.floor(Math.random() * 5) + 1;
    const grade = await fetch(
      `https://kanjiapi.dev/v1/kanji/grade-${randomGrade}`
    );

    let data;
    if (grade) data = await grade.json();

    let kanji, kanjiJson;
    if (data) {
      const randomKanji = Math.floor(Math.random() * data.length);
      kanji = await fetch(`https://kanjiapi.dev/v1/kanji/${data[randomKanji]}`);

      if (kanji) kanjiJson = await kanji.json();
    }

    if (kanjiJson) {
      setRandomKanji(kanjiJson);
      if (achievements[4].progress !== 1) {
        const aux = achievements;
        aux[4].progress = 1;
        setAchievements(aux);
        await updateAchievements(aux);
      }
    }
  };

  useEffect(() => {
    getAchievements();
  }, [setAchievements]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    generateKanji();
  };

  return (
    <>
      <NewModal
        isActive={modal1}
        popModal={showModal1}
        title="Your Achievements"
        showHeader={true}
        showOverlay={true}
        alignModal={"start"}
        paddingModal={"30px"}
      >
        <div className="achievementsList scroll">
          {achievements &&
            achievements.map((ach) => {
              return (
                <div className="achievementElement mb-3">
                  <div className="achievementInfo">
                    <h2>{ach.title}</h2>
                    <h5>{ach.description}</h5>
                  </div>
                  <div className="achievementProgress">
                    <div style={{ width: 100, height: 100 }}>
                      <CircularProgressbarWithChildren
                        value={ach.progress * 100}
                        styles={buildStyles({
                          rotation: 0.25,
                          pathTransitionDuration: 0.5,
                          pathColor: `rgba(155, 230, 34, ${
                            ach.progress * 100
                          })`,
                          textColor: "#f88",
                          trailColor: "#d6d6d6",
                          backgroundColor: "#3e98c7",
                        })}
                      >
                        <div style={{ marginTop: -5 }}>
                          <strong>{ach.progress * 100}%</strong>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                    {/* {ach.progress === 1 ? <div>Completado</div> : <div>Te falta</div>} */}
                  </div>
                </div>
              );
            })}
        </div>
      </NewModal>
      <div className="main-content" >
        <div className="container-fluid px-0 px-sm-3">
          <div className="row pt-3 px-5 pb-5" style={{ height: "90vh" }}>
            <div className="col-md-4 h-100">
              <div
                className="card d-flex flex-column align-items-center text-white h-100 p-3 scrollHomeCard"
                style={{ backgroundColor: "#b98cb3" }}
              >
                <h2 style={{ fontWeight: 600 }}>Kanji Generator</h2>
                <div className="kanji-info py-4">
                  <div className="row">
                    <div className="col-md-6">
                      <h1>{randomKanji && randomKanji.kanji}</h1>
                    </div>
                    <div className="col-md-6">
                      <h4 style={{ fontWeight: 600 }}>Number of strokes:</h4>
                      <p>{randomKanji && randomKanji.stroke_count}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h4 style={{ fontWeight: 600 }}>Kun reading:</h4>
                      {randomKanji &&
                        randomKanji.kun_readings.map((key, kun) => {
                          return (
                            <p className="m-0" key={key}>
                              {key}
                            </p>
                          );
                        })}
                    </div>
                    <div className="col-md-6">
                      <h4 style={{ fontWeight: 600 }}>On reading:</h4>
                      {randomKanji &&
                        randomKanji.on_readings.map((key, on) => {
                          return (
                            <p className="m-0" key={key}>
                              {key}
                            </p>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="meaning-div">
                  <h3 style={{ fontWeight: 600 }}>Meaning:</h3>
                  <ul>
                    {randomKanji &&
                      randomKanji.meanings.map((key, meaning) => {
                        return (
                          <p
                            className="m-0"
                            style={{ fontSize: "150%" }}
                            key={key}
                          >
                            {key}
                          </p>
                        );
                      })}
                  </ul>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="hajime-button text-white"
                  onClick={handleGenerate}
                >
                  Generate
                </motion.button>
              </div>
            </div>
            <div className="col-md-8 h-100">
              <div
                className="card d-flex flex-column align-items-center text-white h-100 p-3 scrollHomeCard"
                style={{ backgroundColor: "#b98cb3" }}
              >
                <h2 style={{ fontWeight: 600 }}>Achievements</h2>
                <div className="row achievements-card">
                  {achievements &&
                    achievements.map((ach) => {
                      if (ach.progress !== 1) {
                        return (
                          <div className="col-md-3 d-flex flex-column align-items-center">
                            <div className="achievements-card-element">
                              <CircularProgressbarWithChildren
                                value={ach.progress * 100}
                                styles={buildStyles({
                                  rotation: 0.25,
                                  pathTransitionDuration: 0.5,
                                  pathColor: `rgba(155, 230, 34, ${
                                    ach.progress * 100
                                  })`,
                                  textColor: "#f88",
                                  trailColor: "#d6d6d6",
                                  backgroundColor: "#3e98c7",
                                })}
                              >
                                <div style={{ fontSize: 50, marginTop: -5 }}>
                                  <strong>{ach.progress * 100}%</strong>
                                </div>
                              </CircularProgressbarWithChildren>
                              <p>{ach.title}</p>
                            </div>
                          </div>
                        );
                      } else {
                        return <></>;
                      }
                    })}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="hajime-button ms-auto text-white mt-2"
                  onClick={() => showModal1(!modal1)}
                >
                  More
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeView;
