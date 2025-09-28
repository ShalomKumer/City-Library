import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { myContext } from "../components/Context";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import { toast } from "react-toastify";

import "../styles/BookDit.css";

const BookDit: React.FC = () => {
  const { id: bookID } = useParams<{ id: string }>();
  const ctx = useContext(myContext);
  if (!ctx) return null;

  const { booksList, setMyBooks, myBooks } = ctx;

  if (!booksList || booksList.length === 0) {
    return (
      <>
        <Header />
        <div className="container">
          <p className="loading">Loading book…</p>
        </div>
      </>
    );
  }
  const oneBook = booksList.find((b) => String(b.id) === String(bookID));

  useEffect(() => {
    if (bookID && !oneBook) {
      toast.error("Book Not Found :(");
    }
  }, [bookID, oneBook]);

  if (!oneBook) {
    return (
      <>
        <Header />
        <div className="container">
          <p className="error">Book Not Found...</p>
        </div>
      </>
    );
  }
  function updateMyBooks(id: string) {
    const newBook = booksList.find((b) => String(b.id) === String(id));
    if (!newBook) {
      toast.error("Book not Found!");
      return;
    }
    setMyBooks((prev) =>[...prev, newBook])
    newBook.read = true
    console.log(myBooks)
  }
  const title = oneBook.bookName || "Untitled";
  const description = oneBook.description || "No description available.";
  const authors = Array.isArray(oneBook.author) ? oneBook.author.join(", ") : "Unknown author";
  const year = oneBook.year || "Unknown year";
  const avg =
    typeof oneBook.rateing?.average === "number" ? oneBook.rateing.average : 0;

  const fallbackImg =
    oneBook.img && oneBook.img.length > 0
      ? oneBook.img
      : "https://via.placeholder.com/300x400?text=No+Image";

  return (
    <>
      <Header />
      <div className="container">
        <div className="details">
          <div className="img">
            <img src={fallbackImg} alt={oneBook.alt || title} />
          </div>

          <div className="long-text">
            <h2 id="bookName">
              <strong>{title}</strong>
            </h2>
            <p id="description">{description}</p>
          </div>

          <div className="other-details">
            <h4 id="author">{authors}</h4>
            <h4 id="year">{year}</h4>

            <div className="read">
              <button
                onClick={()=>updateMyBooks(oneBook.id)}
                className={`read-btn ${oneBook.read ? "read-yes" : "read-no"}`}
                disabled={oneBook.read}
              >
                {oneBook.read ? "READ" : "NOT READ"}
              </button>
            </div>

            <div className="score">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  name="book-rating"
                  value={avg}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <h4 style={{ margin: 0 }}>
                  <strong>{avg.toFixed(2)}</strong>
                </h4>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDit;
