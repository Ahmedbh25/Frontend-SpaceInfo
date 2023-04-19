import React, { useEffect } from 'react';
import { Typography, Box, Container, Grid, Paper, Rating } from '@mui/material';
import styled from '@emotion/styled';
import Background1 from '../../img/6TRUp9.jpg';
import Background2 from '../../img/I9X8R75.jpg';
import Background3 from '../../img/prod2.jpg';
import Background4 from '../../img/murjp1nk4lp1idlt.jpg';
import BrowseSlider from '../../components/slide_home/SlideImages';
import { PRO_ACTIONS, ProfileState } from '../../context/ProfileContext';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';

const images = [Background4, Background3, Background1, Background2];

const TextSlider = () => {
  return (
    <Box sx={{ color: "#f3e5f5", fontWeight: "bold" }}>
      <Typography variant="h2" sx={{ pt: 5, fontWeight: "bold", textAlign: "center" }} >Space-Info : </Typography>
      <Typography variant="h6" sx={{ width: "50%", m: "auto", mt: 5, fontWeight: "bold" }} >Space-Info Offre You Products Like Laptops, Desktops, Phones, ...
        Here We Can Se Other People Options on our Services and Sort Them By rating.
      </Typography>
    </Box>
  )
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1A2027',

  textAlign: 'center',
  color: '#fff'
}));
function Browse() {
  const { proState, proDispatch } = ProfileState();

  useEffect(() => {
    const Fetch_all_Reviews = async () => {
      proDispatch({ type: PRO_ACTIONS.START });
      try {
        const reviews = await axios.get('/reviews');
        proDispatch({ type: PRO_ACTIONS.SUCCESS, payload: reviews.data });

      } catch (error) {
        proDispatch({ type: PRO_ACTIONS.ECHEC, payload: error });
      }
    }
    Fetch_all_Reviews();
  }, [])

  console.log(proState.error)
  return (
    <>
      <BrowseSlider TextSlider={TextSlider} />
      <Container sx={{ mb: 10 }}>
        <Typography variant='h3' sx={{ textAlign: "center", my: 5 }}>
          List of all Reviews :
        </Typography>
        {proState.error && <Typography variant='h6' sx={{color:"red", textAlign:"center"}}> No Reviews Founded ...</Typography>}

        {proState.Loading ?
          <Loading />
          :
          <Grid container spacing={2} >
            {proState.data.map(item => (
              <Grid item xs={12} md={6} lg={4} key={item._id}>
                <Item>
                  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '200px' }}>
                    <Typography variant="h6" sx={{ p: 2 }}> <span style={{ color: "#ce93d8" }}>Review :</span> {item.review}</Typography>
                    <Typography variant='h6' sx={{ p: 3 }}>
                      Rating :
                      <Rating
                        sx={{ color: "#ffee58" }}
                        name="user-rating"
                        value={item.rating}
                        readOnly
                      />
                    </Typography>
                  </Box>
                </Item>
              </Grid>
            ))}

          </Grid>
        }
      </Container>
    </>
  );
}

export default Browse;


