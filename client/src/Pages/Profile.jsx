import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from '../Components/Navbar';
import '../Styles/Profile.css';

const Profile = () => {
    const navigate = useNavigate();

    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const verifyCookie = async () => {
            const { data } = await axios.post(
                "http://localhost:4000",
                {},
                { withCredentials: true }
            );
            const { status, user } = data;

            setUsername(user);

            return status
                ? console.log(`Hello ${user}`)
                : (removeCookie("token"), navigate("/login"));
        };

        const getUser = async () => {
            
        }

        verifyCookie();
        getUser();
    }, [username, email, password]);

    return (
        <>
            <div className="profile_page">
                <NavBar/>
                <h2 style={{color: '#fff'}}>Profile</h2>

            </div>
        </>
    )
}

export default Profile