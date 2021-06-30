import React from "react";
import {Meal} from "../shared/interfaces/meal";

interface ICartContext {
    items: Meal[];
    totalAmount: number;
    addItem: (item: Meal) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
}

export const CartContext = React.createContext<ICartContext>({
    items: [],
    totalAmount: 0,
    addItem: (item: Meal) => {
    },
    removeItem: (id: string) => {
    },
    clearCart: () => {

    }
})