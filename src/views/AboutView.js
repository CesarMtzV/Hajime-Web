import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { welcomeView_routes } from "../static/navbarRoutes";
import { MemberCard } from "../components/MemberCard";

export const AboutView = () => {
    const members = [
        {
            name: "César Martínez",
            role: "Programmer",
            github_link: "https://github.com/CesarMtzV",
            profile_picture:
                "https://avatars.githubusercontent.com/u/42587773?v=4",
        },
        {
            name: "Alex Vargas",
            role: "Programmer",
            github_link: "https://github.com/alexvargas01",
            profile_picture:
                "https://avatars.githubusercontent.com/u/43385032?v=4",
        },
        {
            name: "Daniel David",
            role: "Programmer",
            github_link: "https://github.com/Danyboyyy",
            profile_picture:
                "https://avatars.githubusercontent.com/u/54334789?v=4",
        },
        {
            name: "Santiago Cano",
            role: "Programmer",
            github_link: "https://github.com/canosantiago12",
            profile_picture:
                "https://avatars.githubusercontent.com/u/78878007?v=4",
        },
    ];

    return (
        <>
            <NavBar navbarRoutes={welcomeView_routes} />
            <div className="container py-5">
                <div className="row text-center">
                    <div className="col-lg-8 mx-auto">
                        <h1 className="display-4">About Us</h1>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row text-center">
                    {members.map((item, key) => {
                        return (
                            <MemberCard
                                key={key}
                                name={item.name}
                                role={item.role}
                                github_link={item.github_link}
                                profile_picture={item.profile_picture}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};
