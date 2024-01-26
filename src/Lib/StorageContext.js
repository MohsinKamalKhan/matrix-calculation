// path-to-your-context-file.js
import { createContext, useContext, useEffect, useState } from 'react';

const CopiedArrayContext = createContext();

export const CopiedArrayProvider = ({ children }) => {
  const [copiedArray, setCopiedArray] = useState(null);
  const [copiedRowsCount, setCopiedRowsCount] = useState(0);
  const [copiedColsCount, setCopiedColsCount] = useState(0);

  useEffect(() => {
    // Load data from local storage when the component mounts
    const storedArray = JSON.parse(localStorage.getItem('copiedArray'));
    const storedRowsCount = parseInt(localStorage.getItem('copiedRowsCount'), 10) || 0;
    const storedColsCount = parseInt(localStorage.getItem('copiedColsCount'), 10) || 0;

    if (storedArray) {
      setCopiedArray(storedArray);
      setCopiedRowsCount(storedRowsCount);
      setCopiedColsCount(storedColsCount);
    }
  }, []);

  const updateCopiedArray = (newArray, newRowsCount, newColsCount) => {
    setCopiedArray(newArray);
    setCopiedRowsCount(newRowsCount);
    setCopiedColsCount(newColsCount);

    // Save data to local storage whenever the array is updated
    localStorage.setItem('copiedArray', JSON.stringify(newArray));
    localStorage.setItem('copiedRowsCount', String(newRowsCount));
    localStorage.setItem('copiedColsCount', String(newColsCount));
  };

  return (
    <CopiedArrayContext.Provider
      value={{ copiedArray, copiedRowsCount, copiedColsCount, updateCopiedArray }}
    >
      {children}
    </CopiedArrayContext.Provider>
  );
};

export const useCopiedArray = () => {
  return useContext(CopiedArrayContext);
};
