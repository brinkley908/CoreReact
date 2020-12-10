import React, { Component, useState, useEffect, useContext } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { authenticationService, isAuthenticated } from "../service/authenticationService"
import { Authenticated, useStore, } from "../store";
import { AuthContext } from '../service/authContext';
import { history, Role } from '../service/history';
import './NavMenu.css';


export const NavMenu = props => {

    const [scrolling, setScrolling] = useState(false);

    const [collapsed, setCollapsed] = useState(false);

    const [auth, setAuth] = useContext(AuthContext);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
    }, []);

    function handleScroll() {

        const scrollTop = document.getElementById("header").offsetTop;
        if (window.pageYOffset > scrollTop)
            setScrolling(true);
        else
            setScrolling(false);

    };

    function toggleNavbar() {
        setCollapsed(!collapsed)
    }


    let menu = <div className="d-sm-inline-flex company-name">Company Name</div>

    let headerClass = [];

    let imageClass = ["home-img"]

    if (scrolling) {
        headerClass.push("sticky");

        headerClass.push("box-shadow");

        imageClass.push("home-img-shrink");
    }


    if (auth) {

        menu = <div className="nav-menu">
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />

            <Collapse className="d-sm-inline-flex flex-sm-row-reverse nav-menu" isOpen={!collapsed} navbar>
                <ul className="navbar-nav flex-grow">
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                    </NavItem>
                </ul>
            </Collapse>

        </div>
    }

    return (

        <header id="header" className={headerClass.join(' ')} >
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow bg-white" light>
                <Container>

                    <NavbarBrand>
                        <img src={require('../images/travelx-logo.png')} className={imageClass.join(' ')} id="home-img" />
                    </NavbarBrand>

                    {menu}

                </Container>
            </Navbar>
        </header>

    );
}
