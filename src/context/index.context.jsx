import React, { useState, useEffect } from "react";

const IndexContext = React.createContext();

function IndexWrapper(props) {
  const [indexNumber, setIndexNumber] = useState(0);

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
