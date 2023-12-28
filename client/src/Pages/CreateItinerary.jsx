import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from "../Components/Navbar";

const CreateItinerary = () => {
    const [username, setUsername] = useState("");
    const [cookies, removeCookie] = useCookies([]);

    const [title, setTitle] = useState('');
    const [country, setCountry] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSaveItinerary = () => {
        const data = {
            title,
            country,
            startDate,
            endDate,
        };
        setLoading(true);
        axios.post('http://localhost:4000/itineraries', data)
            .then(() => {
                setLoading(false);
                navigate('/itineraries');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred. Please check console');
                console.log(error);
            })
    };

    const Logout = () => {
        removeCookie("token");
        navigate("/login");
      };

    return (
        <div className="home_page">
            <NavBar user={username} logout={Logout}/>
            <h1 className="text-3xl f-4">Create Itinerary</h1>
            { loading ? <p>loading...</p> : ''}

            <div className="flex flex-cool border-2">
                <div className="my-4">
                    <label className="text-xl mr-4">Title</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-2 px-4"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4">Country</label>
                    <input 
                        type="text" 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="border-2 px-4"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4">Start date</label>
                    <input 
                        type="text" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border-2 px-4"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4">End date</label>
                    <input 
                        type="text" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border-2 px-4"
                    />
                </div>

                <button onClick={handleSaveItinerary}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default CreateItinerary;