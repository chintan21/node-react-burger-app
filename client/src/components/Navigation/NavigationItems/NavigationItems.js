import React from  'react';
import cssClasses from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={cssClasses.NavigationItems} onClick={props.clicked}>
        <NavigationItem link={'/'} exact={true}>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link={'/orders'} >Orders</NavigationItem> : null}
        {props.isAuthenticated
            ? <NavigationItem link={'/logout'} >Logout</NavigationItem>
            : <NavigationItem link={'/auth'}>Authenticate</NavigationItem>
        }
    </ul>
);

export default navigationItems;