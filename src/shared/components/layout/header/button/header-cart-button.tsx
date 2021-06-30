import {CartIcon} from '../../../../../core/pages/cart/cart-icon/cart-icon'
import './header-cart-button.css'
import React, {useContext, useEffect, useState} from "react";
import {CartContext} from "../../../../../store/cart-context";

export const HeaderCartButton: React.VFC<{ showCartHandler: Function }> = ({showCartHandler}) => {
    const cartCtx = useContext(CartContext)
    const {items} = cartCtx
    const [btnIsHiglight, setBtnIsHiglight] = useState(false)
    const numOfCartItems = items.reduce((acc, item: { amount: number }) => {
        return acc + item.amount
    }, 0)
    const btnClass = `button ${btnIsHiglight ? 'bump' : ''}`

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }
        setBtnIsHiglight(true);
        const timerId = setTimeout(() => setBtnIsHiglight(false), 300)
        return () => {
            clearTimeout(timerId)
        }
    }, [items])
    return (
        <button className={`${btnClass}`} onClick={() => showCartHandler()}>
            <span className="icon">
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className="badge">{numOfCartItems}</span>
        </button>
    );
};

