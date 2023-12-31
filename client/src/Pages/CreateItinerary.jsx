import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from "../Components/Navbar";
import useFetch from '../Hooks/useFetch';

const CreateItinerary = () => {
    const [email, setEmail] = useState("");
    const [cookies, removeCookie] = useCookies([]);
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");

    const [title, setTitle] = useState('');
    const [country, setCountry] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);

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
    }, [navigate, cookies, removeCookie, email, data]);

    const handleSaveItinerary = () => {
        const data = {
            title,
            country,
            startDate,
            endDate,
        };
        setLoading(true);

        if (startDate > endDate) {
            alert('Start date cannot be after end date');
            setLoading(false);
            return;
        }

        axios.post(`http://localhost:4000/itineraries/${userId}`, data)
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