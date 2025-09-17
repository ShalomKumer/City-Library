import { createContext, useState, useMemo, useContext, ReactNode } from "react";
import type { Review, Book, Member } from "./types";

type ContextType = {
  book: Book | undefined;
  setBook: React.Dispatch<React.SetStateAction<Book | undefined>>;
  member: Member | undefined;
  setMember: React.Dispatch<React.SetStateAction<Member | undefined>>;
  review: Review | undefined;
  setReview: React.Dispatch<React.SetStateAction<Review | undefined>>;
  booksList: Book[];
  setBookList: React.Dispatch<React.SetStateAction<Book[]>>;
  memberList: Member[];
  setMemberList: React.Dispatch<React.SetStateAction<Member[]>>;
  reviewList: Review[];
  setReviewList: React.Dispatch<React.SetStateAction<Review[]>>;
};

type ProviderProps = { children: ReactNode };

export const myContext = createContext<ContextType | undefined>(undefined);

export const useLibraryContext = (): ContextType => {
  const ctx = useContext(myContext);
  if (!ctx)
    throw new Error("useLibraryContext must be used within <Context> provider");
  return ctx;
};

const Context: React.FC<ProviderProps> = ({ children }) => {
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [member, setMember] = useState<Member | undefined>(undefined);
  const [review, setReview] = useState<Review | undefined>(undefined);

  const [booksList, setBookList] = useState<Book[]>([]);
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [reviewList, setReviewList] = useState<Review[]>([]);

  const value = useMemo(
    () => ({
      book,
      setBook,
      member,
      setMember,
      review,
      setReview,
      booksList,
      setBookList,
      memberList,
      setMemberList,
      reviewList,
      setReviewList,
    }),
    [book, member, review, booksList, memberList, reviewList]
  );

  return <myContext.Provider value={value}>{children}</myContext.Provider>;
};

export default Context;
