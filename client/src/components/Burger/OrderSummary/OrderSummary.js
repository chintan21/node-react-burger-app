import React from 'react';
import Button from '../../UI/Button/Button'

const  orderSummary = (props) => {

    const ingredientSummary =  Object.keys(props.ingredients).map(
        (igKey) => {
            return(
                <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>{props.ingredients[igKey]}</li>
            );
        });

    return(
        <React.Fragment>
            <h3>Your Order!!</h3>
            <p>Delicious Burger with following ingredient</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Grand Total : <strong>{props.price.toFixed(2)}</strong></p>
            <p>Continue to CheckOut?</p>
            <Button btnType={'Danger'} clicked={props.purchaseCancel}>Cancel</Button>
            <Button btnType={'Success'} clicked={props.purchaseContinue}>Continue</Button>
        </React.Fragment>
    );
};

export default orderSummary;