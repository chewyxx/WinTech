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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function ItineraryCard({ itinerary, username, userId }) {
    const [anchorElItinerary, setAnchorElItinerary] = useState(null);
    const settings = ['Edit','Delete'];

    const handleOpenItineraryMenu = (event) => {
        setAnchorElItinerary(event.currentTarget);
    };

    const handleCloseItineraryMenu = () => {
        setAnchorElItinerary(null);
    };

    const handleDeleteItinerary = async (itinerary) => {
        try {
            const res = await axios.delete(`http://localhost:4000/itineraries/${userId}/${itinerary._id}`, { withCredentials: true });
            if (res.data.success) {
                handleSuccess("Deleting itinerary");
                setTimeout(() => window.location.reload(), 1000);
            } else {
                handleError("Error, itinerary unable to be deleted!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleError = (err) => {
        toast.error(err, {
            position: "bottom-left",
        });
    }

    const handleSuccess = (msg) => {
        toast.success(msg, {
            position: "bottom-left",
            autoClose: 1000,
        });
    }

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

                <Typography component="div" variant="h5" sx = {{mt: -4}}>
                    {itinerary.title}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {itinerary.country}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', ml: 1, mb: 1 }}>
                <Typography>
                    <PlaceIcon />
                    {itinerary.country}
                    
                    <LocationCityIcon sx = {{mr: 0.2, mb: -0.3, ml: 3}}/>
                    {itinerary.cities}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', ml: 1, mb: 1 }}>
                <Typography>
                    <PersonIcon sx = {{mr: 0.2, mb: -0.3}}/>
                    {username}
                    
                    <CalendarTodayIcon sx = {{mr: 0.25, mb: -0.3, ml: 3}}/>
                    {itinerary.startDate}
                </Typography>
            </Box>
        </Box>
        <ToastContainer className="toast_container" />
    </Card>
  );
}