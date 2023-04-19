import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import useFetch from "../../hooks/useFetch.js";
import ProductsList from '../../components/productsList/ProductsList';
import Loading from '../../components/Loading/Loading';
import BrowseSlider from '../../components/slide_home/SlideImages.js';
import "./style.css";

const TextForSlider = ()=>{
  return(
    <Box sx={{color:"#f3e5f5", fontWeight:"bold"}}>
    <Typography variant="h2" sx={{ pt: 5, fontWeight:"bold" }} >Space-Info : </Typography>
    <Typography variant="h6" sx={{ width: "50%", m: "auto", mt: 5, fontWeight:"bold" }} >Space-Info Offre You Products Like Laptops, Desktops, Phones, ...
      We Have The Best Quality & The Lowest Prices, also you can make orders from home without Taxes.
    </Typography>
  </Box>
  )
}

function Home() {
  const { data, loading, error } = useFetch(`/products`);

  return (
    <React.Fragment>
      
      <Paper sx={{ bgcolor: "rgba(0,0,0,0.1)", color: "black", textAlign: "center", pb : error && 20  }}>
        <BrowseSlider TextSlider = {TextForSlider} />

        {loading ?
          <Loading />
          :
          <React.Fragment>

            <Box sx={{ mt: 10 }}>
              <Typography variant="h4">List of Some Products : </Typography>
              <ProductsList data={data} />
            </Box>

          </React.Fragment>
        }
        {error &&
          <Typography variant='h6' sx={{ color: "red", border:'1px solid red', width:"50%",height:"150%", m:'auto', p:3, borderRadius:2, bgcolor:'pink' }}>Connection Problem, Verify Your are Connected To The Internet</Typography>
        }

      </Paper>
    </React.Fragment>

  )
}

export default Home