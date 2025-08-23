"use client";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("topic") || "";

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });

        router.push(newUrl);
      } else {
        if (pathname === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
  }, [searchQuery, pathname, router, searchParams]);

  return (
    <div className="relative border border-black rounded-lg px-2 py-1 flex items-center gap-2">
      <Image src="/icons/search.svg" alt="search" width={14} height={14} />
      <input
        value={searchQuery}
        placeholder="Search companions..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="outline-0"
      />
    </div>
  );
};

export default SearchInput;
