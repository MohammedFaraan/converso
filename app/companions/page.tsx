import CompanionCard from "@/components/CompanionCard";
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
        <p>Filters</p>
      </section>
      <section className="companions-grid">
        {
          companions.map((companion, _) => (
            <CompanionCard key={companion} {...companion} color={getSubjectColor(companion.subject)}/>
          ))
        }
      </section>
    </main>
  )
}

export default CompanionLibrary
