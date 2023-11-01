import React from 'react';
import { Navbar, Nav, NavItem, NavLink, Container } from 'reactstrap';
import './NavigationBar.css';

const NavigationBar = () => {
    return (
        <Navbar color='info'>
            <Container>
                <Nav>
                    <NavItem>
                        <NavLink className='nav-link' href='/home'>
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='nav-link' href='/search'>
                            Search
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='nav-link' href='/houses'>
                            Houses
                        </NavLink>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
