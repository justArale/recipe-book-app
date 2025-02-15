import React, { useState, useEffect } from "react";

const IndexContext = React.createContext();

function IndexWrapper(props) {
  const [indexNumber, setIndexNumber] = useState(() => {
    // Initial state from query param
    const params = new URLSearchParams(window.location.search);
    const queryIndex = params.get("color");

    // If query param is true, take that value, otherwise take the default value (1)
    return queryIndex ? parseInt(queryIndex, 10) : 1;
  });

  useEffect(() => {
    // Save indexNumber to query param in URL whenever it changes
    if (indexNumber !== null) {
      const url = new URL(window.location);
      url.searchParams.set("color", indexNumber); // Set color-param to the URL
      window.history.pushState({}, "", url); // Update the URL without reloading the page
    }
  }, [indexNumber]);
  return (
    <IndexContext.Provider
      value={{
        indexNumber,
        setIndexNumber,
      }}
    >
      {props.children}
    </IndexContext.Provider>
  );
}

export { IndexWrapper, IndexContext };
