import { createContext, useEffect, useState } from "react";
import { User } from "@/utils/types";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { fetchCurrentUser } from "@/models/UserModel";

interface UserContextProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const CurrentUserContext = createContext<UserContextProps>({
  currentUser: null,
  setCurrentUser: () => {},
});

const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        fetchCurrentUser(user.email).then((res) => setCurrentUser(res));
      } else {
        console.log("未ログイン");
      }
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
