import React, { useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import SingleProduct from '../singleProduct/SingleProduct';
import './style.css';

function ProductsList({ data, error }) {
    if(error){
        return (
            <Container sx={{pt:10, pb:56}}>
                <Typography variant='h6' sx={{ color: "red", border: '1px solid red', width: "70%", height: '150%', m: 'auto', p: 3, borderRadius: 2, bgcolor: 'pink' }}>Connection Problem, Verify Your are Connected To The Internet</Typography>
            </Container>
        )
    }

    return (
        <React.Fragment>

            <Container sx={{ py: 4 }} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4} >
                    {data.map((item) => (
                        <SingleProduct key={item._id} item={item} />
                    ))}
                </Grid>
            </Container>

        </React.Fragment>
    )
}

export default ProductsList