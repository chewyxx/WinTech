import * as React from 'react';
import { useState } from 'react';
import { Box, Card, CardContent, CardMedia, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "../Styles/ItineraryCard.css";
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function ItineraryCard({ itinerary, username, handleDeleteItinerary }) {
    console.log(itinerary.cities);
    const [anchorElItinerary, setAnchorElItinerary] = useState(null);
    const settings = ['Edit','Delete'];
  
    const startDate = moment(new Date(itinerary.startDate).toLocaleDateString()).format("DD/MM/YYYY");
    const endDate = moment(new Date(itinerary.endDate).toLocaleDateString()).format("DD/MM/YYYY");
    const diffTime = Math.abs(new Date(itinerary.endDate) - new Date(itinerary.startDate) + 1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    const handleOpenItineraryMenu = (event) => {
        setAnchorElItinerary(event.currentTarget);
    };

    const handleCloseItineraryMenu = () => {
        setAnchorElItinerary(null);
    };

    const settingsBar = (command) => {
        if (command === "Edit") {
            // itinerary details / activities page
        } else if (command === "Delete") {
            handleDeleteItinerary(itinerary);
        }
    };

    const settingsUI = (command) => {
        if (command === "Edit") {
            return  <EditIcon color="primary" sx = {{mb: -0.5, ml: -0.9, mr: 0.8}}/>;
        } else if (command === "Delete") {
            return <DeleteIcon color="error" sx = {{mb: -0.5, ml: -1, mr: 0.8}}/>;
        }
    };

  return (
    <Card sx={{ display: 'flex', borderRadius: '1rem', m: 2 }} style={{backgroundColor: "#FEF9C7"}}>
        <CardMedia className = "card"
            style={{height: "10.5rem", paddingTop: '1.5%', paddingBottom: '1.5%'}}
            component="img"
            sx={{ width: 175, borderRadius: '1rem' }}
            image={require("../Images/landing_wallpaper.jpg")}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx = {{mt:-3}}>
                <Box>
                    <IconButton aria-label="settings" sx = {{ml: 64}} onClick={handleOpenItineraryMenu}>
                        <MoreVertIcon/>
                    </IconButton>

                    <Menu
                        sx={{ mt: '35px' }}
                        anchorEl={anchorElItinerary}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 35,
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElItinerary)}
                        onClose={handleCloseItineraryMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={() => settingsBar(setting)}>
                                <Typography textAlign="center">
                                {settingsUI(setting)}
                                {setting}
                                </Typography> 
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                <Typography component="div" variant="h5" sx = {{mt: -4, fontWeight: 'bold'}} color="#026670">
                    <Link to={`/itineraries/${itinerary._id}`} style={{ textDecoration: 'none', color: '#026670' }}>
                        {itinerary.title}
                    </Link>
                </Typography>

                <Typography variant="subtitle1" color="#026670" component="div"  sx = {{fontWeight: 500}}>
                    {diffDays} day trip in {itinerary.country} 
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', ml: 1, mb: 1 }}>
                <Typography>
                    <PlaceIcon />
                    {itinerary.country}
                    
                    <LocationCityIcon sx = {{mr: 0.2, mb: -0.3, ml: 3}}/>
                    {itinerary.cities.join(", ")}

                    <Typography display="block" sx = {{mt: 1}}>
                    <PersonIcon sx = {{mr: 0.2, mb: -0.3}}/>
                    {username}

                    <CalendarTodayIcon sx = {{mr: 0.25, mb: -0.3, ml: 3}}/>
                    {startDate} to {endDate} 
                    </Typography>
                </Typography>
            </Box>
        </Box>
    </Card>
  );
}