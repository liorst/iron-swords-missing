"use client";

import { fetchData } from "@/actions";
import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { searchParamsSchema } from "@/lib/validations/search-params";
import { MessageContext } from "../context/MessageContext";
import { SearchResultContext } from "../context/SearchResultContext";
import CopyButton from "./ui/copy-button";

const MIN_QUERY_LENGTH = 3;

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { type, query } = searchParamsSchema.parse({
    type: searchParams.get("type"),
    query: searchParams.get("query") ?? "",
  });

  const inputValueRef = useRef("");
  const { setData } = useContext(SearchResultContext);

  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState(query);
  const [isResults, setIsResults] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        query: searchName ?? "",
        type: "person",
      })}`,
      {
        scroll: false,
      },
    );
  }, [searchName]);

  useEffect(() => {
    if (type === "person") {
      load(query);
    }
  }, [type, query]);

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  const { message, setMessage } = useContext(MessageContext);

  const load = async (name?: string) => {
    if (name && name.length >= MIN_QUERY_LENGTH) {
      setIsLoading(true);

      try {
        const result = await fetchData({ name });
        setData(result);
        setIsResults(result.length > 0);
        setSearchName(name);
        setMessage(result.length ? "" : "לא נמצאו תוצאות");
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsResults(false);
        setMessage("משהו השתבש. נסו שוב או צרו איתנו קשר");
      }
    }
  };
  const debouncedSearch = useCallback(
    debounce(async () => {
      const name = inputValueRef.current?.trim();
      await load(name);
    }, 250),
    [message, setMessage],
  );

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    inputValueRef.current = name;

    if (name && name.length > 0 && name.length < MIN_QUERY_LENGTH)
      setIsError(true);

    if (name === "") {
      setData([]);
      setMessage("");
      setIsResults(false);
      debouncedSearch.cancel(); // Cancel the debounce
    } else {
      debouncedSearch();
    }
  }

  return (
    <div className="flex" dir="rtl">
      <Input
        dir="rtl"
        type="search"
        placeholder="שם פרטי/משפחה (בעברית) ..."
        className={cn("md:w-[100px] lg:w-[300px]")}
        defaultValue={query}
        onChange={onInputChange}
        isLoading={isLoading}
        iconSrc={"/search.svg"}
      />

      {isResults && (
        <div className="mx-4">
          <CopyButton text={window.location.href} />
        </div>
      )}
    </div>
  );
}
