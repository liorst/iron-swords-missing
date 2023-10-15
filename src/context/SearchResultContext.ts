import React from "react";
import PersonData from "../app/utils/types";

export const SearchResultContext = React.createContext({
  data: [] as PersonData[],
  setData: (data: PersonData[]) => {},
});
