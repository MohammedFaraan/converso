"use client";

import { addBookmark, removeBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <article
      key={id}
      className="companion-card hover:shadow-2xl"
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark" onClick={handleAddBookmark}>
          <Image
            src={
              bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
            }
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>

      <h2 className="text-2xl font-bold">{name}</h2>

      <p className="text-sm">{topic}</p>
      <div className="flex gap-2">
        <Image src="/icons/clock.svg" alt="clock" width={13.5} height={13.5} />
        <p>{duration} minutes</p>
      </div>
      <div>
        <Link href={`companions/${id}`} className="w-full">
          <button className="btn-primary w-full justify-center">
            Launch Lession
          </button>
        </Link>
      </div>
    </article>
  );
};

export default CompanionCard;
