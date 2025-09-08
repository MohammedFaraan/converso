"use client";

import { addBookmark, removeBookmark } from "@/lib/actions/companion.actions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  duration: number;
  subject: string;
  color: string;
  bookmarked: boolean;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  bookmarked,
}: CompanionCardProps) => {
  const pathname = usePathname();

  const handleAddBookmark = async () => {
    console.log(id, pathname);
    if (bookmarked) {
      await removeBookmark(id, pathname);
    } else {
      await addBookmark(id, pathname);
    }
  };

  return (
    <Card
      key={id}
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg border-2",
        "dark:bg-card/90 dark:hover:bg-card/95 dark:border-border/50"
      )}
      style={{ 
        backgroundColor: color, 
        borderColor: "rgba(0,0,0,0.2)",
      }}
    >
      <CardHeader className="p-4 pb-0 space-y-0">
        <div className="flex justify-between items-center">
          <div className="bg-black/80 dark:bg-black/90 text-white rounded-full text-xs px-3 py-1 font-medium capitalize">
            {subject}
          </div>
          <button 
            className="bg-black/80 dark:bg-black/90 rounded-full flex items-center justify-center h-7 w-7 cursor-pointer hover:bg-black/90 transition-colors" 
            onClick={handleAddBookmark}
            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Image
              src={
                bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
              }
              alt="bookmark"
              width={12.5}
              height={15}
              className="brightness-0 invert"
            />
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-5 space-y-4">
        <h2 className="text-2xl font-bold text-black/90 dark:text-white/90">{name}</h2>
        <p className="text-sm text-black/70 dark:text-white/70">{topic}</p>
        <div className="flex items-center gap-2 text-black/70 dark:text-white/70">
          <Image 
            src="/icons/clock.svg" 
            alt="clock" 
            width={13.5} 
            height={13.5} 
            className="dark:brightness-0 dark:invert"
          />
          <p className="text-sm">{duration} minutes</p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link href={`companions/${id}`} className="w-full">
          <button className="w-full bg-black/85 hover:bg-black text-white dark:bg-white/90 dark:text-black dark:hover:bg-white cursor-pointer rounded-xl transition-colors py-2.5 font-medium">
            Launch Lesson
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CompanionCard;
