import React, {useState} from 'react'
import { Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
const pages = ['Home', 'Products', "Browse", 'Contact', 'Review'];

function NavLinks({user}) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                    <Button
                        component={Link}
                        id='NavLink'
                        to={(page === "Contact" || page === "Review") && !user ? "/login" : page === 'Home' ? "/" : page}
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block', ml: 3, mt: 5 }}
                    >
                        {page}
                    </Button>
                ))}
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography
                                textAlign="center"
                                component={Link}
                                id='NavLink'
                                to={(page === "Contact" || page === "Review") && !user ? "/login" : page === 'Home' ? "/" : page}

                                sx={{ mx: 5, my: 1, color: 'black', display: 'block', textDecoration: "none" }}
                            >{page}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </>
    )
}

export default NavLinks