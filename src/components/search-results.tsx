import PersonData from "@/app/utils/types";
import { PersonCard } from "./person-card";

type Props = {
  data: PersonData[];
  query: string;
};
const MIN_QUERY_LENGTH = 3;

export const SearchResults: React.FC<Props> = ({ data, query }) => {
  if (!data.length && query && query.length < MIN_QUERY_LENGTH) {
    return <div>יש להזין לפחות 3 אותיות</div>;
  }

  if (!data.length && !!query) {
    return <div>לא נמצאו תוצאות</div>;
  }

  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {(data ?? []).map((personData) => (
          <li
            key={personData.id}
            className="col-span-1 divide-y divide-gray-200 rounded-lg shadow"
          >
            <PersonCard {...personData} />
          </li>
        ))}
      </ul>
    </div>
  );
};
