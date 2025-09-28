import { useContext, useEffect } from "react";
import { myContext } from "./Context";
import type { Member, Book } from "./types";

function pickRandomBooks(books: Book[], min = 2, max = 8): string[] {
  if (!books.length) return [];
  const count = Math.floor(Math.random() * (max - min + 1)) + min;

  const result: string[] = [];
  const used = new Set<number>();

  for (let i = 0; i < count && used.size < books.length; i++) {
    let idx: number;
    do {
      idx = Math.floor(Math.random() * books.length);
    } while (used.has(idx));
    used.add(idx);

    result.push(books[idx].bookName);
  }

  return result;
}


function mapToMember(user: any, idx: number, booksRead: string[]): Member {
  return {
    id: user.login?.uuid ?? String(idx + 1),
    name: {
      title: user.name?.title ?? "",
      first: user.name?.first ?? "",
      last:  user.name?.last  ?? "",
    },
    age: typeof user.dob?.age === "number" ? user.dob.age : undefined,
    email: user.email ?? "",
    img: user.picture?.medium ?? "",
    booksRead,
  } as Member;
}
async function fetchRandomUsers(results: number): Promise<any[]> {
  try {
    const res = await fetch(`https://randomuser.me/api/?results=${results}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data?.results) ? data.results : [];
  } 
  catch (err) {
    console.error("fetchRandomUsers error:", err);
    return [];
  }
}
function mergeByIdPreferNew(prev: Member[], next: Member[]): Member[] {
  const byId = new Map<string | number, Member>();
  for (const m of prev) byId.set(m.id, m);
  for (const m of next) {
    const old = byId.get(m.id);
    byId.set(m.id, { ...old, ...m });
  }
  return Array.from(byId.values());
}

const FetchUsers: React.FC = () => {
  const ctx = useContext(myContext);
  if (!ctx) return null;
  const { setMemberList, booksList } = ctx;

  useEffect(() => {
    if (!booksList || booksList.length === 0) return;
    let cancelled = false;
    (async () => {
      const rawUsers = await fetchRandomUsers(30);
      const mapped: Member[] = rawUsers.map((u, i) =>
        mapToMember(u, i, pickRandomBooks(booksList))
      );

      if (!cancelled) {
        setMemberList(prev => mergeByIdPreferNew(prev, mapped));
      }
    })();

    return () => { cancelled = true; };
  }, [booksList, setMemberList]);

  return null;
};

export default FetchUsers;
