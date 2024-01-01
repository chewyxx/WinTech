import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from '../Components/Navbar';
import '../Styles/ChangePassword.css';
import useFetch from '../Hooks/useFetch';
import { ToastContainer, toast } from "react-toastify";

const ChangePassword = () => {
    const navigate = useNavigate();

    const [cookies, removeCookie] = useCookies([]);
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { data } = useFetch(`http://localhost:4000/api/users`);

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
                console.error('verifyCookie error:', error);
                navigate("/login");
            }
        };

        const getUser = () => {
            if (username !== "") {
                try {
                    if (data.data) {
                        setId(data.data.find(user => user.username === username)._id);
                    }
                } catch (error) {
                    console.error('getUser error:', error);
                }
            }
        }
          
        verifyCookie();
        getUser();
    }, [navigate, cookies, removeCookie, username, data]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {

            if (newPassword === "" || confirmPassword === "") {
                handleError("Please fill out all fields");
                return;
            }

            if (confirmPassword !== newPassword) {
                handleError("Passwords do not match");
                return;
            }

            const authRes = await axios.get(`http://localhost:4000/password/${id}`, { params: {password: newPassword}}, {withCredentials: true});
            console.log(`authRes:${authRes.data}`);
            const auth = authRes.data;
            if (!auth.success) {
                handleError("New password cannot be the same as the old password");
                setNewPassword("");
                setConfirmPassword("");
                return;
            }
            
            const res = await axios.put(`http://localhost:4000/password/${id}`, { 
                password: newPassword
            }, { withCredentials: true });
            console.log(`res:${res}`);

            if (res.data.success) {
                handleSuccess("Password successfully changed");
                setNewPassword("");
                setConfirmPassword("");
                return;
            }
        } catch (error) {
            console.error('Error:', error);
        }

        e.target.reset();
    }

    const handleCancel = () => {
        navigate("/profile");
    }

    const handleError = (err) => {
        toast.error(err, {
            position: "bottom-left",
        });
    }

    const handleSuccess = (msg) => {
        toast.success(msg, {
            position: "bottom-left",
            autoClose: 5000
        });
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

            <ToastContainer className="toast_container"/>
        </>
    )
}

export default ChangePassword