// my trips

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from "../Components/Navbar";
import useFetch from '../Hooks/useFetch';

const MyTrips = () => {
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
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

        const getUser = () => {
            try {
                if (data.data) {
                    setUserId(data.data.find(user => user.email === email)._id);
                }
            } catch (error) {
                console.error('getUser error:', error);
            }
        }
          
        verifyCookie();
        getUser();
            
        if (loading) {
            axios.get(`http://localhost:4000/itineraries/${userId}`)
                .then((response) => {
                    setItineraries(response.data.data);
                    setLoading(false);
                    console.log("works");
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(true);
                });
        }

    }, [navigate, cookies, removeCookie, email, data]);

    /*useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:4000/itineraries/${userId}`)
            .then((response) => {
                setItineraries(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    */

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
                                <tr key={itinerary.id}>
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