"use client";

import { Search } from "../components/search";
import { SearchResults } from "../components/search-results";
import { useAtom } from "jotai";
import { queryAtom } from "../store";
import useDebounce from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import PersonData from "./utils/types";
import Image from "next/image";

import { api } from "@/trpc/react";

export default function Home() {
  const [query] = useAtom(queryAtom);
  const debouncedSearch = useDebounce(query, 500);
  const res = api.people.search.useQuery({ query: debouncedSearch });

  const data = res.data ?? [];

  return (
    <main className="flex flex-col min-h-screen p-4 sm:p-16">
      <h1 className="text-center text-xl pb-8"> עזרה באיתור נעדרים וחטופים</h1>

      <div className="flex min-h-screen flex-col items-center gap-6 p-4 sm:p-16">
        {!data?.length && (
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert self-center"
            src="/logo.jpg"
            alt="Logo"
            width={180}
            height={37}
            priority
          />
        )}

        <Search />
        <SearchResults data={query ? data : null} />
      </div>
    </main>
  );
}
