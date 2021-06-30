import './modal.css'
import React from "react";
import ReactDOM from "react-dom";

const BackDrop: React.VFC<{ showCartHandler: Function }> = ({showCartHandler}) => {
    return <div onClick={() => showCartHandler()} className="backdrop"/>
}
const ModalOverLay: React.FC<{ children: JSX.Element[] }> = ({children}) => {
    return <div className="modal">
        <div className="content">{children}</div>
    </div>
}

const portalElement: HTMLElement = document.getElementById('overlays') as HTMLElement

export const Modal: React.FC<{ children: JSX.Element[], showCartHandler: Function }> = ({
                                                                                            children,
                                                                                            showCartHandler
                                                                                        }) => {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop showCartHandler={showCartHandler}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverLay>{children}</ModalOverLay>, portalElement)}
        </>
    );
};

