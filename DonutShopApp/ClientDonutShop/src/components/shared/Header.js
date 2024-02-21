import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
};

const Header = ({ user }) => {
    // Check if the user has an order
    const hasOrder = localStorage.getItem('order');

    const authenticatedOptions = (
        <>
            <Nav.Item className='m-2'>
                <Link to='change-password' style={linkStyle}>
                    Change Password
                </Link>
            </Nav.Item>
            <Nav.Item className='m-2'>
                <Link to='sign-out' style={linkStyle}>
                    Sign Out
                </Link>
            </Nav.Item>

            {/* Render "Orders" button only if hasOrder is true */}
            {hasOrder && (
                <Nav.Item className='m-2'>
                    <Link to='/orders/mine' style={linkStyle}>
                        Orders
                    </Link>
                </Nav.Item>
            )}

            <Nav.Item className='m-2'>
                <Link to='/donuts' style={linkStyle}>
                    Donuts
                </Link>
            </Nav.Item>
            <Nav.Item className='m-2'>
                <Link to='/coffees' style={linkStyle}>
                    Coffees
                </Link>
            </Nav.Item>
        </>
    );

    const unauthenticatedOptions = (
        <>
            <Nav.Item className='m-2'>
                <Link to='sign-up' style={linkStyle}>Sign Up</Link>
            </Nav.Item>
            <Nav.Item className='m-2'>
                <Link to='sign-in' style={linkStyle}>Sign In</Link>
            </Nav.Item>
            <Nav.Item className='m-2'>
                <Link to='Donuts' style={linkStyle}>Donuts</Link>
            </Nav.Item>
            <Nav.Item className='m-2'>
                <Link to='Coffees' style={linkStyle}>Coffees</Link>
            </Nav.Item>
        </>
    );

    const alwaysOptions = (
        <>
            <Nav.Link>
                <Link to='/' style={linkStyle}>
                    Home
                </Link>
            </Nav.Link>
        </>
    );

    return (
        <Navbar bg='primary' variant='dark' expand='md'>
            <Navbar.Brand>
                <Link to='/' style={linkStyle}>
                    Donuts App
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto'>
                    {user && (
                        <span className='navbar-text mr-2'>Welcome, {user.email}</span>
                    )}
                    {alwaysOptions}
                    {user ? authenticatedOptions : unauthenticatedOptions}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;


