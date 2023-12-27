import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from '../Components/Navbar';
import '../Styles/Profile.css';

const Profile = () => {
    const navigate = useNavigate();

    const [cookies, removeCookie] = useCookies([]);
    const [prevName, setPrevName] = useState("");
    const [name, setName] = useState("");
    const [prevUsername, setPrevUsername] = useState("");
    const [username, setUsername] = useState("");
    const [prevEmail, setPrevEmail] = useState("");
    const [email, setEmail] = useState("");
    const [prevPassword, setPrevPassword] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const verifyCookie = async () => {
            const { data } = await axios.post(
                "http://localhost:4000",
                {},
                { withCredentials: true }
            );
            const { status, user } = data;

            setPrevUsername(user);

            return status
                ? console.log(`Hello ${user}`)
                : (removeCookie("token"), navigate("/login"));
        };

        const getUser = async () => {
            axios.get('http://localhost:4000/user/', { withCredentials: true }) // idk why i cant connect to the backend
                .then((res) => {
                    console.log(res.data);

                    setPrevName(res.data.name);
                    setName(res.data.name);

                    setPrevUsername(res.data.username);
                    setUsername(res.data.username);

                    setPrevEmail(res.data.email);
                    setEmail(res.data.email);

                    setPrevPassword(res.data.password);
                    setPassword(res.data.password);
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        verifyCookie();
        // getUser();
    }, [username, email, password]);

    const handleSave = () => {
        // save changes to database and ui

        // axios.put('http://localhost:4000/user/', { username, email, password }, { withCredentials: true })
        //     .then((res) => {
        //         console.log(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })

        // doesnt work???
        setPrevName(name);
        setPrevUsername(username);
        setPrevEmail(email);
        setPrevPassword(password);
    }

    const handleCancel = () => {
        // reset changes in ui
        setName(prevName);
        setUsername(prevUsername);
        setEmail(prevEmail);
        setPassword(prevPassword);
    }

    const handleChangePassword = () => {
        // navigate to change password page?
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
                                <label>Name</label>
                                <input type="text" placeholder={prevName} value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="profile_info_container">
                                <label htmlFor="username">Username</label>
                                <input type="text" placeholder={prevUsername} value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>

                            <div className="profile_info_container">
                                <label htmlFor="email">Email</label>
                                <input type="text" placeholder={prevEmail} value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>

                        <div className="profile_buttons">
                            <button type="button" className='profile_password_button'>Change password?</button>
                            <button type="submit" className="profile_save_button">Save Changes</button>
                            <button type="reset" className="profile_cancel_button">Cancel Changes</button>
                        </div>
                    </div>

                    <div className="profile_pic_container">
                        <p>Profile Picture</p>
                        <p>Edit button</p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Profile