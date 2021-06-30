import './cart-item.css'
import React from "react";
import {Meal} from "../../../../shared/interfaces/meal";

interface ICartItem {
    meal: Meal;
    onRemove: (id: string) => void;
    onAdd: (item: Meal) => void;
}

export const CartItem: React.VFC<ICartItem> = ({
                                                   meal,
                                                   onRemove,
                                                   onAdd
                                               }) => {
    const {id, price, amount, name} = meal;
    return (
        <li className='cart-item'>
            <div>
                <h2>{name}</h2>
                <div className="cart-item--summary">
                    <span className="cart-item--summary--price">{price.toFixed(2)}</span>
                    <span className="cart-item--summary--amount">x {amount}</span>
                </div>
            </div>
            <div className="cart-item--summary--actions">
                <button onClick={() => onRemove(id)}>−</button>
                <button onClick={() => onAdd(meal)}>+</button>
            </div>
        </li>
    );
};

