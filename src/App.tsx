import Home from "./Pages/Home";
import UsersList from "./Pages/UsersList";
import UserProfile from "./Pages/UserProfile";
import BookDit from "./Pages/BookDit";
import MyBooks from "./Pages/MyBooks";
import Context from "./components/Context";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router";

import "./App.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Context>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userlist" element={<UsersList />} />
          <Route path="/userprofile/:id" element={<UserProfile />} />
          <Route path="/book/:id" element={<BookDit />} />
          <Route path="mybooks" element={<MyBooks />} />
        </Routes>
      </Context>
    </>
  );
}

export default App;
