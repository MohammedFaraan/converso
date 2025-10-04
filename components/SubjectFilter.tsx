"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SubjectFilter = () => {
  const [subject, setSubject] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let newUrl = "";
    if (subject === "all" || subject === "") {
      router.push(newUrl);
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });

      router.push(newUrl, { scroll: false });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject,
      });

      router.push(newUrl);
    }
  }, [subject]);

  return (
    <Select value={subject} onValueChange={(value) => setSubject(value)}>
      <SelectTrigger 
        className="w-full min-w-[180px] capitalize bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg py-2 px-4 text-sm focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary/50 focus:border-transparent transition-colors"
        aria-label="Filter by subject"
      >
        <SelectValue placeholder="Select subject" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
        <SelectItem value="all" className="text-sm focus:bg-gray-100 dark:focus:bg-gray-700">
          All Subjects
        </SelectItem>

        {subjects.map((subject, _) => (
          <SelectItem 
            key={subject} 
            value={subject} 
            className="capitalize text-sm focus:bg-gray-100 dark:focus:bg-gray-700"
          >
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
