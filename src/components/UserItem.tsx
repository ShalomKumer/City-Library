import { useNavigate } from "react-router-dom";
import type { Member } from "./types";
import '../styles/UserItem.css'

type UserProp = {
  u: Member;
};

const UserItem: React.FC<UserProp> = ({ u }) => {
  const nav = useNavigate();

  const fullName =
    typeof (u as any)?.name === "object"
      ? [u.name.title, u.name.first, u.name.last].filter(Boolean).join(" ")
      : "" ;

  const ageText = typeof u.age === "number" ? `${u.age}` : undefined;

  const maxChips = 4;
  const chips = (u.booksRead ?? []).slice(0, maxChips);
  const more = Math.max(0, (u.booksRead?.length ?? 0) - chips.length);

  const onClick = () => nav(`/userprofile/${u.id}`);

  return (
    <div className="user-card">
      <button className="user-card__btn" onClick={onClick}>
        <div className="user-card__top">
          <div className="user-card__avatar">
            <img
              src={u.img || "https://via.placeholder.com/120x120?text=User"}
              alt={fullName || "User"}
            />
          </div>

          <div className="user-card__identity">
            <h2 className="user-card__name">{fullName || "Unknown User"}</h2>
            <div className="user-card__meta">
              {ageText && <span className="user-card__pill">Age: {ageText}</span>}
              {u.email && <span className="user-card__pill">{u.email}</span>}
            </div>
          </div>
        </div>

        <div className="user-card__books">
          <span className="user-card__section-title">Books read</span>
          <div className="user-card__chips">
            {chips.map((title, i) => (
              <span className="user-card__chip" key={i} title={title}>
                {title}
              </span>
            ))}
            {more > 0 && <span className="user-card__chip user-card__chip--more">+{more}</span>}
          </div>
        </div>
      </button>
    </div>
  );
};

export default UserItem;
