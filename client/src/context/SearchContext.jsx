import { createContext, useState } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext };
export default SearchProvider;