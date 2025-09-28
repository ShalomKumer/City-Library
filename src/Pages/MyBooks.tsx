import { useContext } from "react";
import { useNavigate } from "react-router";
import { myContext } from "../components/Context";
import BookItem from "../components/BookItem";
import { toast } from "react-toastify";
import Header from "../components/Header";

import '../styles/myBooks.css'

const MyBooks = () => {
  const nav = useNavigate();
  let ctx = useContext(myContext);
  if (!ctx) return;
  let { myBooks } = ctx;

  if (myBooks.length === 0) {
    return (
      <>
        <Header />
        <h1>My Books! </h1>
        <h2><strong>no books in the list yet...</strong></h2>
        <button onClick={() => nav("/")}>Back Home</button>
      </>
    );
  }
  return (
<>
  <Header />
  <div className="mybooks-container">
    <h1 className="mybooks-title">My Books!</h1>
    {myBooks.length === 0 ? (
      <div className="mybooks-empty">
        <h2><strong>no books in the list yet...</strong></h2>
        <button onClick={() => nav("/")}>Back Home</button>
      </div>
    ) : (
      <>
        <div className="allBookList">
          {myBooks.map((b, idx) => (
            <BookItem key={b.id ?? idx} b={b} />
          ))}
        </div>
        <button className="back-home-btn" onClick={() => nav("/")}>
          Back Home
        </button>
      </>
    )}
  </div>
</>

  );
};

export default MyBooks;
