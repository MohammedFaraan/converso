import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

const CompanionLibrary = async ({searchParams} : SearchParams) => {
  const filters = await searchParams;

  const subject = filters.subject ? filters.subject : '';
  const topic = filters.topic ? filters.topic : '';

  const companions = await getAllCompanions({subject, topic});

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Your Companions</h1>
        <div className="flex justify-between gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {
          companions.map((companion, _) => (
            <CompanionCard key={companion} {...companion} color={getSubjectColor(companion.subject)}/>
          ))
        }
        <p>{topic}</p>
      </section>
    </main>
  )
}

export default CompanionLibrary
