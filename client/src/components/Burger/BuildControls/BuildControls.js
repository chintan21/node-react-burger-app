import React from 'react';
import cssClasses from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad', type: 'salad'},
    {label:'Meat', type: 'meat'},
    {label:'Bacon', type: 'bacon'},
    {label:'Cheese', type: 'cheese'},
];

const buildControls = (props) => {

    return (
        <div className={cssClasses.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
                return <BuildControl
                    label={ctrl.label}
                    key={ctrl.label}
                    added={ () => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            })}
            <button
                className={cssClasses.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>{props.isAuth ? 'Order Now!':'Sign up to Order'}</button>
        </div>
    );
};

export default buildControls;