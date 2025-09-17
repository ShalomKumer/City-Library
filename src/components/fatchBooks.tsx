import { useContext } from "react";
import { myContext } from "./Context";
import { Book } from "./types";

const fatchBooks = () => {
  const ctx = useContext(myContext);
  if (!ctx) return;
  const { book, setBook, booksList, setBookList } = ctx;

  return 
  (
  <>
  <h2>hello </h2>
  </>
  )
};

export default fatchBooks;
// https://www.googleapis.com/books/v1/volumes?q=a&maxResults=40&startIndex=0
// https://www.googleapis.com/books/v1/volumes?q=a&maxResults=40&startIndex=40
// https://www.googleapis.com/books/v1/volumes?q=a&maxResults=20&startIndex=80
