import { Search } from "../components/search";
import { SearchResults } from "../components/searchResults";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-4 sm:p-16">
      <h1 className="text-center text-xl pb-8"> עזרה באיתור נעדרים וחטופים</h1>

      <div className="flex min-h-screen flex-col items-center gap-6 p-4 sm:p-16">
        <Search />
        <SearchResults />
      </div>
    </main>
  );
}
