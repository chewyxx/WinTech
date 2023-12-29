import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from '../Components/Navbar';
import '../Styles/ChangePassword.css';
import useFetch from '../Hooks/useFetch';

const ChangePassword = () => {
    const navigate = useNavigate();

    const [cookies, removeCookie] = useCookies([]);
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [prevPassword, setPrevPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { data, loading, error } = useFetch(`http://localhost:4000/api/users`);

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
              navigate("/login");
              return;
            }
            
            try {
                const res = await axios.post("http://localhost:4000", {}, { withCredentials: true });

                setUsername(res.data.user);

                if (!res.data.status) {
                  removeCookie("token");
                  navigate("/login");
                }
            } catch (error) {
                console.error('verifyCookiy error:', error);
                navigate("/login");
            }
        };

        const getUser = () => {
            try {
                if (data.data) {
                    setId(data.data.find(user => user.username === username)._id);
                    setPrevPassword(data.data.find(user => user.username === username).password);
                }
                console.log("getUser is successful");
            } catch (error) {
                console.error('getUser error:', error);
            }
        }
          
        verifyCookie();
        getUser();
    }, [cookies, data]);

    const handleSave = async () => {
        try {
            console.log(`id:${id}`);

            if (newPassword === "" || confirmPassword == "") {
                alert("Please fill out all fields.");
                return;
            }

            if (confirmPassword !== newPassword) {
                alert("Passwords do not match.");
                return;
            }

            const authRes = await axios.get(`http://localhost:4000/password/${id}`);
            console.log(`authRes:${authRes}`);
            const auth = await authRes.success;
            if (!auth) {
                alert("New password cannot be the same as the old password.");
                return;
            }
            
            const res = await axios.put(`http://localhost:4000/password/${id}`, { 
                password: newPassword
            }, { withCredentials: true });
            console.log(`res:${res}`);

            if (res.success) {
                alert("Password successfully changed.");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleCancel = () => {
        navigate("/profile");
    }

    return (
        <>
            <div className="change_password_page">
                <NavBar/>

                <form onSubmit={handleSave} onReset={handleCancel}>
                    <div className="form_header">
                        <h1>Change Password</h1>
                        <h2>Manage and protect your account</h2>
                    </div>

                    <div className="form_body">
                        <div className="field_info_container">
                            <label htmlFor="username">New Password</label>
                            <input type="text" placeholder={"Enter new password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>

                        <div className="field_info_container">
                            <label htmlFor="email">Confirm New Password</label>
                            <input type="text" placeholder={"Enter new password for confirmation"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className="form_buttons">
                        <button type="submit" className="form_save_button">Save Changes</button>
                        <button type="reset" className="form_cancel_button">Cancel Changes</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangePassword