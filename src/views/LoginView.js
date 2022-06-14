import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../components/auth/auth";
import { loginSchema } from "../static/schema";

const LoginView = () => {
    const [error, setError] = useState(null);
    const { setAuthToken, isLoggedIn, setLoggedIn } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });

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

    const onSubmit = async (data) => {
        const userName = data.userName;
        const password = data.password;

        axios
            .post("/api/users/login", { userName, password })
            .then(async (result) => {
                if (result.data) {
                    setAuthToken(result.data);
                    setLoggedIn(true);
                    navigate("/home");
                    const ach = await getAchievements();
                    if (ach[7].progress < 1) {
                        ach[7].progress += 0.1;
                        await updateAchievements(ach);
                    }
                } else {
                    throw Error("Incorrect login credentials");
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setError("Failed login. Check credentials");
                }
            });

        if (isLoggedIn) {
            navigate("/home");
        }
    };

    return (
        <section style={{ backgroundColor: "#b98cb3", minHeight: "100vh" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: "1rem" }}>
                            <div className="row g-0">
                                {/* IMAGEN IZQUIERDA */}
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmir-s3-cdn-cf.behance.net%2Fproject_modules%2Fdisp%2Fe034cb46865457.5867907fb1cae.png&f=1&nofb=1"
                                        alt="login form"
                                        className="img-fluid"
                                        style={{
                                            borderRadius: "1rem 0 0 1rem",
                                        }}
                                    />
                                </div>
                                {/* FORM DERECHA */}
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <span className="h1 fw-bold mb-0">
                                                    Hajime
                                                </span>
                                                <img
                                                    src={require("../assets/WhiteBG_LogoHajime.png")}
                                                    alt="logo"
                                                    className="img-fluid"
                                                    height={100}
                                                    width={100}
                                                />
                                            </div>

                                            <h5
                                                className="fw-normal mb-3 pb-3"
                                                style={{ letterSpacing: "1px" }}
                                            >
                                                Sign into your account
                                            </h5>
                                            {/* *****USERNAME***** */}
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    {...register("userName")}
                                                />
                                                <p className="text-danger fst-italic">
                                                    {errors.userName?.message}
                                                </p>
                                                <label
                                                    className="form-label"
                                                    htmlFor="form2Example17"
                                                >
                                                    Username
                                                </label>
                                            </div>

                                            {/* *****PASSWORD***** */}
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    {...register("password")}
                                                />
                                                <p className="text-danger fst-italic">
                                                    {errors.password?.message}
                                                </p>
                                                <label
                                                    className="form-label"
                                                    htmlFor="form2Example27"
                                                >
                                                    Password
                                                </label>
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <button
                                                    className="btn btn-dark btn-lg btn-block"
                                                    type="submit"
                                                >
                                                    Login
                                                </button>
                                            </div>
                                            {error && (
                                                <p className="text-danger fst-italic">
                                                    {error}
                                                </p>
                                            )}
                                            <p
                                                className="mb-5 pb-lg-2"
                                                style={{ color: "#393f81" }}
                                            >
                                                Don't have an account?{" "}
                                                <NavLink
                                                    to="/register"
                                                    style={{ color: "#393f81" }}
                                                >
                                                    Register here
                                                </NavLink>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginView;
