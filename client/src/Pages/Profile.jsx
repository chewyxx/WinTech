import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from '../Components/Navbar';
import '../Styles/Profile.css';
import useFetch from '../Hooks/useFetch';

const Profile = () => {
    const navigate = useNavigate();

    const [cookies, removeCookie] = useCookies([]);
    const [id, setId] = useState("");
    const [prevUsername, setPrevUsername] = useState("");
    const [username, setUsername] = useState("");
    const [prevEmail, setPrevEmail] = useState("");
    const [email, setEmail] = useState("");

    const { data, loading, error } = useFetch(`http://localhost:4000/api/users`);

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
              navigate("/login");
              return;
            }
            
            try {
                const res = await axios.post("http://localhost:4000", {}, { withCredentials: true });

                setPrevUsername(res.data.user);
                setUsername(res.data.user);

                if (!res.data.status) {
                  removeCookie("token");
                  navigate("/login");
                }
            } catch (error) {
                console.error('Error:', error);
                navigate("/login");
            }
        };

        const getUser = () => {
            if (data.data) {
                setId(data.data.find(user => user.username === prevUsername)._id);
                setPrevEmail(data.data.find(user => user.username === prevUsername).email);
                setEmail(data.data.find(user => user.username === prevUsername).email);
            }
        }
          
        verifyCookie();
        getUser();
    }, [cookies, data]);

    const handleSave = async () => {
        try {
            if (username === "" || email === "") {
                alert("Please fill out all fields.");
                return;
            } else if (username === prevUsername && email === prevEmail) {
                alert("No changes were made.");
                return;
            }

            const res = await axios.put(`http://localhost:4000/api/users/${id}`, { username, email }, { withCredentials: true });

            if (res.data.status) {
                setPrevUsername(username);
                setPrevEmail(email);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleCancel = () => {
        setUsername(prevUsername);
        setEmail(prevEmail);
    }

    const handleChangePassword = () => {
        navigate("/change-password");
    }

    return (
        <>
            <div className="profile_page">
                <NavBar/>

                <form className="profile" onSubmit={handleSave} onReset={handleCancel}>
                    
                    <div className="profile_content_container">
                        <div className="profile_header">
                            <h1>My Profile</h1>
                            <h2>Manage and protect your account</h2>
                        </div>

                        <div className="profile_body">
                            <div className="profile_info_container">
                                <label htmlFor="username">Username</label>
                                <input type="text" placeholder={username} value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>

                            <div className="profile_info_container">
                                <label htmlFor="email">Email</label>
                                <input type="text" placeholder={email} value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>

                        <div className="profile_buttons">
                            <button type="button" className='profile_password_button' onClick={handleChangePassword}>Change password?</button>
                            <button type="submit" className="profile_save_button">Save Changes</button>
                            <button type="reset" className="profile_cancel_button">Cancel Changes</button>
                        </div>
                    </div>

                    <div className="profile_pic_container">
                        <p>Coming soon: Profile Picture</p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Profile