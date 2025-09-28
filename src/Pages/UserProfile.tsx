import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { myContext } from "../components/Context";
import type { Member } from "../components/types";
import Header from "../components/Header";
import { toast } from "react-toastify";

import "../styles/UserDit.css";

const UserProfile: React.FC = () => {
  const { id: userID } = useParams<{ id: string }>();
  const nav = useNavigate();
  const ctx = useContext(myContext);
  if (!ctx) return null;

  const { memberList } = ctx;
  const oneUser = memberList.find((u) => String(u.id) === String(userID));

  // לא קוראים useEffect בתוך תנאי! קוראים פעם אחת ומגיבים ל-oneUser
  useEffect(() => {
    if (!oneUser) {
      toast.error("User Not Found :(");
    }
  }, [oneUser]);

  if (!oneUser) {
    // אפשר לשים גם כפתור Back לבית
    return (
      <>
        <Header />
        <div className="userpage-container">
          <div className="userpage-empty">
            <p>User Not Found..</p>
            <button className="userpage-back" onClick={() => nav("/userlist")}>
              Back to Users
            </button>
          </div>
        </div>
      </>
    );
  }

  // בניית שם מלא – תואם לטייפ שמיפית {name:{title,first,last}}
  const fullName = [oneUser.name?.title, oneUser.name?.first, oneUser.name?.last]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <Header />

      <div className="userpage-container">
        <section className="userpage-card">
          <div className="userpage-left">
            <div className="userpage-avatar">
              <img
                src={oneUser.img || "https://via.placeholder.com/160?text=User"}
                alt={fullName || "User"}
              />
            </div>

            <div className="userpage-meta">
              <h2 className="userpage-name">{fullName || "Unknown User"}</h2>
              <div className="userpage-pills">
                {typeof oneUser.age === "number" && (
                  <span className="pill">Age: {oneUser.age}</span>
                )}
                {oneUser.email && <span className="pill">{oneUser.email}</span>}
              </div>
            </div>
          </div>

          <div className="userpage-right">
            <h3 className="section-title">Books read</h3>
            <div className="chips">
              {(oneUser.booksRead ?? []).length === 0 ? (
                <span className="chip chip--muted">No books yet</span>
              ) : (
                (oneUser.booksRead ?? []).map((title, i) => (
                  <span className="chip" key={i} title={title}>
                    {title}
                  </span>
                ))
              )}
            </div>

            {/* דוגמה לעוד מידע עתידי: 
            <h3 className="section-title">Borrowed</h3>
            <div className="chips">...</div>
            */}
          </div>
        </section>

        <div className="userpage-actions">
          <button className="userpage-back" onClick={() => nav("/userlist")}>
            Back to Users
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
