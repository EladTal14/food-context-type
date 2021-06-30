import './header.css'
import meals from '../../../assests/img/meals.jpg'
import {HeaderCartButton} from "./button/header-cart-button";
import React from "react";

export const Header: React.VFC<{ showCartHandler: () => void }> = ({showCartHandler}) => {
    return (
        <>
            <header className="header">
                <h1>ReactMeals</h1>
                <HeaderCartButton showCartHandler={showCartHandler}/>
            </header>
            <div className="main-image">
                <img src={meals} alt="meals"/>
            </div>
        </>
    );
};

