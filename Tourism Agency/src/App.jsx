import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Hotel from "./Pages/Hotel/Hotel";
import Room from "./Pages/Room/Room";
import Reservation from "./Pages/Reservation/Reservation";
import Gallery from "./Pages/Gallery/Gallery";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/room" element={<Room />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:selectMenu" element={<Gallery />} />
      </Routes>
    </>
  );
}

export default App;
