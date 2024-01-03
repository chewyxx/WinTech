import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from "../Components/Navbar";
import useFetch from '../Hooks/useFetch';
import '../Styles/CreateItinerary.css';
import { ToastContainer, toast } from "react-toastify";
import CountrySelect from "../Components/CountrySelect";
import MultipleSelectChip from "../Components/MultipleSelectChip";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CreateItinerary = () => {
    const fixedInterests = [
        "Shopping",
        "Eating",
        "Sightseeing",
        "Outdoor Activities",
        "Indoor Activities",
        "Museums",
        "Animals",
    ];

    const fixedDemographics = [
        "Family",
        "Friends",
        "Couples",
        "Solo",
        "Disabled",
        "Elderly",
    ];

    const [email, setEmail] = useState("");
    const [cookies, removeCookie] = useCookies([]);
    const [userId, setUserId] = useState("");

    const [title, setTitle] = useState('');
    const [country, setCountry] = useState('');
    const [cities, setCities] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [groupSize, setGroupSize] = useState(1);
    const [interests, setInterests] = useState([]);
    const [demographics, setDemographics] = useState([]);

    const navigate = useNavigate();
    const { data } = useFetch(`http://localhost:4000/api/users`);
    const [loading, setLoading] = useState(false);

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
            if (email !== "") {
                try {
                    if (data.data) {
                        setUserId(data.data.find(user => user.email === email)._id);
                    }
                } catch (error) {
                    console.error('getUser error:', error);
                }
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
            cities,
            startDate,
            endDate,
            groupSize,
            interests,
            demographics,
        };
        setLoading(true);

        try {
            if (title === "" || country === "" || startDate === "" || endDate === "") {
                setLoading(false);
                handleError('Please fill out all required fields (Title, Country, Start Date, End Date)');
                return;
            }

            if (groupSize < 1 || groupSize > 20) {
                setLoading(false);
                handleError('Group size must be between 1 and 20');
                return;
            }

            if (startDate > endDate) {
                setLoading(false);
                handleError('Start date cannot be after end date');
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
                            <CountrySelect onChange={(e) => setCountry(e.value)}/>
                        </div>

                        <div className="field_info_container">
                            <label htmlFor="cities">Cities</label>
                            <input type="text" placeholder={"Enter cities (Taipei, Tainan, Taidong)"} value={cities} onChange={(e) => setCities(e.target.value.split(',').map((city) => city.trim()))} />
                        </div>

                        <div className="field_info_container">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <label htmlFor="dates">Dates</label>

                                <DatePicker 
                                    label="Start Date"
                                    value={startDate} 
                                    onChange={(newDate) => setStartDate(newDate)}
                                    sx={{bgcolor: '#C9E0E7', borderRadius: '5px'}}
                                />

                                <DatePicker 
                                    label="End Date" 
                                    value={endDate} 
                                    onChange={(newDate) => setEndDate(newDate)} 
                                    sx={{bgcolor: '#C9E0E7', borderRadius: '5px'}}
                                />
                            </LocalizationProvider>
                        </div>

                        <div className="field_info_container">
                            <label htmlFor="groupSize">Group Size</label>
                            <input type="number" min={1} max={20} value={groupSize} onChange={(e) => setGroupSize(e.target.value)} />
                        </div>

                        <div className="field_info_container">
                            <label htmlFor="interests">Interests</label>
                            <MultipleSelectChip options={fixedInterests} label="Select interests" onChange={(newInterests) => setInterests(newInterests)}/>
                        </div>

                        <div className="field_info_container">
                            <label htmlFor="demographics">Demographics</label>
                            <MultipleSelectChip options={fixedDemographics} label="Select demographics" onChange={(newDemographics) => setDemographics(newDemographics)}/>
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