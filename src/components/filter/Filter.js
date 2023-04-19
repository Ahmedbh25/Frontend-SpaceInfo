import React, { useState } from 'react'
import { Typography, Box, Grid, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ACTIONS } from '../../context/FilterSidebarContext';
import { FilterSidebarState } from '../../context/FilterSidebarContext';

function Filter() {
    const [sort, setSort] = useState('ALL COMPUTERS');
    const { constantProd, dispatchFilter } = FilterSidebarState();
    const handleChange = (event) => {
        setSort(event.target.value);
    };

    return (
        <Box sx={{ bgcolor: "rgba(0,0,0,0.9)", borderRadius: 2, width: "90%", m: "auto", pt: 2, pl: 4, display: { xs: "block", md: "flex" } }}>

            <Grid container spacing={1}>
                <Grid item xs={12}  md={4}>
                    <Typography variant="h6" sx={{ color: "white" }}> Sort Computers : </Typography>
                </Grid>

                <Grid item xs={12} md={4}  >
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={sort}
                        sx={{ color: "yellow", mb: 2, bgcolor: "gray", borderRadius: 2, fontWeight: "bold", fontSize: 17, width: 200, height: 40 }}
                        onChange={handleChange}
                    >
                        <MenuItem value="ALL COMPUTERS"  onClick={() => dispatchFilter({ type: ACTIONS.DELETE_FILTER, payload: constantProd })} >All</MenuItem>
                        <MenuItem value="Price Descending" onClick={() => dispatchFilter({ type: ACTIONS.PRICE_DESC })} >Price Descending</MenuItem>
                        <MenuItem value="Price Acsending" onClick={() => dispatchFilter({ type: ACTIONS.PRICE_ASC })} >Price Acsending</MenuItem>
                        <MenuItem value="In Stock" onClick={() => dispatchFilter({ type: ACTIONS.IN_STOCK })} >In Stock</MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={12}md={4}>
                    <Button variant='contained' sx={{ height: { xs: 40, width:200 }, mb:1 }} onClick={() => dispatchFilter({ type: ACTIONS.DELETE_FILTER, payload: constantProd })} >Clear Filter</Button>
                </Grid>

            </Grid>
        </Box>
    )
}

export default Filter