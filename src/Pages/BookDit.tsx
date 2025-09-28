import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { myContext } from "../components/Context";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import { toast } from "react-toastify";

import '../styles/BookDit.css'


const BookDit: React.FC = () => {
  const { id: bookID } = useParams<{ id: string }>();
  const ctx = useContext(myContext);
  if (!ctx) return null;
  const { booksList } = ctx;

  const oneBook = booksList.find((b) => b.id === bookID);
  if (!oneBook) {
    useEffect(() => {
      toast.error("Book Not Found :(");
    }, []);
    return <p className="error">Book Not Found : </p>;
  }

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
            <img src={fallbackImg} alt={oneBook.alt || oneBook.bookName} />
          </div>

          <div className="long-text">
            <h2 id="bookName">
              <strong>{oneBook.bookName}</strong>
            </h2>
            <p id="description">{oneBook.description}</p>
          </div>

          <div className="other-details">
            <h4 id="author">{oneBook.author.join(", ")}</h4>
            <h4 id="year">{oneBook.year}</h4>

            <div className="read">
              <h4 id="read">{oneBook.read ? "Read" : "Not Read"}</h4>
            </div>

            <div className="score">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  name="book-rating"
                  value={oneBook.rateing.average}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <h4 style={{ margin: 0 }}>
                  <strong>{oneBook.rateing.average.toFixed(2)}</strong>
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
