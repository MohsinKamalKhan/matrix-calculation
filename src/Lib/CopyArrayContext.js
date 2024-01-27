import { createContext  } from "react";

export  const CopyArrayContext = createContext({
    copiedArray: undefined,
    copiedRowsCount: undefined, 
    copiedColsCount: undefined ,
    updateCopiedArray: undefined
})

