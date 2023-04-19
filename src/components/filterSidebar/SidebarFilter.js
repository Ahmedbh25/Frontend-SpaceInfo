import React, { useState, useReducer } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { FilterSidebarState } from '../../context/FilterSidebarContext';
import { ACTIONS } from '../../context/FilterSidebarContext';
import './style.css';

function SidebarFilter() {
    const { constantProd, stateFilter, dispatchFilter, handleCategoryToggle, handleTypeToggle } = FilterSidebarState()
    return (
        <Box sx={{ bgcolor: "rgba(0,0,0,0.9)", color: "white", overflow: "hidden", p: 2, pb: 50 }} >
            <Typography variant="h6">Filter Computers: </Typography>

            <Typography sx={{ color: "orange", fontWeight: "bold", mt: 2 }} >Categorie: </Typography>

            <label style={{paddingTop:20}}>
                <input type="checkbox" checked={stateFilter.toggle.laptop} onChange={() => handleCategoryToggle('laptop')} />
                Laptop
            </label><br />
            <label>
                <input type="checkbox" checked={stateFilter.toggle.desktop} onChange={() => handleCategoryToggle('desktop')} />
                Desktop
            </label><br />

            <label>
                <input type="checkbox" checked={stateFilter.toggle.phone} onChange={() => handleCategoryToggle('phone')} />
                Smartphone
            </label><br />

            <Typography sx={{ color: "orange", fontWeight: "bold", mt: 2 }} >Types: </Typography>
            <label>
                <input type="checkbox" checked={stateFilter.toggle.asus} onChange={() => handleTypeToggle('asus')} />
                asus
            </label><br />
            <label>
                <input type="checkbox" checked={stateFilter.toggle.lenovo} onChange={() => handleTypeToggle('lenovo')} />
                Lenovo
            </label><br />
            <label>
                <input type="checkbox" checked={stateFilter.toggle.macos} onChange={() => handleTypeToggle('macos')} />
                Apple
            </label><br />

            <label>
                <input type="checkbox" checked={stateFilter.toggle.dell} onChange={() => handleTypeToggle('dell')} />
                Dell
            </label><br />

            <Button variant='contained' sx={{ mt: 2 }} onClick={() => dispatchFilter({ type: ACTIONS.DELETE_FILTER, payload: constantProd })} >clear Filter</Button>
        </Box>
    )
}

export default SidebarFilter