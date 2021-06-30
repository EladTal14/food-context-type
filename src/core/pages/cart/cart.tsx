import * as React from 'react'
import {useContext, useState} from 'react'
import {Modal} from "../../../shared/components/ui/modal/modal";
import './cart.css'
import {CartContext} from "../../../store/cart-context";
import {CartItem} from "./cart-item/cart-item";
import {Meal} from "../../../shared/interfaces/meal";
import {Checkout} from "./checkout/checkout";
import {UserFormData} from "../../../shared/interfaces/user-form-data";
import {postOrderDataToDb} from "../../../shared/services/http-calls";

export const Cart: React.FC<{ showCartHandler: () => void }> = ({showCartHandler}) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [didError, setDidError] = useState(false);

    const cartCtx = useContext(CartContext);
    const onAddCartItemHandler = (item: Meal) => {
        cartCtx.addItem({...item, amount: 1});
    }
    const cartItems = <ul className="cart-items">{cartCtx.items.map((item) => {
        return <CartItem key={item.id} meal={item} onAdd={onAddCartItemHandler}
                         onRemove={cartCtx.removeItem}/>
    })}</ul>;
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData: UserFormData) => {
        setIsSubmitting(true);
        try {
            await postOrderDataToDb(userData, cartCtx.items)
            setIsSubmitting(false);
            setDidSubmit(true);
            cartCtx.clearCart();
        } catch (err) {
            setDidError(true)
            console.log(err.message)
        }

    };

    const cartModalContent = <>
        {cartItems}
        <div className="total">
            <span>Total amount</span>
            <span>{totalAmount}</span>
        </div>
        <>
            {isCheckout && <Checkout submitOrderHandler={submitOrderHandler} showCartHandler={showCartHandler}/>}
            {!isCheckout && <div className="actions">
                <button className="button--alt" onClick={() => showCartHandler()}>Close</button>
                {hasItems && <button onClick={orderHandler} className="button">Order</button>}
            </div>}
        </>
    </>

    const isSubmittingModalContent = <p>Sending order data</p>
    const isErrorOcurred = <p>Error has occurred please try again</p>
    const didSubmitModalContent = <>
        <div className="actions">
            <button className="button" onClick={() => showCartHandler()}>Close</button>
        </div>
        <p>Successfully sent the order</p>
    </>

    return (
        <Modal showCartHandler={showCartHandler}>
            <></>
            <>
                {!isSubmitting && !didError && !didSubmit && cartModalContent}
                {isSubmitting && !didError && isSubmittingModalContent}
                {didError && isErrorOcurred}
                {!isSubmitting && didSubmit && !didError && didSubmitModalContent}
            </>
        </Modal>
    );

}

