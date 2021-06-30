import React from "react";
import './card.css'

export const Card:React.FC = ({children}) => {
    return (
        <div className="card">
            {children}
        </div>
    );
};

