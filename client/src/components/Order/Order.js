import React from 'react';
import cssClasses from './Order.css'

const Order = (props) => {

    const ingredients =[];

    for(let ingredient in props.ingredients){
        ingredients.push({
            name:ingredient,
            amount:props.ingredients[ingredient]
        });
    }

    const ingredientsOutput = ingredients.map(ig => {
        return <span key={ig.name} style={{
            textTransform:'capitalize',
            padding:'5px',
            display:'inline-block',
            border:'1px solid #ccc',
            margin: '0 8px'
        }}>{ig.name}:{ig.amount}</span>
        });

    return(
        <div className={cssClasses.Order}>
            <p> Ingredients: {ingredientsOutput}</p>
            <p>total Price:<strong>USD {props.price}$</strong></p>
        </div>
    );
};

export default Order;