import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const NavLink = styled(Link)`
    color: #FFFFFF;
    display: flex;
    align-items: center;
    text-decoration: none;
    height: 100%;
    cursor: pointer;

    &:active {
        color: #15cdfc;
    }
`

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 24px;
    @media screen and (max-width: 320px) {
        flex-direction: column;
        justify-content: center;
        font-size: 2vh;
    }
`

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #FFFFFF;
    padding: 10px 22px;
    color: #000;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    box-shadow: 5px 5px 5px #987490;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #CAA9C6;
        color: #FFFFFF;
    }
`