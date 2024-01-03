import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlaceIcon from '@mui/icons-material/Place';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import "../Styles/ItineraryCard.css";

export default function ItineraryCard({ itinerary, username }) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', borderRadius: '1rem', m: 2 }} style={{backgroundColor: "#FEF9C7"}}>
        <CardMedia className = "card"
            style={{height: "3.5em", paddingTop: '1.5%', paddingBottom: "1.5%"}}
            component="img"
            sx={{ width: 175, borderRadius: '1rem' }}
            image={require("../Images/landing_wallpaper.jpg")}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent>
                <Typography component="div" variant="h5">
                    {itinerary.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {itinerary.country}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Typography>
                    <PlaceIcon/>
                    {itinerary.country}
                    
                    <LocationCityIcon sx = {{ml: 3}}/>
                    {itinerary.cities}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Typography>
                    <PersonIcon/>
                    {username}
                    
                    <CalendarTodayIcon sx = {{ml: 3}}/>
                    {itinerary.startDate}
                </Typography>
            </Box>
        </Box>
    </Card>
  );
}