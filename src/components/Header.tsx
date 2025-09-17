import { useNavigate } from "react-router";
const Header = () => {
    const nav = useNavigate()
  return (
    <>
    <div>
        <button onClick={nav('/')}>Home</button>
        <button onClick={nav('/userlist')}>Users</button>
    </div>
    </>
  )
}

export default Header