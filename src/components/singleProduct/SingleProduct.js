import React from 'react'
import { Typography, Grid, CardMedia, CardContent, CardActions, Card, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { generatePhoto } from '../../utils/utilFunctions';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../../context/AuthContext';
import { SHOP_ACTIONS, ShoppingState } from '../../context/ShoppingContext';
import './style.css';
function SingleProduct({ item }) {
    const {DispatchShop} = ShoppingState();
    const imageProduct = generatePhoto(item.categorie);
    const navigate = useNavigate();
    return (
        <Grid item xs={12} sm={6} md={4}>


            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                id="CardItem"
            >
                <CardMedia
                    component="img"
                    sx={{ height: 200 }}
                    image={imageProduct}
                    alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" sx={{ mb: 1 }}>
                        {item.name.substring(0, 30)}...
                    </Typography>

                    <Typography gutterBottom variant="caption" sx={{ mb: 1 }}>
                        [ {item.reference} ]
                    </Typography>
                    <Typography gutterBottom component="h2" color="gray" sx={{ mb: 1 }}>
                        {item.type === 'MACOS' ? "APPLE" : item.type}
                    </Typography>
                    <Typography gutterBottom component="h2" color="purple" sx={{ mb: 1 }}>
                        {item.categorie}
                    </Typography>
                    <Typography component="h2" sx={{ color: item.inStock ? "green" : "red" }} >
                        {item.inStock ? "In Stock" : "Unavailable"}
                    </Typography>
                    <Typography gutterBottom color="red" component="h2" sx={{ mb: 1 }}>
                        {item.price}, 000 DT
                    </Typography>
                </CardContent>
                <CardActions sx={{ bgcolor: "black" }}>
                    <Button size="small" variant='outlined' id="btnprod" onClick={()=>DispatchShop({type : SHOP_ACTIONS.ADD_TO_CARD, payload : item })}><ShoppingCartIcon />Add Product</Button>
                    <Button size="small" variant='outlined' id="btnprod" onClick={() => navigate(`/product_details/${item._id}`)}>Show Product</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default SingleProduct