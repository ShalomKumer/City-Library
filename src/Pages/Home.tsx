import { useContext } from "react";
import { myContext } from "../components/Context";
import Header from "../components/Header";
import BookList from "../components/BookList";
const Home = () => {
    const ctx = useContext(myContext)
    if(!ctx) return null;
    const {booksList} = ctx 
  return (
    <>
      <Header />
      <div className="text-intro">
        <h1>
          <strong>City Library Dashboard</strong>
        </h1>
        <h4>City Central Library</h4>
        <h4>Main St 123, Matropolis, 153287</h4>
      </div>
      <BookList />
    </>
  );
};

export default Home;




