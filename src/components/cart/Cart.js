import React from 'react'
import {ShoppingState } from '../../context/ShoppingContext';
import { Button, Container, Grid } from '@mui/material';
import { generatePhoto } from '../../utils/utilFunctions';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate } from 'react-router-dom';

function Cart({item}) {
    const {deleteProduct } = ShoppingState();
    const navigate = useNavigate();

    return (
        <Grid component={Container} key={item.data._id} container spacing={2} sx={{ m: "auto", mt: 5, p: 2, border: "1px solid gray" }} >
            <Grid item xs={4} >
                <img id='imageProd' src={generatePhoto(item.data.categorie)} style={{height: 150, width:180}} />
            </Grid>

            <Grid item xs={6}>
                <p>Name : {item.data.name}</p>
                <p>Price : {item.data.price}</p>
                <p>Type : {item.data.type}</p>
                <p>Categorie : {item.data.categorie}</p>
            </Grid>
            <Grid item xs={2}>
                <p >Quantity : {item.Quantity}</p>
                <p style={{ display: 'flex', alignItems: 'center' }}>
                    Delete :
                    <DeleteIcon sx={{ ml: 1, '&:hover': { cursor: "pointer", color: "red" } }} onClick={() => deleteProduct(item, navigate)} />
                </p>
                <Button variant='contained' color='success'>
                    Buy Product
                </Button>
            </Grid>
        </Grid>
    )
}

export default Cart