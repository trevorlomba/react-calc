import React from "react";
import './ClearButton.css';

export const ClearButton = props => (
    <div className = "clear-btn" onClick={() => props.handleClick(props.children)}> 
    {props.children} 
    </div>
);