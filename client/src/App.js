//To add and render all the children components in the parent component for display


import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

//import all the components and pages we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Footer from "./components/footer";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";

import { useAuthContext } from "./hooks/useAuthContext";


const App = () => {
  //gets the user token to protect route (i.e client or react route) from unauthenticated user
  const { user } = useAuthContext()

  return (
   <div className="text-sm md:text-base min-h-[100vh] flex flex-col bg-gradient-to-r from-orange-300 via-blue-200 to-gray-300 background-animate">
    <Navbar />
    <div className="flex-1">
      <Routes>
        <Route exact path='/' element={user ? <RecordList /> : <Navigate to='/login' />} /> 

        <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path="/u/:id" element={user ? <Profile /> : <Navigate to='/login' />} />
      </Routes>
    </div>
    <Footer />
   </div>
  );
};

export default App;





