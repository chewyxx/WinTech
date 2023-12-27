import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./Pages";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import PopularDestinations from "./Pages/PopularDestinations";
import MyTrips from "./Pages/MyTrips";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/popular-destinations" element={<PopularDestinations />} />
        <Route path="/my-trips" element={<MyTrips />} />
      </Routes>
    </div>
  );
}

export default App;