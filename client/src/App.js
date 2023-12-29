import { Route, Routes } from "react-router-dom";
import { Login, Signup, Home } from "./Pages";
import Profile from "./Pages/Profile";
import ChangePassword from "./Pages/ChangePassword";
import PopularDestinations from "./Pages/PopularDestinations";
import MyTrips from "./Pages/MyTrips";
import Landing from "./Pages/Landing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/popular-destinations" element={<PopularDestinations />} />
        <Route path="/my-trips" element={<MyTrips />} />
      </Routes>
    </div>
  );
}

export default App;