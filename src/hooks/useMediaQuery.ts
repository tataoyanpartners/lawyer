import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addListener(onChange);
    onChange();
    return () => mql.removeListener(onChange);
  }, [query]);
  return matches;
};
