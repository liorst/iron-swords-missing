"use client";

import { fetchData } from "@/actions";
import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import { useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import PersonData from "../app/utils/types";
import { cn } from "../lib/utils";
import CopyButton from "./ui/copy-button";
import { MessageContext } from "../context/MessageContext";
import { SearchResultContext } from "../context/SearchResultContext";

const MIN_QUERY_LENGTH = 3;
export function Search() {
  const searchParams = useSearchParams();
  const inputValueRef = useRef("");

  const { setData } = useContext(SearchResultContext);

  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [isResults, setIsResults] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const name = searchParams.get("name");
    const event = {
      target: { value: name },
    } as React.ChangeEvent<HTMLInputElement>;
    onInputChange(event);
  }, [searchParams]);

  const { message, setMessage } = useContext(MessageContext);
  const debouncedSearch = useCallback(
    debounce(async () => {
      const name = inputValueRef.current?.trim();

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
          console.error(err);
          setIsLoading(false);
          setIsResults(false);
          setMessage("משהו השתבש. נסו שוב או צרו איתנו קשר");
        }
      }
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
        defaultValue={searchName}
        onChange={onInputChange}
        isLoading={isLoading}
        iconSrc={"/search.svg"}
      />

      {isResults && (
        <CopyButton
          className="mx-4"
          text={`https://ironswords.org.il/?name=${searchName}`}
        />
      )}
    </div>
  );
}
