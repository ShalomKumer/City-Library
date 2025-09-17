import { useNavigate } from "react-router-dom";
import type { Book } from "./types";
import '../styles/BookItem.css'
type BookProp = {
  b: Book;
};
const BookItem: React.FC<BookProp> = ({ b }) => {
    const nav = useNavigate();
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
            <h3>{b.author.join(', ')}</h3>
          </div>
          <div className="bottom">
            <div className="year"><p>{b.year}</p></div>
            <div className="read">{b.read ? "Read" : "Not Read"}</div>
            <div className="score"><h4><strong>{b.rateing.average.toFixed(2)}</strong></h4></div>
          </div>
        </button>
      </div>
    </>
  );
};

export default BookItem;
