import { Route, Routes } from "react-router-dom";
import { Login, Signup, Home } from "./Pages";
import Profile from "./Pages/Profile";
import ChangePassword from "./Pages/ChangePassword";
import PopularDestinations from "./Pages/PopularDestinations";
import Landing from "./Pages/Landing";
import { CreateItinerary, MyTrips } from "./Pages";
import ItineraryDetails from "./Pages/ItineraryDetails";
import CreateActivity from "./Pages/CreateActivity";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/itineraries/create" element={<CreateItinerary />} />
        <Route path="/itineraries" element={<MyTrips />} />
        <Route path="/itineraries/:id" element={<ItineraryDetails />} />
        <Route path="/itineraries/:id/add-activity" element={<CreateActivity />} />        
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/popular-destinations" element={<PopularDestinations />} />
      </Routes>
    </div>
  );
}

export default App;