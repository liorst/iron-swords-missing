"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useCallback, useRef } from "react";

import { cn } from "@/lib/utils";
import { searchParamsSchema } from "@/lib/validations/search-params";
import { useAtom } from "jotai";
import { queryAtom } from "../store";
import CopyButton from "./ui/copy-button";

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { type, query = "" } = searchParamsSchema.parse({
    type: searchParams.get("type"),
    query: searchParams.get("query") ?? "",
  });

  const [, setQuery] = useAtom(queryAtom);
  setQuery(query);

  const inputValueRef = useRef("");

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

  const updateQuery = () => {
    router.push(
      `${pathname}?${createQueryString({
        query,
        type: "person",
      })}`,
      {
        scroll: false,
      },
    );
  };

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    inputValueRef.current = query;

    updateQuery();
    setQuery(query);
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
        // isLoading={isLoading}
        iconSrc={"/search.svg"}
      />

      {query && (
        <div className="mx-4">
          <CopyButton text={window.location.href} />
        </div>
      )}
    </div>
  );
}
