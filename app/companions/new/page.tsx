import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

const NewCompanion = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const canCreateCompanion = await newCompanionPermissions();

  return (
    <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {canCreateCompanion ? (
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Companion Builder</h1>
            <p className="text-muted-foreground">Create your personalized AI companion to help with your learning journey</p>
          </div>
          
          <Card className="border-border shadow-md dark:bg-card dark:border-border">
            <CardContent className="pt-6">
              <CompanionForm />
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-border shadow-md overflow-hidden dark:bg-card dark:border-border">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-6">
            <div className="relative w-[280px] h-[180px] my-4">
              <Image src="/images/limit.svg" alt="limit" fill className="object-contain" />
            </div>
            <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20">
              Upgrade Your Plan
            </div>
            <CardTitle className="text-2xl font-bold">You've Reached Your Limit</CardTitle>
            <CardDescription className="text-base">
              You've reached your companion limit. Upgrade to create more
              companions and premium features.
            </CardDescription>
            <Link href="/subscription" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90">
              Upgrade My Plan
            </Link>
          </CardContent>
        </Card>
      )}
    </main>
  );
};

export default NewCompanion;
