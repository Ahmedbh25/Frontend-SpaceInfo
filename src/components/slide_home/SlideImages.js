import React from 'react';
import HeroSlider, { Slide } from 'hero-slider';
import { Grid } from '@mui/material';
import Background1 from '../../img/6TRUp9.jpg';
import Background2 from '../../img/I9X8R75.jpg';
import Background3 from '../../img/prod2.jpg';
import Background4 from '../../img/murjp1nk4lp1idlt.jpg';
import './style.css';

const images = [Background4, Background3, Background1, Background2];

function BrowseSlider({TextSlider}) {
  return (
    <HeroSlider
      slidingAnimation="left-to-right"
      orientation="horizontal"
      initialSlide={1}
      onBeforeChange={(previousSlide, nextSlide) =>
        console.log('onbeforechange', previousSlide, nextSlide)
      }
      onChange={(nextSlide) => console.log('onChange', nextSlide)}
      onAfterChange={(nextSlide) => console.log('onafterchange', nextSlide)}
      style={{ backgroundColor: 'rgba(0,0,0,0.33)', maxHeight: '300px' }}
      settings={{
        slidingDuration: 250,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: true,
        autoplayDuration: 5000,

      }}
    >
      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid item xs={12} key={image} >
              <Slide
                background={{
                  backgroundImage: `url(${image})`,
                  backgroundAttachment: 'fixed',
                  backgroundSize: 'cover',
                }}
              >
                <TextSlider />
              </Slide>


          </Grid>
        ))}
      </Grid >
    </HeroSlider>
  );
}

export default BrowseSlider;