import { createContext, useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";

const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {


  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, status, setStatus }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
