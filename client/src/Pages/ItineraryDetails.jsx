import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from '../Components/Navbar';
import { Box, IconButton, Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "../Styles/ItineraryDetails.css";
import { ToastContainer, toast } from "react-toastify";
import ActivityCard from "../Components/ActivityCard";
import useFetch from '../Hooks/useFetch';
import dayjs from 'dayjs';

const ItineraryDetails = () => {

    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");

    const [itineraryId, setItineraryId] = useState("");
    const [itineraryTitle, setItineraryTitle] = useState("");
    const [itineraryStartDate, setItineraryStartDate] = useState("");
    const [itineraryEndDate, setItineraryEndDate] = useState("");

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { data } = useFetch(`http://localhost:4000/api/users`);
    const { id } = useParams();

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
              navigate("/login");
              return;
            }
            
            try {
                const res = await axios.post("http://localhost:4000", {}, { withCredentials: true });

                setEmail(res.data.email);
                setUsername(res.data.user);

                if (!res.data.status) {
                  removeCookie("token");
                  navigate("/login");
                }
            } catch (error) {
                console.error('verifyCookie error:', error);
                navigate("/login");
            }
        };

        const getUser = async () => {
            if (userId === "" && email !== "") {
                try {
                    if (data.data) {
                        setUserId(await data.data.find(user => user.email === email)._id);
                    }
                } catch (error) {
                    console.error('getUser error:', error);
                }
            }
        }

        const getItinerary = async () => {
            if (userId !== "") {
                try {
                    const res = await axios.get(`http://localhost:4000/itineraries/${userId}`, { withCredentials: true });
                    const selectedItinerary = res.data.data.find(itinerary => itinerary._id === id);
                    if (selectedItinerary) {
                        setItineraryId(selectedItinerary._id);
                        setItineraryTitle(selectedItinerary.title);
                        const startDate = dayjs(new Date(selectedItinerary.startDate)).format("MM/DD/YYYY");
                        const endDate = dayjs(new Date(selectedItinerary.endDate)).format("MM/DD/YYYY");
                        setItineraryStartDate(startDate);
                        setItineraryEndDate(endDate);
                    } else {
                        console.error('Selected itinerary not found');
                    }
                } catch (error) {
                    console.error('getItinerary error:', error);
                }
            }
        }
          
        verifyCookie();
        getUser();
        getItinerary();

    }, [navigate, cookies, removeCookie, email, data, loading, userId, id, itineraryId]);

    useEffect(() => {
        if (loading && userId && itineraryId !== "") {
            axios.get(`http://localhost:4000/activities/${itineraryId}`, { withCredentials: true })
                .then((response) => {
                    setActivities(response.data.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(true);
                    console.log("error");
                });
        }
        console.log(activities);
    }, [userId, itineraryId, activities, loading]);

    const handleDeleteActivity = (activity) => {
        if (window.confirm('Are you sure you wish to delete this item?')) {
           deleteActivity(activity) 
       } 
    }

    const deleteActivity = async (activity) => {
       try {
           const res = await axios.delete(`http://localhost:4000/activities/${itineraryId}/${activity._id}`, { withCredentials: true });
           if (res.data.success) {
               window.location.reload();
           } else {
               handleError("Error, activity unable to be deleted!");
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

    const sortActivitiesByDays = (activities, startDate, endDate) => {
        const activitiesByDays = {};

        // Initialize activitiesByDays with an empty array for each day
        const start = dayjs(startDate);
        const end = dayjs(endDate);
        for (let day = start; day.isBefore(end) || day.isSame(end); day = day.add(1, 'day')) {
            const index = day.diff(start, 'day');
            activitiesByDays[index] = [];
        }

        activities.forEach(activity => {
            const date = dayjs(activity.date);
            const day = date.diff(start, 'day');
            console.log(date);
            console.log(start);
            console.log(day);

            // Add the activity to the array for this date
            if (activitiesByDays[day]) {
                activitiesByDays[day].push(activity);
            }
            
        });

        // Convert the object to an array of arrays
        const activitiesByDaysArray = Object.values(activitiesByDays);

        return activitiesByDaysArray;
    }

    return (
        <div className="home_page">
            <div>
                <NavBar/>
            </div>
            <div className="itinerarydetails">
                <h3>{itineraryTitle}</h3>
                <IconButton>
                    <Link to={`/itineraries/${itineraryId}/add-activity`}> 
                        <AddCircleIcon fontSize="large" sx={{color:"#008000"}}/>
                    </Link>
                </IconButton>
                <text>{itineraryStartDate} - {itineraryEndDate}</text>
            </div>
        
            <Box className="itinerarydetails" sx={{m: 2, width: "50rem"}}>
                {sortActivitiesByDays(activities, itineraryStartDate, itineraryEndDate).map((activitiesForOneDay, index) => (
                    <div key={index}>
                    <h4>Day {index + 1}</h4>
                    {activitiesForOneDay.map(activity => (
                        <ActivityCard 
                            key={activity._id}
                            activity={activity}
                            handleDeleteActivity={handleDeleteActivity}
                        />
                    ))}
                    </div>
                ))}
            </Box>
            <ToastContainer className="toast_container" />
        </div>
    )
}

export default ItineraryDetails;