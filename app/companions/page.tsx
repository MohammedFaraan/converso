import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

const CompanionLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;

  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  const companions = await getAllCompanions({ subject, topic });

  return (
    <main className="pb-10">
      <section className="flex justify-between items-center gap-6 max-md:flex-col max-md:items-start mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Companions</h1>
        <div className="flex items-center gap-4 max-sm:flex-col max-sm:w-full max-sm:items-start">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {companions.length > 0 ? (
          companions.map((companion, index) => (
            <CompanionCard
              key={index}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">No companions found</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default CompanionLibrary;
