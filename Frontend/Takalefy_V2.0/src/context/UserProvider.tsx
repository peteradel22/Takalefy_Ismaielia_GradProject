/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

type UserContextType = {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
};

const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
});

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || null;
  });

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserId = () => {
  return useContext(UserContext);
};

export default UserProvider;
