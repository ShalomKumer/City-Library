import { useContext } from "react";
import { myContext } from "../components/Context";
import BookItem from "./BookItem";
import FetchBooks from "./FetchBooks"
import '../styles/BookList.css'

const BookList = () => {
  const ctx = useContext(myContext);
  if (!ctx) return null;
  const { booksList } = ctx;

  return (
    <>
      <FetchBooks />

      <div className="allBookList">
        {booksList.map((b, idx) => (
          <BookItem key={b.id ?? idx} b={b} />
        ))}
      </div>
    </>
  );
};

export default BookList;
