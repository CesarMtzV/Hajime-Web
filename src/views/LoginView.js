import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const LoginView = () => {

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`http://127.0.0.1:5000/users/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                password
            })
        })

        if(res.status === 200){
            navigate("/")
        }else{
            // DISPLAY ERROR MESSAGE
            const data = await res.json();
            console.log(data)
        }
    }

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
                                        <form onSubmit={handleSubmit}>
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
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    value={userName}
                                                    onChange={e => setUsername(e.target.value)}
                                                />
                                                <label
                                                    className="form-label"
                                                    htmlFor="form2Example17"
                                                >
                                                    Username
                                                </label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                />
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
