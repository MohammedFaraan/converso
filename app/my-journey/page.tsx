import CompanionList from "@/components/CompanionList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getRecentSessions,
  getUserCompanions,
} from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getRecentSessions(10);

  return (
    <main className="min-lg:w-3/4">
      <section className="flex justify-between gap-4 max-md:flex-col items-center">
        <div className="flex flex-1 gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
            className="rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-muted-foreground">{user.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/check.svg"
                alt="check"
                width={22}
                height={22}
                className="rounded-lg"
              />
              <p>{sessionHistory.length}</p>
            </div>
            <p>Lessions Completed</p>
          </div>

          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/cap.svg"
                alt="cap"
                width={22}
                height={22}
                className="rounded-lg"
              />
              <p>{companions.length}</p>
            </div>
            <p>Companions Created</p>
          </div>
        </div>
      </section>
      <Accordion
        type="multiple"
      >
        <AccordionItem value="recent">
          <AccordionTrigger className="font-bold text-2xl">Recent Session</AccordionTrigger>
          <AccordionContent>
            <CompanionList 
            title="Recent Sessions"
            companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
          <AccordionTrigger className="font-bold text-2xl">My Companions {companions.length}</AccordionTrigger>
          <AccordionContent>
            <CompanionList 
            title="My Companions"
            companions={companions}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Profile;
