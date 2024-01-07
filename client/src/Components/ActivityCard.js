import * as React from 'react';
import { useState } from 'react';
import { Box, Card, CardContent, CardMedia, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PlaceIcon from '@mui/icons-material/Place';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "../Styles/ItineraryCard.css";
import moment from 'moment';

export default function ActivityCard({ activity, handleDeleteActivity }) {
    const [anchorElActivity, setAnchorElActivity] = useState(null);
    const settings = ['Edit','Delete'];

    const handleOpenActivityMenu = (event) => {
        setAnchorElActivity(event.currentTarget);
    };

    const handleCloseActivityMenu = () => {
        setAnchorElActivity(null);
    };

    const settingsBar = (command) => {
        if (command === "Edit") {
            // itinerary details / activities page
        } else if (command === "Delete") {
            handleDeleteActivity(activity);
        }
    };

    const settingsUI = (command) => {
        if (command === "Edit") {
            return <EditIcon color="primary" sx = {{mb: -0.5, ml: -0.9, mr: 0.8}}/>;
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
                    <IconButton aria-label="settings" sx = {{ml: 64}} onClick={handleOpenActivityMenu}>
                        <MoreVertIcon/>
                    </IconButton>

                    <Menu
                        sx={{ mt: '35px' }}
                        anchorEl={anchorElActivity}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 35,
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElActivity)}
                        onClose={handleCloseActivityMenu}
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
                    {activity.title}
                </Typography>

                <Typography variant="subtitle1" color="#026670" component="div"  sx = {{fontWeight: 500}}>
                    {activity.remark} 
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', ml: 1, mb: 1 }}>
                <Typography>
                    <PlaceIcon />
                    {activity.address}
                    
                    <AccessTimeFilledIcon sx = {{mr: 0.2, mb: -0.3, ml: 3}}/>
                    {activity.openingHours}
                </Typography>
            </Box>
        </Box>
    </Card>
  );
}