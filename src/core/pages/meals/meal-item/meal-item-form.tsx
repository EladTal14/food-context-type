import './meal-item-form.css'
import {InputDiv} from '../../../../shared/components/ui/input/input'
import React, {useRef, useState} from "react";

export const MealItemForm: React.VFC<{ id: string, addToCartHandler: (amount: number) => void }> = ({
                                                                                                        id,
                                                                                                        addToCartHandler
                                                                                                    }) => {
    const [amountIsValid, setAmountIsValid] = useState(true)
    const inputRef = useRef<HTMLInputElement>(null);
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let enteredAmount;
        if (inputRef.current !== null) {
            enteredAmount = inputRef.current.value;
            if (enteredAmount.trim().length === 0 || +enteredAmount < 1 || +enteredAmount > 5) {
                setAmountIsValid(false)
                return
            }
            addToCartHandler(+enteredAmount)
        }
    };
    return (
        <form className="form" onSubmit={submitHandler}>
            <InputDiv label="Amount" ref={inputRef}
                      input={{id: id, type: 'number', min: '1', max: '5', step: "1", defaultValue: "1"}}/>
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    );
};