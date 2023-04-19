import React, { useState } from 'react';
import { Badge, Box, Grid, IconButton, Menu, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { SHOP_ACTIONS, ShoppingState } from '../../../context/ShoppingContext';
import laptop from '../../../img/products/desktop8.jpeg'
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
function Basket() {
    const { shopsState, DispatchShop } = ShoppingState();
    const navigate = useNavigate();
    const [BasketNav, setBasketNav] = useState(null);
    const user = JSON.parse(localStorage.getItem("CurrentUser"));
    const handleOpenNavBasket = (event) => {
        setBasketNav(event.currentTarget);
    };
    const handleCloseNavBasket = () => {
        setBasketNav(null);
    };
    const Shopping_card = JSON.parse(localStorage.getItem("Shopping_card"));


    return (
        <>
            {!user ?
                <RemoveShoppingCartIcon sx={{ mr: 5 }} />
                :
                <>
                    <IconButton color="inherit" sx={{ mr: 5 }} onClick={handleOpenNavBasket}>
                        <Badge badgeContent={shopsState.Count} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={BasketNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(BasketNav)}
                        onClose={handleCloseNavBasket}
                        PaperProps={{
                            sx: {
                                bgcolor: "rgba(0, 0, 0, 0.8)",
                                color: "white",
                                height: "200px",
                                overflowY: "scroll",
                                px: 3,
                                py: 1

                            },
                        }}
                    >
                        <p style={{ textAlign: "center" }}> Total Price : {shopsState.totalPrice}, 000 DT</p>
                        {shopsState.Count !== 0 ?
                            <Typography variant="body2" sx={{ color: "#4caf50", border: "1px solid #00FF00", width: "50%", m: "auto", fontWeight: "bold", my: 2, textAlign: "center", '&:hover': { cursor: "pointer", color: "#00FF00" } }} onClick={() => navigate("/cards")} >SHOW ALL CARDS</Typography>
                            :
                            <Box sx={{ textAlign: "center"}}>
                                <p style={{color: "red" }}>Empty Basket</p>
                                <p >add Product First ...</p>
                            </Box>
                        }
                        {shopsState.allProducts.map(product => (
                            <Grid container spacing={2} key={product.data._id} >
                                <Grid item xs={3}>
                                    <img style={{ float: 'right', width: 50, height: 140 }} alt="Remy Sharp" src={laptop} sx={{ display: "inline-block", width: 40, height: 40, border: "2px solid white" }} />
                                </Grid>
                                <Grid item xs={9}>
                                    <h5><span style={{ color: "#e040fb" }}>name :</span> <Link to={`/card/${product.data._id}`} style={{ textDecoration: "none", color: "#fff", '&:hover': { color: "pink" } }}> {product.data.name.slice(0, 20)} ...</Link></h5>
                                    <h5><span style={{ color: "#e040fb" }}> price :</span> {product.data.price}, 000 DT</h5>
                                    <h5><span style={{ color: "#e040fb" }}>Quantity :</span> {product.Quantity}
                                    <DeleteIcon sx={{ ml: 12, '&:hover': { cursor: "pointer", color: "pink"} }} onClick={() => DispatchShop({ type: SHOP_ACTIONS.DELETE_FROM_CARD, payload: product.data })} /> </h5>
                                </Grid>
                            </Grid>
                        ))
                        }
                    </Menu>
                </>
            }
        </>
    )
}

export default Basket