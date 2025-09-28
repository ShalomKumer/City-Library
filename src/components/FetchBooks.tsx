import { useContext, useEffect } from "react";
import { myContext } from "./Context";
import { toast } from "react-toastify";
import type { Book } from "./types";

function mapToBook(item: any, idx: number): Book {
  const v = item?.volumeInfo ?? {};
  const authors = Array.isArray(v.authors) ? v.authors : ["Unknown Author"];
  const yearStr = typeof v.publishedDate === "string" ? v.publishedDate : "2000";
  return {
    id: String(item?.id ?? idx),
    bookName: v.title ?? "Untitled",
    description: v.subtitle ?? v.description ?? "",
    author: authors,
    img: v.imageLinks?.smallThumbnail ?? "",
    alt: v.description ?? v.title ?? "",
    year: yearStr,
    read: false,
    genres: Array.isArray(v.categories) ? v.categories : [],
    rateing: {
      average: Math.random() * (5 - 1) + 1,
      reviews: [],
    },
  };
}

async function fetchBooksPage(url: string): Promise<Book[]> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const items = data?.items ?? [];
    return items.map((item: any, i: number) => mapToBook(item, i));
  } 
  catch (err) {
    console.error("fetchBooksPage error:", err);
    return []
  }
}

function dedupeById(list: Book[]): Book[] {
  const seen = new Set<string>();
  const out: Book[] = [];
  for (const b of list) {
    if (!seen.has(b.id)) {
      seen.add(b.id);
      out.push(b);
    }
  }
  return out;
}

const FetchBooks: React.FC = () => {
  const ctx = useContext(myContext);
  if (!ctx) return null;

  const { setBookList } = ctx;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const urls = [
          "https://www.googleapis.com/books/v1/volumes?q=a&maxResults=40&startIndex=0",
          "https://www.googleapis.com/books/v1/volumes?q=a&maxResults=40&startIndex=40",
          "https://www.googleapis.com/books/v1/volumes?q=a&maxResults=20&startIndex=80",
        ];
        const pages = await Promise.all(urls.map(fetchBooksPage));
        const merged = dedupeById(pages.flat());

        if (!cancelled) {
          setBookList((prev) => [...prev, ...merged]);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) toast.error("Failed to fetch books");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [setBookList]);

  return null;
};

export default FetchBooks;
