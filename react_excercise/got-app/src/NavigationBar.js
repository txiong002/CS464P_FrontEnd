import React from 'react';
import { Navbar, Nav, NavItem, NavLink, Container } from 'reactstrap';
import './NavigationBar.css';

const NavigationBar = () => {
    return (
        <Navbar color='secondary'>
            <Container>
                <Nav>
                    <NavItem>
                        <NavLink
                            className='nav-link text-dark fw-bold fs-4'
                            href='/'
                        >
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className='nav-link text-dark fw-bold fs-4'
                            href='/search'
                        >
                            Search
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className='nav-link text-dark fw-bold fs-4'
                            href='/houses'
                        >
                            Houses
                        </NavLink>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
