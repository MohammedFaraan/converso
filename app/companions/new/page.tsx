import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const NewCompanion = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const canCreateCompanion = await newCompanionPermissions();

  return (
    <main className={`${canCreateCompanion ? "min-lg:w-1/3" : "" } min-md:w-2/3 items-center justify-center`}>
      {canCreateCompanion ? (
        <article className="w-full flex flex-col gap-4 mb-5">
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit">
          <Image src="/images/limit.svg" alt="limit" height={230} width={360} />
          <div className="cta-badge">Upgrade Your Plan</div>
          <h1>You’ve Reached Your Limit</h1>
          <p>
            You’ve reached your companion limit. Upgrade to create more
            companions and premium features.
          </p>
          <Link href="/subscription" className="btn-primary">
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;
