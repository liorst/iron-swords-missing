"use client";
import { Input } from "@/components/ui/input";
import { fetchData } from "@/actions";
import AnimalData from "@/app/utils/types";
import { useRef } from "react";
import debounce from "lodash.debounce";
import { useCallback } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import validator from "validator";
import { cn } from "@/lib/utils";
import CopyButton from "@/components/ui/copy-button";
import axios from "axios";
const MIN_QUERY_LENGTH = 3;

export function Search({
  setData,
  setMessage,
}: {
  setData: (data: AnimalData[]) => void;
  setMessage: (msg: string) => void;
}) {
  const searchParams = useSearchParams();
  const inputValueRef = useRef("");

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

  const debouncedSearch = useCallback(
    debounce(async () => {
      const name = inputValueRef.current?.trim();

      if (name && name.length >= MIN_QUERY_LENGTH) {
        setIsLoading(true);

        try {
          const result: AnimalData[] = (
            await axios.get(`/api/animals?text=${name}`)
          ).data;
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
    [],
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
        placeholder="שם בעל החיים (בעברית) ..."
        className={cn("md:w-[100px] lg:w-[300px]")}
        defaultValue={searchName}
        onChange={onInputChange}
        isLoading={isLoading}
        iconSrc={"/search.svg"}
      />

      {isResults && (
        <CopyButton
          className="mx-4"
          text={`https://ironswords.org.il/animal/?name=${searchName}`}
        />
      )}
    </div>
  );
}
