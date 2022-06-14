import React, { useState } from "react";
import { KanjiSetCard } from "../components/Kanji/KanjiSetCard";
import { useAuth } from "../components/auth/auth";
import { Popup } from "../components/popup/Popup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { kanjiSetSchema } from "../static/schema";
import axios from "axios";

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
      <div className="main-content">
        <div className="container">
          <h1 className="py-5">Your Kanji sets</h1>

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
          <Popup trigger={buttonPopup} setPopUp={setButtonPopup}>
            <h3 className="mb-3">New kanji set</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  {...register("title")}
                />
                <p className="text-danger fst-italic">
                  {errors.title?.message}
                </p>
                <label className="form-label">Title</label>
                <div className="pt-1 mb-4">
                  <button
                    className="btn btn-info btn-lg text-light fw-bold"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
                {error && <p className="text-danger fst-italic">{error}</p>}
              </div>
            </form>
          </Popup>

          {/* NEW SET BUTTON */}
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary btn-lg rounded-pill btn-info text-white fw-bold px-3"
              onClick={() => setButtonPopup(true)}
            >
              + New set
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
