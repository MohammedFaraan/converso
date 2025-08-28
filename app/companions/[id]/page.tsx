import CompanionSection from "@/components/CompanionSection";
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
  
  // console.log(companion);

  return (
    <main>
      <article className="flex rounded-border p-6 justify-between max-md:flex-col">
        <div className="flex items-center gap-4">
          <div
            className="size-[72px] flex justify-center items-center max-md:hidden rounded-lg"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              height={35}
              width={35}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
            <p className="font-bold text-2xl">{name}</p>
            <div className="subject-badge h-fit">{subject}</div>
          </div>
          <p>{topic}</p>
          </div>
        </div>
        <div>
          <p className="text-xl max-sm:hidden">{duration} minutes</p>
        </div>
      </article>
      <CompanionSection 
      {...companion}
      companionId={id}
      userName={user.firstName!}
      userImage={user.imageUrl!}
      />
    </main>
  );
};

export default CompanionSession;
