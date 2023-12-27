import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateItinerary = () => {

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
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred. Please check console');
                console.log(error);
            })
    };


    return (
        <div className="p-4">
            <h1 className="text-3xl my-4">Create Itinerary</h1>
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