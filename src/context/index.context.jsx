import React, { useState, useEffect } from "react";

const IndexContext = React.createContext();

function IndexWrapper(props) {
  const [indexNumber, setIndexNumber] = useState(() => {
    // Initial state from localStorage
    const savedIndex = localStorage.getItem("indexNumber");
    return savedIndex !== null ? JSON.parse(savedIndex) : 0;
  });

  useEffect(() => {
    // Save indexNumber to localStorage whenever it changes
    localStorage.setItem("indexNumber", JSON.stringify(indexNumber));
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
