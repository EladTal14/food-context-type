import React, {useRef, useState} from "react";
import styled from "styled-components";
import {UserFormData} from "../../../../shared/interfaces/user-form-data";

const isEmpty = (value: string) => value.trim() === '';
const isFiveChars = (value: string) => value.trim().length <= 5;

interface UserFormValidity {
    name: boolean;
    street: boolean;
    city: boolean;
    postalCode: boolean;
}

type ICheckoutProps = {
    showCartHandler: () => void,
    submitOrderHandler: (userData: UserFormData) => void
}

export const Checkout: React.VFC<ICheckoutProps> = ({
                                                        showCartHandler,
                                                        submitOrderHandler
                                                    }) => {
    const [formInputValidity, setFormValidity] = useState<UserFormValidity>({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })

    const nameInputRef = useRef<HTMLInputElement>(null);
    const streetInputRef = useRef<HTMLInputElement>(null);
    const postalInputRef = useRef<HTMLInputElement>(null);
    const cityInputRef = useRef<HTMLInputElement>(null);

    const confirmHandler = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        let enteredName, enteredStreet, enteredPostal, enteredCity;
        let enteredNameIsValid, enteredStreetIsValid, enteredPostalIsValid, enteredCityIsValid;
        let formIsValid;
        if (nameInputRef.current !== null && streetInputRef.current !== null &&
            postalInputRef.current !== null && cityInputRef.current !== null) {
            enteredName = nameInputRef.current.value;
            enteredPostal = postalInputRef.current.value;
            enteredCity = cityInputRef.current.value;
            enteredStreet = streetInputRef.current.value;

            enteredNameIsValid = !isEmpty(enteredName);
            enteredCityIsValid = !isEmpty(enteredCity);
            enteredStreetIsValid = !isEmpty(enteredStreet);
            enteredPostalIsValid = !isFiveChars(enteredPostal);
            setFormValidity({
                name: enteredNameIsValid,
                postalCode: enteredPostalIsValid,
                city: enteredCityIsValid,
                street: enteredStreetIsValid
            });
            formIsValid = enteredNameIsValid && enteredCityIsValid && enteredStreetIsValid && enteredPostalIsValid;
            if (!formIsValid) {
                return
            }
        }
        submitOrderHandler({
            name: (enteredName as string),
            city: (enteredCity as string),
            street: (enteredStreet as string),
            postalCode: (enteredPostal as string)
        })
    }

    return (
        <StyledForm onSubmit={confirmHandler}>
            <div className={`control ${!formInputValidity.name ? 'invalid' : ''}`}>
                <label htmlFor="name">Your Name</label>
                <input ref={nameInputRef} type="text" id="name"/>
                {!formInputValidity.name && <p>Please enter valid name</p>}
            </div>
            <div className={`control ${!formInputValidity.street ? 'invalid' : ''}`}>
                <label htmlFor="street">Street</label>
                <input ref={streetInputRef} type="text" id="street"/>
                {!formInputValidity.street && <p>Please enter valid name</p>}
            </div>
            <div className={`control ${!formInputValidity.postalCode ? 'invalid' : ''}`}>
                <label htmlFor="postal">Postal Code</label>
                <input ref={postalInputRef} type="text" id="postal"/>
                {!formInputValidity.postalCode && <p>Please enter valid postal code</p>}
            </div>
            <div className={`control ${!formInputValidity.city ? 'invalid' : ''}`}>
                <label htmlFor="city">City</label>
                <input ref={cityInputRef} type="text" id="city"/>
                {!formInputValidity.city && <p>Please enter valid city</p>}
            </div>
            <div>
                <button type="button" onClick={showCartHandler}>Cancel</button>
                <button>Confirm</button>
            </div>
        </StyledForm>
    );
};

const StyledForm = styled.form`
  form {
    margin: 1rem 0;
    height: 19rem;
    overflow: auto;
  }

  & .control {
    margin-bottom: 0.5rem;
  }

  & .control label {
    font-weight: bold;
    margin-bottom: 0.25rem;
    display: block;
  }

  & .control input {
    font: inherit;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 20rem;
    max-width: 100%;
  }

  & .actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  & div button {
    font: inherit;
    color: #5a1a01;
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-radius: 25px;
    padding: 0.5rem 2rem;
  }

  & div button:hover,
  div button:active {
    background-color: #ffe6dc;
  }

  & div .submit {
    border: 1px solid #5a1a01;
    background-color: #5a1a01;
    color: white;
  }

  & div .submit:hover,
  div .submit:active {
    background-color: #7a2706;
  }

  & .invalid label {
    color: #ca3e51;
  }

  & .invalid input {
    border-color: #aa0b20;
    background-color: #ffeff1;
  }
`
