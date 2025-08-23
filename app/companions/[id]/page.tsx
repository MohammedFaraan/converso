import { getCompanion } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface CompanionSessionProps {
  params : Promise<{id: string}>
}

const CompanionSession = async ({params} : CompanionSessionProps ) => {
  const {id} = await params;
  const user = await currentUser();

  if (!user) redirect("/sign-in");
  console.log(user, id);
  const companion = await getCompanion(id);

  if (!companion.name) redirect("/companions");

  console.log(companion);

  return (
    <div>
     CompanionSession 
    </div>
  )
}

export default CompanionSession
