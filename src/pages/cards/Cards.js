import React from 'react'
import {ShoppingState } from '../../context/ShoppingContext';
import Cart from '../../components/cart/Cart';
import { Typography } from '@mui/material';

function Cards() {
    const { shopsState} = ShoppingState();
    
    return (
        <>
        {shopsState.allProducts.length < 1 && <Typography variant="h6" sx={{py:10, textAlign:"center", color:"red"}}>No Products added To The List</Typography>}
        {shopsState.allProducts.map(Product=>(
            <Cart item ={Product} key={Product.data._id} />
        ))
        }
        </>
    )
}

export default Cards