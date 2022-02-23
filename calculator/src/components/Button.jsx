import React from 'react';
import './Button.css';

const isOperator = val => {
    return !isNaN(val) || val === "." || val === "=";
}

export const Button = props => ( 
    <div
    // adds class operator if isOperator returns true
        className={ `button-wrapper ${ isOperator(props.children) ? null : "operator"}`} 
        onClick={() => props.handleClick(props.children)}
        > 
        {props.children}
        </div> 
        )




        