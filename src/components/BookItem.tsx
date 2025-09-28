import { useNavigate } from "react-router-dom";
import type { Book } from "./types";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import "../styles/BookItem.css";
type BookProp = {
  b: Book;
};
const BookItem: React.FC<BookProp> = ({ b }) => {
  const nav = useNavigate();
  // let rate = Math.round(b.rateing.average);
  return (
    <>
      <div className="card">
        <button onClick={() => nav(`/book/${b.id}`)}>
          <div className="top">
            <img src={b.img} alt={b.alt} />
          </div>
          <div className="Taria">
            <h2>
              <strong>{b.bookName}</strong>
            </h2>
            <h3>{b.author.join(", ")}</h3>
          </div>
          <div className="bottom">
            <div className="year">
              <p>{b.year}</p>
            </div>
            <div className="read">{b.read ? "Read" : "Not Read"}</div>
            <div className="score">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  name="book-rating"
                  value={Number(b.rateing.average.toFixed(2))}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <h4 style={{ margin: 0 }}>
                  <strong>{b.rateing.average.toFixed(2)}</strong>
                </h4>
              </Box>
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

export default BookItem;
