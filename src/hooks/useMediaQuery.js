import { useState, useEffect } from "react";

export default function useMediaQuery(queryString) {
  const [isMatched, setIsMatched] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(queryString);
    function onChange(event) {
      console.log(event);
      const { matches } = event;
      if (matches) {
        setIsMatched(true);
      } else {
        setIsMatched(false);
      }
    }
    mediaQueryList.addEventListener("change", onChange);
    return () => {
      mediaQueryList.removeEventListener("change", onChange);
    };
  }, [queryString]);

  return isMatched;
}
