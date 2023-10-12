"use client";
import Image from "next/image";
import { useState } from "react";
import { Search } from "./components/search";
import { SearchResults } from "./components/searchResults";
import { AnimalData } from "../utils/types";

const AnimalPage = () => {
  const [data, setData] = useState<AnimalData[]>([]);
  const [message, setMessage] = useState("");
  return (
    <main className="flex flex-col min-h-screen p-4 sm:p-16">
      <h1 className="text-center text-xl pb-8"> עזרה באיתור נעדרים וחטופים</h1>
      {data.length == 0 && (
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert self-center"
          src="/logo.jpg"
          alt="Logo"
          width={180}
          height={37}
          priority
        />
      )}

      <div className="flex min-h-screen flex-col items-center gap-6 p-4 sm:p-16">
        <Search setData={setData} setMessage={setMessage} />
        <SearchResults data={data} message={message} />
      </div>
    </main>
  );
};

export default AnimalPage;
