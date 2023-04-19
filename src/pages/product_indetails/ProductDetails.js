import React, { useState, useEffect } from 'react'
import { Box, Button, Container, Divider, Rating, Typography, Grid, Paper, styled} from '@mui/material';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading/Loading';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { generatePhoto } from '../../utils/utilFunctions';
import { PRO_ACTIONS, ProfileState } from '../../context/ProfileContext';
import { SHOP_ACTIONS, ShoppingState } from '../../context/ShoppingContext';
import './style.css';

function ProductDetails() {
    const { shopsState, DispatchShop } = ShoppingState();
    const { proState, proDispatch } = ProfileState()
    const location = useLocation();
    const prodID = location.pathname.split("/")[2];
    const { data, loading, error } = useFetch(`/products/${prodID}`);
    let imageProduct;
    if (data.categorie) {
        imageProduct = generatePhoto(data.categorie);
    }
    useEffect(() => {
        const Fetch_Product_Reviews = async () => {
            proDispatch({ type: PRO_ACTIONS.START });
            try {
                const responce = await axios.post('/reviews/product', { productID: prodID });
                proDispatch({ type: PRO_ACTIONS.SUCCESS, payload: responce.data });
            } catch (error) {
                proDispatch({ type: PRO_ACTIONS.ECHEC, payload: error.message });
            }
        }
        Fetch_Product_Reviews();
    }, [])
    console.log(proState);
    return (
        <>
            {loading ?
                <Loading />
                :
                <Container sx={{ pt: 5, bgcolor: "#e7e7e7", pb: 20 }} >

                    <Grid container spacing={3} sx={{ py: 10 }} >
                        <Grid item xs  >
                            <Box
                                component="img"
                                sx={{
                                    height: 333,
                                    width: 350,
                                    maxHeight: { xs: 233, md: 567 },
                                    maxWidth: { xs: 350, md: 350 },
                                }}
                                alt="The house from the offer."
                                src={imageProduct}
                                id="imageProd"
                            />
                        </Grid>

                        <Grid item xs={6} sx={{ bgcolor: "#eeeeee" }}>

                            <Typography variant="h6" sx={{ color: "blue" }}>
                                {data.name}
                            </Typography>

                            <Typography variant="h6" sx={{ color: data.inStock ? "green" : "red", my: 2 }}>
                                {data.inStock ? " In Stock" : "Not Available"}
                            </Typography>


                            <Typography variant="body2" sx={{ my: 2 }}>
                                Total Stock : <Box component="span" sx={{ color: 'red', fontWeight: "bold" }}>{data.stock}</Box> Product
                            </Typography>

                            <Typography variant="caption" sx={{ color: "gray" }}>
                                Reference#: {data.reference}
                            </Typography>

                            <Typography variant="body2" sx={{ lineHeight: 1.8, my: 2 }}>
                                {data.description}
                            </Typography>

                        </Grid>
                        <Divider orientation="vertical" variant="middle" sx={{ color: "black" }} flexItem />

                        <Grid item xs sx={{ bgcolor: "#eeeeee" }}>
                            <Typography variant="h5" sx={{ color: 'red', my: 2 }}>
                                {data.price}, 000 DT
                            </Typography>
                            <Typography variant="h6" sx={{ my: 2 }}>
                                Quantity : <input type="number" default='10' style={{ width: 50, height: 20 }} min="1" max={data.stock}></input>
                            </Typography>

                            <Button variant='contained' color='success' onClick={()=>DispatchShop({type : SHOP_ACTIONS.ADD_TO_CARD, payload : data })}>
                                Add to Cart
                            </Button>
                        </Grid>
                    </Grid>
                    {proState.loading ?
                        <Loading />
                        :
                        <>
                            <Typography variant='h4' sx={{ textAlign: "center", my: 5 }}>
                            Reviews On This Product :
                            </Typography>
                            {proState.data.map(item => (
                                <Box key={item._id} sx={{ border: "1px solid gray", width: "70%", m: 'auto' }}>
                                    <Typography variant='h6' sx={{ p: 2 }}><span style={{}}>Review :</span> {item.review}</Typography>
                                    <Typography variant='h6' sx={{ p: 2 }}>Rating :
                                        <Rating
                                            sx={{ color: "purple", ml: 2 }}
                                            name="user-rating"
                                            value={item.rating}
                                            readOnly
                                        />
                                    </Typography>
                                </Box>
                            ))

                            }
                        </>

                    }
                    {proState.error && <Typography variant='h6' sx={{ width: "30%", m: 'auto', color: 'red', pb: 20 }}>There is no review for this Product </Typography>}
                </Container >
            }
        </>
    )
}

export default ProductDetails