import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { registerSchema } from "../static/schema";

const RegisterView = () => {
    const [error, setError] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(registerSchema) });

    const navigate = useNavigate();

    const onSubmit = (data) => {
        const name = data.name;
        const userName = data.userName;
        const email = data.email;
        const password = data.password;

        axios
            .post("/api/users/signup", { name, userName, email, password })
            .then((result) => {
                if (result.data.message === "Username already exists!") {
                    throw Error("An account already exists with that Username");
                } else {
                    navigate("/login");
                }
            })
            .catch((e) => {
                setError(e.message);
            });
    };

    return (
        <section style={{ backgroundColor: "#b98cb3" }}>
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
                                                Register an account
                                            </h5>
                                            {/* Name */}
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    {...register("name")}
                                                />
                                                <p className="text-danger fst-italic">
                                                    {errors.name?.message}
                                                </p>
                                                <label className="form-label">
                                                    Name
                                                </label>
                                            </div>
                                            {/* UserName */}
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    {...register("userName")}
                                                />
                                                <p className="text-danger fst-italic">
                                                    {errors.userName?.message}
                                                </p>
                                                <label className="form-label">
                                                    Username
                                                </label>
                                            </div>
                                            {/* email */}
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    className="form-control form-control-lg"
                                                    {...register("email")}
                                                />
                                                <p className="text-danger fst-italic">
                                                    {errors.email?.message}
                                                </p>
                                                <label className="form-label">
                                                    E-mail
                                                </label>
                                            </div>
                                            {/* PASSWORD */}
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    {...register("password")}
                                                />
                                                <p className="text-danger fst-italic">
                                                    {errors.password?.message}
                                                </p>
                                                <label className="form-label">
                                                    Password
                                                </label>
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <button
                                                    className="btn btn-dark btn-lg btn-block"
                                                    type="submit"
                                                >
                                                    Register
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
                                                Already have an account?{" "}
                                                <NavLink
                                                    to="/login"
                                                    style={{ color: "#393f81" }}
                                                >
                                                    Login
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

export default RegisterView;
