import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Auth";
import Register from "../pages/Register";
import InfoMovie from "../pages/InfoMovie";
import Movies from "../pages/Movies";
import InfoTV from "../pages/InfoTV";
import Wishlist from "../pages/Wishlist";
import Auth from "../pages/Auth";
import ProtectedRoute from "../components/ProtectedRoute";
import WishlistDetails from "../pages/WishlistDetails";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/infomovie/:id" element={<InfoMovie />} />
      <Route path="/infotv/:id" element={<InfoTV />} />
      <Route path="/movies" element={<Movies />} />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route path="/auth" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/wishDetails/:wishTitle" element={<WishlistDetails/>}/>
    </Routes>
  );
};

export default MainRoutes;
