import React from 'react';
import cssClasses from './Toolbar.css';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
        <header className={cssClasses.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <div className={cssClasses.Logo}>
                <Logo/>
            </div>
            <nav className={cssClasses.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </header>

    );

export default toolbar;