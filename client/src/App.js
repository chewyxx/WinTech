import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./Pages";
import Home from "./Pages/Home";
import { CreateItinerary, ItinerariesPage } from "./Pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/itineraries/create" element={<CreateItinerary />} />
        <Route path="/itineraries" element={<ItinerariesPage />} />
      </Routes>
    </div>
  );
}

export default App;