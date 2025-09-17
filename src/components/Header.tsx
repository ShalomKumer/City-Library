import { useNavigate } from "react-router-dom";
const Header = () => {
  const nav = useNavigate();

  return (
    <div>

      <div className="buttons">
        <button onClick={() => nav("/")}>Home</button>
        <button onClick={() => nav("/userlist")}>Users</button>
      </div>
    </div>
  );
};

export default Header;
