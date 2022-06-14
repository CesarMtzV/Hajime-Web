import styled from "styled-components";

export const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: ${props => props.showOverlay ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)'};
    padding: 40px;
    display: flex;
    align-items: ${props => props.alignModal ? props.alignModal : 'center'};
    justify-content: center;
    z-index: 2;
`;

export const ModalContainer = styled.div`
    width: 50%;
    min-width: 300px;
    min-height: 100px;
    background: #FFFFFF;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: ${props => props.padding ? props.padding : '20px'};
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #E8E8E8;

    h3 {
        font-weight: 600;
        font-size: 30px;
        color: #B98CB3;
    }
`;

export const ModalCloseButton = styled.button`
    position:  absolute;
    top: 15px;
    right: 15px;
    width: 50px;
    height: 50px;
    border: none;
    background: none;
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 5px;
    color: #000000;

    &:hover {
        background: #F2F2F2;
    }

    svg {
        width: 100%;
        height: 100%;
    }
`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;