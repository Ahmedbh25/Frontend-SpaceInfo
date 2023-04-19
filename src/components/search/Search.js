import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
import { SearchState, Search_ACTIONS } from '../../context/SearchContext';
import { CircularProgress, Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },

}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function SearchInput() {
    const { searState, searchDispatch } = SearchState()
    const Search_Product = async (e) => {
        searchDispatch({ type: Search_ACTIONS.START });
        try {
            const Products = await axios.post("/products/name", { Productname: e.target.value.trim() })
            searchDispatch({ type: Search_ACTIONS.SUCCESS, payload: Products.data });

        } catch (error) {
            console.log(error)
            searchDispatch({ type: Search_ACTIONS.ECHEC, payload: error.response.data.message });
        }
    }
    const navigate = useNavigate();
    const handleClick = (id) => {
        searchDispatch({ type: Search_ACTIONS.INIT });
        navigate(`/product_details/${id}`)
    }

    return (
        <React.Fragment>
            <Search sx={{ width: { md: 600, sm: 500, xs: 250, }, m: "auto", my: 2, position: 'relative' }}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={Search_Product}
                />
            </Search>
            <>
                {searState ?
                    <List style={{ zIndex: 1, top: '23%', left: "26.5%", right: 0, width: '47%', backgroundColor: "rgba(0,0,0,0.8)"}}>
                        {searState.loading ?
                            <Box sx={{ display: 'flex', width: "20%", m: "auto", my: 20 }}>
                                <CircularProgress />
                            </Box>
                            :
                            <>
                                {searState.data.map((product, i) => (
                                    <Box key={product._id}>
                                        <ListItem onClick={() => handleClick(product._id)}>
                                            <ListItemText sx={{ '&:hover': { color: 'orange', cursor: 'pointer' }, }}>{i + 1} - {product.name}</ListItemText>
                                            <Divider variant="middle" sx={{ backgroundColor: 'white' }} />
                                        </ListItem>
                                    </Box>
                                ))
                                }
                            </>
                        }
                        {searState.error && <Typography sx={{ p: 2, fontSize: 17 }}>This Not Match any Product ...</Typography>}
                    </List>
                    : ''


                }
            </>

        </React.Fragment >

    )
}

export default SearchInput