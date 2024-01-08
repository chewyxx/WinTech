import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from "../Components/Navbar";
import useFetch from '../Hooks/useFetch';
import '../Styles/CreateItinerary.css';
import { ToastContainer, toast } from "react-toastify";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CreateActivity = () => {

    const [email, setEmail] = useState("");
    const [cookies, removeCookie] = useCookies([]);
    const [userId, setUserId] = useState("");
    const [itineraryId, setItineraryId] = useState("");
    
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [address, setAddress] = useState('');
    const [openingHours, setOpeningHours] = useState('');
    const [remark, setRemark] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();
    const { data } = useFetch(`http://localhost:4000/api/users`);
    const { id } = useParams();
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

        const getItinerary = async () => {
            if (userId !== "") {
                try {
                    const res = await axios.get(`http://localhost:4000/itineraries/${userId}`, { withCredentials: true });
                    const selectedItinerary = res.data.data.find(itinerary => itinerary._id === id);
                    console.log(selectedItinerary);
                    if (selectedItinerary) {
                        setItineraryId(selectedItinerary._id);
                        console.log(itineraryId);
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
    }, [navigate, cookies, removeCookie, email, data, id, userId]);

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
            link,
            address,
            openingHours,
            remark,
            date
        };
        setLoading(true);

        try {
            if (title === "") {
                setLoading(false);
                handleError('Please fill out all fields');
                return;
            }

            const res = await axios.post(`http://localhost:4000/activities/${itineraryId}`, data, { withCredentials: true });

            if (res.data.success) {
                setLoading(false);
                handleSuccess('Activity created successfully');
                setTimeout(() => {
                    navigate('/itineraries/' + itineraryId);
                }, 3000);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
        }
    };

    const handleCancel = () => {
        setLoading(false);
        navigate('/itineraries/' + itineraryId);
    };

    return (
        <>
            <div className="create_itinerary_page">
                <NavBar/>

                <div className="create_itinerary_header">
                    <h1>Add an activity to your itinerary</h1>
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
                            <label htmlFor="link">Link</label>
                            <input type="text" placeholder={"Enter link"} value={link} onChange={(e) => setLink(e.target.value)} />
                        </div>
                        
                        <div className="field_info_container">
                            <label htmlFor="address">Address</label>
                            <input type="text" placeholder={"Enter address"} value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        
                        <div className="field_info_container">
                            <label htmlFor="openingHours">Opening Hours</label>
                            <input type="text" placeholder={"Enter opening hours"} value={openingHours} onChange={(e) => setOpeningHours(e.target.value)} />
                        </div>
                        
                        <div className="field_info_container">
                            <label htmlFor="remark">Remark</label>
                            <input type="text" placeholder={"Enter remark"} value={remark} onChange={(e) => setRemark(e.target.value)} />
                        </div>

                        <div className="field_info_container">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <label htmlFor="dates">Date</label>

                                <DatePicker 
                                    label="Date" 
                                    value={date} 
                                    onChange={(date) => setDate(date)} 
                                    sx={{bgcolor: '#C9E0E7', borderRadius: '5px'}}
                                />
                            </LocalizationProvider>
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

export default CreateActivity;