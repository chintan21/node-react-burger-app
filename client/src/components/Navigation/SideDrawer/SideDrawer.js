import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import cssClasses from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop';


const sideDrawer = (props) => {

    let attachedClasses = [cssClasses.SideDrawer, cssClasses.Close];
    if(props.open){
        attachedClasses =[cssClasses.SideDrawer, cssClasses.Open];
    }

    return(
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={cssClasses.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} clicked={props.closed} />
                </nav>
            </div>
        </React.Fragment>

    );
};

export default sideDrawer;