import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { fetchCurrentUser } from "@/models/UserModel";

export const createAccount = async (
  mail: string,
  password: string,
  name: string
) => {
  try {
    await createUserWithEmailAndPassword(auth, mail, password).then(
      (userCredential) => {
        updateProfile(userCredential.user, { displayName: name }).then(() =>
          console.log("success")
        );
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const login = async (mail: string, password: string) => {
  try {
    return signInWithEmailAndPassword(auth, mail, password).then(
      (userCredential) => {
        const userId = userCredential.user.email!;
        return fetchCurrentUser(userId);
      }
    );
  } catch (error) {
    console.error(error);
    throw new Error("エラーです。");
  }
};
