import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from "../Components/Navbar";
import useFetch from '../Hooks/useFetch';
import '../Styles/CreateItinerary.css';
import { ToastContainer, toast } from "react-toastify";

const CreateItinerary = () => {
    const [email, setEmail] = useState("");
    const [cookies, removeCookie] = useCookies([]);
    const [userId, setUserId] = useState("");

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

    const handleError = (err) => {
        toast.error(err, {
            position: "bottom-left",
        });
    }

    const handleSuccess = (msg) => {
        toast.success(msg, {
            position: "bottom-left",
            autoClose: 3000,
        });
    }

    const handleSave = async () => {
        const data = {
            title,
            country,
            startDate,
            endDate,
        };
        setLoading(true);

        try {
            if (title === "" || country === "" || startDate === "" || endDate === "") {
                handleError('Please fill out all required fields (Title, Country, Start Date, End Date)');
                setLoading(false);
                return;
            }

            if (startDate > endDate) {
                handleError('Start date cannot be after end date');
                setLoading(false);
                return;
            }

            const res = await axios.post(`http://localhost:4000/itineraries/${userId}`, data, { withCredentials: true });

            if (res.data.success) {
                setLoading(false);
                handleSuccess('Itinerary created successfully');
                setTimeout(() => {
                    navigate('/itineraries');
                }, 3000);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
        }
    };

    const handleCancel = () => {
        setLoading(false);
        navigate('/itineraries');
    };

    return (
        <>
            <div className="create_itinerary_page">
                <NavBar/>

                <div className="create_itinerary_header">
                    <h1>Create your itinerary</h1>
                    <h2>Plan your upcoming trip!</h2>
                </div>


                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="create_itinerary_form">
                        <div className="field_info_container">
                            <label htmlFor="title">Title</label>
                            <input type="text" placeholder={"Enter title"} value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="field_info_container">
                            <label htmlFor="country">Country</label>
                            <input type="text" placeholder={"Enter country"} value={country} onChange={(e) => setCountry(e.target.value)} />
                        </div>

                        <div className="field_info_container">
                            <label htmlFor="startDate">Start Date</label>
                            <input type="text" placeholder={"Enter start date (YYYY-MM-DD)"} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>

                        <div className="field_info_container">
                            <label htmlFor="endDate">End Date</label>
                            <input type="text" placeholder={"Enter end date (YYYY-MM-DD)"} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>

                        <div className="create_itinerary_buttons">
                            <button onClick={handleSave} className="save_button">Save</button>
                            <button onClick={handleCancel} className="cancel_button">Cancel</button>
                        </div>
                    </div>
                )}

                <ToastContainer className="toast_container"/>
            </div>
        </>
    )
}

export default CreateItinerary;