import React, { useEffect } from 'react'
import {ShoppingState } from '../../context/ShoppingContext';
import { useLocation, useNavigate } from 'react-router-dom';
import "./style.css"
import Cart from '../../components/cart/Cart';

function Card() {
    const { shopsState, DispatchShop, deleteProduct } = ShoppingState();
    const location = useLocation();
    const navigate = useNavigate();
    let productID = location.pathname.split("/")[2];
    useEffect(() => {
        if (!productID) {
            navigate('/products');
        }
    }, []);

    const Product = shopsState.allProducts.filter(Product => Product.data._id === productID)

    return (
        <>
            {Product.map((item) => (
                <Cart item = {item} deleteProduct = {() => deleteProduct(Product, navigate)} />
            ))}
        </>
    )
}

export default Card




/*<Grid container spacing={2}>
  <Grid xs={8}>
    <Item>xs=8</Item>
  </Grid>
  <Grid xs={4}>
    <Item>xs=4</Item>
  </Grid>*/