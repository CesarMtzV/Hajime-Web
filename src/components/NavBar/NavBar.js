import React from "react";
import { NavBtn, NavBtnLink } from "./NavBarElements";
import logo1 from "../../assets/WhiteBG_LogoHajime.png"

const NavBar = ({ navbarRoutes }) => {
  return (
    <>
      <div className="row">
        <div className="container px-5" style={{ backgroundColor: "#b98cb3" }}>
          <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <div className="row">
              <img className="logoNavBar" src={logo1} alt=""></img>
              <h1 className="col text-white fs-1 fw-bolder align-text-baseline">HAJIME</h1>
            </div>
            <ul className="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              {navbarRoutes.map((route, key) => {
                return (
                  <NavBtn key={key}>
                    <NavBtnLink to={route.route}>{route.name}</NavBtnLink>
                  </NavBtn>
                );
              })}
            </ul>
          </header>
        </div>
      </div>
    </>
  );
};

export default NavBar;
