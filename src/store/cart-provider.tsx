import {CartContext} from './cart-context'
import React, {useReducer} from "react";
import {Meal} from "../shared/interfaces/meal";

type State = {
    items: Meal[],
    totalAmount: number
}

const defaultCartState: State = {
    items: [],
    totalAmount: 0
}

type Action = { type: 'ADD_ITEM', payload: Meal }
    | { type: 'REMOVE_ITEM', payload: string }
    | { type: 'CLEAR_CART' }

const cartReducer = (state: State, action: Action) => {
    switch (action.type) {
        case "ADD_ITEM": {
            const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;
            const exsitingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            const existingCartItem = state.items[exsitingCartItemIndex]
            let updatedItem;
            let updatedItems;
            if (existingCartItem) {
                updatedItem = {
                    ...existingCartItem, amount: existingCartItem.amount + action.payload.amount
                };
                updatedItems = [...state.items] as Meal[];
                updatedItems[exsitingCartItemIndex] = updatedItem;
            } else {
                updatedItem = {...action.payload}
                updatedItems = state.items.concat(action.payload) as Meal[];
            }
            return {...state, items: updatedItems, totalAmount: updatedTotalAmount};
        }
        case "REMOVE_ITEM": {
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload)
            const existingCartItem = state.items[existingCartItemIndex]
            const updatedTotalAmount = state.totalAmount - existingCartItem.price
            let updatedItems;
            if (existingCartItem.amount === 1) {
                updatedItems = state.items.filter(item => item.id !== action.payload)
            } else {
                const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1}
                updatedItems = [...state.items]
                updatedItems[existingCartItemIndex] = updatedItem
            }
            return {...state, items: updatedItems, totalAmount: updatedTotalAmount}
        }
        case "CLEAR_CART": {
            return defaultCartState
        }
    }
    return defaultCartState
}

export const CartProvider: React.FC = ({children}) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
    const addItemToCartHandle = (item: Meal) => {
        dispatchCartAction({type: 'ADD_ITEM', payload: item})
    }
    const RemoveItemToCartHandle = (id: string) => {
        dispatchCartAction({type: 'REMOVE_ITEM', payload: id})
    }
    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR_CART'})
    }
    const cartContext = {
        items: cartState.items as Meal[],
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandle,
        removeItem: RemoveItemToCartHandle,
        clearCart: clearCartHandler
    }
    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
}