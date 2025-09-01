import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Footer from './Footer';

const Body = () => {
    return (
        <>
            <Navbar />
            <Outlet>
                <Login />
                <Profile />
            </Outlet>
            <Footer />
        </>
    );
};

export default Body;