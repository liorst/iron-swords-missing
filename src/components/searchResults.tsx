"use client";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useState } from "react";
import PersonData from "../app/utils/types";
import useDebounce from "../hooks/use-debounce";
import { loadingAtom, queryAtom } from "../store";
import { PersonCard } from "./person-card";

export function SearchResults() {
  const [message, setMessage] = useState("");
  const [query] = useAtom(queryAtom);

  async function getPeople() {
    // const result = await fetchData(query)
    return Promise.resolve([]);
  }

  const debouncedSearch = useDebounce("query", 500);

  const { isLoading, error, data } = useQuery<PersonData[]>({
    queryKey: [debouncedSearch],
    queryFn: () => getPeople(),
  });

  const [, setLoading] = useAtom(loadingAtom);
  setLoading(isLoading);
  console.log({ query, data, message, isLoading, error });

  if (query && !isLoading && data) {
    setMessage("לא נמצאו תוצאות");
  }

  if (error) {
    setMessage("משהו השתבש. נסו שוב או צרו איתנו קשר");
  }

  return !data && message ? (
    <p>{message}</p>
  ) : (
    <div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {(data ?? []).map((personData) => (
          <li
            key={personData.id}
            className="col-span-1 divide-y divide-gray-200 rounded-lg shadow"
          >
            <PersonCard {...personData} />
          </li>
        ))}
      </ul>
    </div>
  );
}
