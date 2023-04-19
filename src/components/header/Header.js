import React, { useEffect} from 'react';
import { Toolbar, Container, AppBar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SearchInput from '../search/Search';
import { AuthState } from '../../context/AuthContext';
import Basket from './basket/Basket';
import NavLinks from './navLinks/NavLinks';
import Logo from './logo/Logo';
import AuthButtons from './authButtons/AuthButtons';
import './style.css';

function Header() {
    const navigate = useNavigate()
    const { user} = AuthState();
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [])
    return (
        <AppBar position="static" >
            <Container maxWidth="xl" className="appBar">

                <Toolbar disableGutters>
                    <Logo />
                    <NavLinks user={user} />
                    <Basket />
                    <AuthButtons navigate={navigate} />
                </Toolbar>

                <SearchInput />

            </Container>
        </AppBar>
    );
}
export default Header;

