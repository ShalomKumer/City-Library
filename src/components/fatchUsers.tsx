import { useContext, useEffect } from "react";
import { myContext } from "./Context";
import type { Member, Book } from "./types";



function findBooksRead(books: Book[]): string[] {
  // return books.filter(b => b.read).map(b => b.bookName);
  let amount  = Math.round(Math.random() * (8 - 2) + 2 )
  let listBooksR: string [] = []
  for (let i = 0 ; i < amount ; i++ ){
    let idx :number[] = []
    let index = Math.round(Math.random() * (books.length - 1) + 1 )
    idx.push(index)
    if(!idx.includes(index)){
      listBooksR.push(books[index]?.bookName ?? `not found book ${i + 1 }:-(`)
    }
  }
  return listBooksR
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
function dedupeById(list: Member[]): Member[] {
  const seen = new Set<string | number>();
  const out: Member[] = [];
  for (const m of list) {
    if (!seen.has(m.id)) {
      seen.add(m.id);
      out.push(m);
    }
  }
  return out;
}

const FetchUsers: React.FC = () => {
  const ctx = useContext(myContext);
  if (!ctx) return null;
  const { setMemberList, booksList, memberList } = ctx;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const readNames = findBooksRead(booksList);
      const rawUsers = await fetchRandomUsers(30);
      const mapped: Member[] = rawUsers.map((u, i) =>
        mapToMember(u, i, readNames)
      );

      if (!cancelled) {
        setMemberList(prev => dedupeById([...prev, ...mapped]));
      }
    })();

    return () => { cancelled = true; };
  }, [booksList, setMemberList]);
  console.log(memberList)

  return null;
};

export default FetchUsers;
