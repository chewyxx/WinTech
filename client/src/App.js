import { Route, Routes } from "react-router-dom";
import { Login, Signup, Home } from "./Pages";
import Profile from "./Pages/Profile";
import ChangePassword from "./Pages/ChangePassword";
import PopularDestinations from "./Pages/PopularDestinations";
import Landing from "./Pages/Landing";
import { CreateItinerary, MyTrips } from "./Pages";
import EditItinerary from "./Pages/EditItinerary";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/itineraries/create" element={<CreateItinerary />} />
        <Route path="/itineraries/edit/:itineraryId" element={<EditItinerary />} />
        <Route path="/itineraries" element={<MyTrips />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/popular-destinations" element={<PopularDestinations />} />
      </Routes>
    </div>
  );
}

export default App;