import { useContext } from "react";
import { myContext } from "./Context";
import UserItem from "./UserItem";
import '../styles/UsersList.css'

const UserListA = () => {
  let ctx = useContext(myContext);
  if (!ctx) return;
  const { memberList } = ctx;
  return (
    <>
      <div className="allBookList">
        {memberList.map((u, idx) => (
          <UserItem key={u.id ?? idx} u={u} />
        ))}
      </div>
    </>
  );
};

export default UserListA;
