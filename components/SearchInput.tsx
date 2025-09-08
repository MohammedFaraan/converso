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
    <div className="relative flex items-center w-full max-w-xs">
      <div className="absolute left-3 flex items-center pointer-events-none">
        <Image 
          src="/icons/search.svg" 
          alt="search" 
          width={16} 
          height={16} 
          className="text-gray-500 dark:brightness-0 dark:invert"
        />
      </div>
      <input
        value={searchQuery}
        placeholder="Search companions..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full py-2 pl-10 pr-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary/50 focus:border-transparent transition-colors"
        aria-label="Search companions"
      />
    </div>
  );
};

export default SearchInput;
