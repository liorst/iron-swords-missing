import PersonData from "@/app/utils/types";
import { PersonCard } from "./person-card";

type Props = {
  data: PersonData[] | null;
};

export const SearchResults: React.FC<Props> = ({ data }) => {
  if (data?.length === 0) {
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
