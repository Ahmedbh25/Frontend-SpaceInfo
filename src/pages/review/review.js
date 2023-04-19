import React, { useState, useRef } from 'react'
import { Box, Typography, Button, Container, TextField, CircularProgress } from '@mui/material'
import Rating from '@mui/material/Rating';
import { REVIEW_ACTIONS, ReviewState } from '../../context/ReviewContext';
import axios from 'axios';

function Review() {
  const { revState, DispatchReview } = ReviewState();
  const [loading, setLoading] = useState(false);
  const errorProduct = useRef(null);
  const errorReview = useRef(null);
  const errorRating = useRef(null);
  const successMessage = useRef(null);

  console.log(revState);

  const handle_addReview = async (e) => {
    e.preventDefault();
    const userID = JSON.parse(localStorage.getItem('CurrentUser'))._id;
    let Prod= {
      ProdID : "",
      Prodname : ""
    }
    console.log(revState.product)
    try {
      const product = await axios.post('/products/one', { refer: revState.product });
      Prod.ProdID = product.data._id;
      Prod.Prodname = product.data.name.slice(0,20);
    } catch (error) {
      console.log(error)
      errorProduct.current.textContent = error.response.data.message ? error.response.data.message : "This reference does not refer to any product";
      setTimeout(() => {
        errorProduct.current.textContent = ""
      }, 5000)
      return
    }

    if(revState.review.length < 8){
      return errorReview.current.textContent = "Review Must Contain at least 8 Caracters !"
    }else{
      errorReview.current.textContent = "";
    }

    if(revState.rating === 0){
      return errorRating.current.textContent = "Choose rating value !";
    }else{
      errorRating.current.textContent = "";
    }

    console.log(Prod.userID)
    const { rating, review } = revState;
    const data = {
      review: { rating, review },
      userID: userID,
      productID: Prod.ProdID,
    }

    try {

      const addReview = await axios.post(`/reviews`, { data: data }, {withCredentials: true});
      console.log(addReview)
      setLoading(false)
      DispatchReview({type : REVIEW_ACTIONS.INIT});
      successMessage.current.textContent = `Review on Product ${Prod.Prodname} Has been ADDED Succesfully`
      setTimeout(() => {
        successMessage.current.textContent = ""
      }, 5000)
    } catch (error) {
      errorProduct.current.textContent = error.response.data.message ? error.response.data.message : "Someting Went Wrong"
      setTimeout(() => {
        errorProduct.current.textContent = ""
      }, 5000)

    }

  }

  return (
    <Box sx={{ py: 6 }}>
      <Container
        sx={{
          '& .MuiTextField-root': { m: 1, width: { xs: '25ch', md: '50ch' } },
          pb: 5,
          width: "50%", m: 'auto', border: "1px solid gray", p: 2
        }}
      >
        <Box component="form" onSubmit={handle_addReview} >
          <Typography variant='h6' sx={{ m: 1 }}>ADD Review On Product :</Typography>

          <TextField
            value={revState.product}
            label="Product Name"
            multiline
            sx={{ width: { xs: "50%", md: "100%" } }}
            onChange={(e) => DispatchReview({ type: REVIEW_ACTIONS.PRODUCT, payload: e.target.value })}
          />
          <Typography varaint='caption' sx={{ color: "red", m: 1, ml:2 }} ref={errorProduct}></Typography>
          <TextField
            value={revState.review}
            label="ADD Review"
            multiline
            sx={{ width: { xs: "50%", md: "100%" } }}
            rows={4}
            onChange={(e) => DispatchReview({ type: REVIEW_ACTIONS.REVIEW, payload: e.target.value })}
          />
          <Typography varaint='caption' sx={{ color: "red", m: 1, ml:2}} ref={errorReview}></Typography>
          <Box
            sx={{
              '& > legend': { mt: 2 },
              ml: 1,
              border: "1px solid gray",
              mt: 2,
              p: 2,
              width: '70%'
            }}
          >
            <Typography component="legend">Rating : </Typography>
            <Rating
              name="simple-controlled"
              value={revState.rating}
              onChange={(event, newValue) => DispatchReview({ type: REVIEW_ACTIONS.RATING, payload: newValue })}
            />
          </Box>
          <Typography varaint='caption' sx={{ color: "red", m: 1, ml:2 }} ref={errorRating}></Typography>

          <Typography varaint='caption' sx={{ color: "green", m: 1, fontWeight:"bold", mt:2, ml:2 }} ref={successMessage}></Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ m: 2 }}
            disabled={loading}
          >
            add Review
          </Button>
        </Box>
      </Container>
    </Box >
  )
}

export default Review