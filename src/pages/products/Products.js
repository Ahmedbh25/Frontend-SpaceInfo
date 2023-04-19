import React , {useEffect} from 'react';
import { Box, Container, Grid, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductsList from '../../components/productsList/ProductsList';
import Loading from '../../components/Loading/Loading';
import Filter from '../../components/filter/Filter.js';
import SidebarFilter from '../../components/filterSidebar/SidebarFilter';
import { FilterSidebarState} from '../../context/FilterSidebarContext';

import "./style.css";

function Products() {
  //const { data, loading, error } = useFetch("/products");
  const { stateFilter, loading, error } = FilterSidebarState()
  const products = stateFilter.products;
  const navigate = useNavigate()
  

  return (
    <Grid container spacing={2}>

      <Grid item xs={3}>
        <SidebarFilter />
      </Grid>
      <Grid item xs={9}>

        <Box sx={{ bgcolor: "silver" }}>

          <Container sx={{ pt: 5 }} >
            <Filter />
            {loading ?
              <Loading />
              :
              <ProductsList data={products} error={error} />
            }
          </Container>

        </Box>
      </Grid>

    </Grid>
  )
}

export default Products

/*
<FormGroup sx={{ ml: 2 }}>
{categorie.map((option) => (
    <FormControlLabel
        key={option}
        control={
            <Checkbox
                checked={checkedItems[option] || false}
                onChange={handleChange}
                name={option}
                sx={{ color: 'white' }}
            />
        }
        label={option}
    />
))}
</FormGroup>

*/