// my trips

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from "../Components/Navbar";

const MyTrips = () => {
    const [username, setUsername] = useState("");
    const [cookies, removeCookie] = useCookies([]);

    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:4000/itineraries')
            .then((response) => {
                setItineraries(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const navigate = useNavigate();

    const Logout = () => {
        removeCookie("token");
        navigate("/login");
      };

    return (
        <div className="home_page">
            <div>
        <NavBar user={username} logout={Logout}/>
            </div>
            <div className="p-4">
                <h3>My Trips</h3>
                <Link to='/itineraries/create'>
                    + Add trip
                </Link>
            </div>
            
            { loading ? (
                <p>loading...</p>
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
                                <tr key={(itinerary._id)}>
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