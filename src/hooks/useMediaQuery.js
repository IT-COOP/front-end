import { useState, useEffect } from "react";

export default function useMediaQuery(queryString) {
  const [isMatched, setIsMatched] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(queryString);
    mediaQueryList.addEventListener("change", function (event) {
      const { matches } = event;
      if (matches) {
        setIsMatched(true);
      } else {
        setIsMatched(false);
      }
    });
  }, [queryString]);

  return isMatched;
}
