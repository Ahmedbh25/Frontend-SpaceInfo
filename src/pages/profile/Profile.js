import React, { useState, useEffect } from 'react'
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { Switch, Grid, Paper, Box, Typography, Button, Avatar, Rating } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PreviewIcon from '@mui/icons-material/Preview';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { AuthState } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PRO_ACTIONS, ProfileState } from '../../context/ProfileContext';
import Loading from '../../components/Loading/Loading';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F7F7F7',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.mode === 'dark' ? '#F7F7F7' : '#000',
  ...theme.typography.body2,
}));

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function Profile() {
  const { user} = AuthState();
  const { data, loading, error, proDispatch } = ProfileState();
  const [mode, setMode] = useState('light');
  const navigate = useNavigate();

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (!user){
      navigate('/login');
    }
  }, []);

  const GetDataFromAPI = async (searchWhat) => {
    proDispatch({ type: PRO_ACTIONS.START })
    const userID = JSON.parse(localStorage.getItem("CurrentUser"))._id;
    try {
      if (searchWhat === "reviews") {
        const data = await axios.post("/reviews/user", { userID: user._id });
        proDispatch({ type: PRO_ACTIONS.SUCCESS, payload: data.data });
      } else {
        const data = await axios.get(`/contacts/${user._id}`);
        proDispatch({ type: PRO_ACTIONS.SUCCESS, payload: data.data });
      }
    } catch (error) {
      proDispatch({ type: PRO_ACTIONS.ERROR, payload: error });
      console.log(error)
    }
  }

  console.log(data)
  const photo = "https://xsgames.co/randomusers/avatar.php?g=male";
  return (
    <ThemeProvider theme={{ ...theme, palette: { ...theme.palette, mode } }} >
      <Box sx={{ width: "20%", m: "auto" }}>
        <Switch
          edge="end"
          onChange={toggleMode}

          inputProps={{
            'aria-labelledby': 'switch-list-label-wifi',
          }}
          aria-label='ssss'
        />
        <span style={{ fontWeight: "bold" }}>{mode === 'light' ? 'dark' : 'light'}</span>
      </Box>

      <Grid container spacing={2} >
        <Grid item xs={4} >

          <Item>
            <List
              sx={{ width: '100%', maxWidth: 360 }}
              component="nav"
              aria-labelledby="nested-list-subheader"

            >
              <Avatar alt="Remy Sharp" src={photo} sx={{ display: "inline-block", width: 40, height: 40, border: "2px solid white" }} />
              <Typography variant='h6'>{user && user.username}</Typography>
              <ListItemButton sx={{ mt: 5 }} onClick={() => GetDataFromAPI("reviews")}>
                <ListItemIcon>
                  <PreviewIcon sx={{ color: mode === 'light' ? '#1A2027' : '#F7F7F7' }} />
                </ListItemIcon>
                <ListItemText primary="Your Reviews" />
              </ListItemButton>
              <ListItemButton sx={{ mt: 5, mb: 20 }} onClick={() => GetDataFromAPI("contacts")}>
                <ListItemIcon>
                  <ContactMailIcon sx={{ color: mode === 'light' ? '#1A2027' : '#F7F7F7' }} />
                </ListItemIcon>
                <ListItemText primary="Your Contacts" />
              </ListItemButton>
            </List>
          </Item>
        </Grid>
        <Grid item xs={8} >
          <Item>
            <Avatar alt="Remy Sharp" src={photo} sx={{ display: "inline-block", width: 80, height: 80, border: "2px solid white" }} />

            <Typography variant="h3" sx={{ color: mode === 'light' ? 'purple' : 'silver', frontWeight: "bold" }} >
              {user && user.first_name} {user && user.last_name}</Typography>


            {error ? (
              <Typography variant='h6' sx={{ color: 'red' }}>{error}</Typography>
            ) : (
              <>
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    {data.map(item => (
                      <Box key={item._id} sx={{ border: `1px solid ${mode === 'light' ? "purple" : 'silver'}`, m: 5 }}>
                        {item.contact_message ? (
                          <Typography variant='h6' sx={{ p: 2, m: 2 }}>
                            <span style={{ color: mode === 'light' ? "purple" : 'silver' }}>Contact :</span> {item.contact_message}
                          </Typography>
                        ) : (
                          <>
                            <Typography variant='h6' sx={{ p: 2 }}>
                              <span style={{ color: mode === 'light' ? "purple" : 'silver' }}>Review :</span> {item.review}
                            </Typography>
                            <Typography variant='h6' sx={{ p: 2 }}>
                              Rating :
                              <Rating
                                sx={{ color: "purple" }}
                                name="user-rating"
                                value={item.rating}
                                readOnly
                              />
                            </Typography>
                          </>
                        )}
                        <Button variant='outlined' color="error" sx={{ m: 2 }}>Delete</Button>
                        <Button variant='outlined' color="success" sx={{ m: 2 }}>Update</Button>
                      </Box>
                    ))}
                  </>
                )}
              </>
            )}

          </Item>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Profile