import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from "../Components/Navbar";
import useFetch from '../Hooks/useFetch';

const MyTrips = () => {
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [cookies, removeCookie] = useCookies([]);

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
            <div className="p-4">
                <h3>My Trips</h3>
                <Link to='/itineraries/create'>
                    + Add trip
                </Link>
            </div>
            
            { loading ? (
                <h1>loading...</h1>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Title</th>
                                <th>Country</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itineraries.map((itinerary, index) => (
                                <tr key={itinerary._id}>
                                    <td>{index + 1}</td>
                                    <td>{itinerary.title}</td>
                                    <td>{itinerary.country}</td>
                                    <td>{itinerary.startDate}</td>
                                    <td>{itinerary.endDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}

export default MyTrips;