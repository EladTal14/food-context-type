import './meal-item.css'
import React, {useContext} from "react";
import {Meal} from "../../../../shared/interfaces/meal";
import {MealItemForm} from "./meal-item-form";
import {CartContext} from "../../../../store/cart-context";

export const MealItem: React.VFC<Meal> = ({name, id, description, price}) => {
    const cartCtx = useContext(CartContext)
    const formatedPrice = `$${price.toFixed(2)}`
    const addToCartHandler = (amount: number) => {
        cartCtx.addItem({
            id,
            name,
            amount,
            price,
            description
        })
    }
    return (
        <li className="meal">
            <div>
                <h3>{name}</h3>
                <div className="description">{description}</div>
                <div className="price">{formatedPrice}</div>
            </div>
            <div>
                <MealItemForm addToCartHandler={addToCartHandler} id={id}/>
            </div>
        </li>
    );
};

