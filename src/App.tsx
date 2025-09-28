import Home from "./Pages/Home";
import UsersList from "./Pages/UsersList";
import UserProfile from "./Pages/UserProfile";
import BookDit from "./Pages/BookDit";
import Context from "./components/Context";
import { ToastContainer } from "react-toastify";
// import { useState, useContext } from "react";
import { Routes, Route } from "react-router";

import "./App.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Context>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userlist" element={<UsersList />} />
          <Route path="/userprofile/:id" element={<UserProfile />} />
          <Route path="/book/:id" element={<BookDit />} />
        </Routes>
      </Context>
    </>
  );
}

export default App;
