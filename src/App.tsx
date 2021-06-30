import React, {useState} from 'react';
import {Header} from "./shared/components/layout/header/header";
import {Meals} from "./core/pages/meals/meals";
import {Cart} from "./core/pages/cart/cart";
import {CartProvider} from "./store/cart-provider";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);
    const showCartHandler = () => {
        setCartIsShown(prevState => !prevState);
    };

    return (
        <CartProvider>
            {cartIsShown && <Cart showCartHandler={showCartHandler}/>}
            <Header showCartHandler={showCartHandler}/>
            <main>
                <Meals/>
            </main>
        </CartProvider>
    );
}

export default App;
