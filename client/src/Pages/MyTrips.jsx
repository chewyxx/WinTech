import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from "../Components/Navbar";
import useFetch from '../Hooks/useFetch';
import ItineraryCard from "../Components/ItineraryCard";
import { Box, IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "../Styles/MyTrips.css";

const MyTrips = () => {
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");

    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { data } = useFetch(`http://localhost:4000/api/users`);

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
          
        verifyCookie();
        getUser();

    }, [navigate, cookies, removeCookie, email, data, loading, userId]);

    /*const handleItinerarys = async () => {
        if (loading && userId !== "") {
            await axios.get(`http://localhost:4000/itineraries/${userId}`, { withCredentials: true })
                .then((response) => {
                    setItineraries(response.data.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(true);
                    console.log("error");
                });
        }
    }*/
    useEffect(() => {
        if (loading && userId !== "") {
            axios.get(`http://localhost:4000/itineraries/${userId}`, { withCredentials: true })
                .then((response) => {
                    setItineraries(response.data.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(true);
                    console.log("error");
                });
        }
    }, [userId, navigate, itineraries, loading]);

    return (
        <div className="home_page">
            <div>
                <NavBar/>
            </div>
            <div className="mytrips">
                <h3>My Trips</h3>
                    <IconButton>
                        <Link to='/itineraries/create'> 
                            <AddCircleIcon fontSize="large" sx={{color:"#008000"}}/>
                        </Link>
                    </IconButton>
            </div>
            
            { loading ? (
                <h1>loading...</h1>
                ) : (
                    <Box className="mytrips" sx={{m: 2, mr: '40rem'}}>
                        {itineraries.map((itinerary, index) => (
                            <ItineraryCard 
                            key={itinerary._id}
                            itinerary={itinerary}
                            username={username}
                            />
                        ))}
                    </Box>
                )
            }
        </div>
    )
}

export default MyTrips;