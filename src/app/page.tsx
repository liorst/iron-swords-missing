"use client";

import useDebounce from "@/hooks/use-debounce";
import { useAtom } from "jotai";
import Image from "next/image";
import { Search } from "../components/search";
import { SearchResults } from "../components/search-results";
import { queryAtom } from "../store";

import { api } from "@/trpc/react";

export default function Home() {
  const [query] = useAtom(queryAtom);
  const debouncedSearch = useDebounce(query, 500);

  const { data = [], isLoading } = api.people.search.useQuery({
    query: debouncedSearch,
  });

  return (
    <main className="flex flex-col min-h-screen p-4 sm:p-16">
      <h1 className="text-center text-xl"> עזרה באיתור נעדרים וחטופים</h1>

      <div className="flex min-h-screen flex-col items-center gap-6 p-4 sm:p-16">
        {(!query || !data.length) && (
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert self-center"
            src="/logo.jpg"
            alt="Logo"
            width={180}
            height={37}
            priority
          />
        )}

        <Search
          isLoading={isLoading}
          showCopyButton={data.length > 0 && !!query}
        />
        <SearchResults data={data} query={debouncedSearch} />
      </div>
    </main>
  );
}
