import CompanionComponent from "@/components/CompanionComponent";
import { getCompanion } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

interface CompanionSessionProps {
  params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionProps) => {
  const { id } = await params;
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companion = await getCompanion(
    id
  );

  const { name, topic, subject, style, voice, duration } = companion;

  if (!name) redirect("/companions");

  return (
    <main className="pb-10">
      <article className="flex rounded-xl border border-border dark:border-white/30 p-6 justify-between max-md:flex-col bg-card/80 dark:bg-card/80 shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <div
            className="size-[72px] flex justify-center items-center max-md:hidden rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              height={35}
              width={35}
              className="transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-bold text-2xl dark:text-white/90">{name}</h1>
              <div className="px-3 py-1 rounded-full text-sm font-medium bg-opacity-80 dark:bg-opacity-30 transition-colors duration-200"
                style={{ backgroundColor: getSubjectColor(subject) }}>
                {subject}
              </div>
            </div>
            <p className="text-muted-foreground dark:text-muted-foreground/80">{topic}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-2 bg-secondary/50 dark:bg-secondary/30 px-4 py-2 rounded-full">
            <Image
              src="/icons/clock.svg"
              alt="Duration"
              width={18}
              height={18}
              className="opacity-70"
            />
            <p className="text-lg font-medium dark:text-white/80">{duration} minutes</p>
          </div>
        </div>
      </article>
      <CompanionComponent 
        {...companion}
        companionId={id}
        userName={user.firstName!}
        userImage={user.imageUrl!}
      />
    </main>
  );
};

export default CompanionSession;
