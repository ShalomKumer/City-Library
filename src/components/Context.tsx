import { createContext, useState, useEffect, useMemo } from "react";

export const myContext = createContext(null);

import type { Review, Book, Member } from "./types";
const Context = () => {
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [membe, setMember] = useState<Member | undefined>(undefined);
  const [revie, setReview] = useState<Review | undefined>(undefined);

  const [booksList, setBookList] = useState<Book[]>([]);
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [reviewList, setReviewList] = useState<Review[]>([]);

  const value = useMemo(
    () => ({
      book,
      setBook,
      membe,
      setMember,
      revie,
      setReview,
      booksList,
      setBookList,
      memberList,
      setMemberList,
      reviewList,
      setReviewList,
    }),
    []
  );

  return (
  <>
  <myContext.Provider value={value}>{}</myContext.Provider>
  </>
  )
};

export default Context;
