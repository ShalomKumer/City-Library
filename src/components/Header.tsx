import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const nav = useNavigate();

  return (
    <div className="header">
      <div className="buttons">
        <button onClick={() => nav("/")}>Home</button>
        <button onClick={() => nav("/userlist")}>Users</button>
        <button onClick={() => nav("/mybooks")}>My Books</button>
      </div>
    </div>
  );
};

export default Header;
