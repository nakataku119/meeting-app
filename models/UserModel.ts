import { db } from "@/utils/firebase";
import { Meeting, Team, User } from "@/utils/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const fetchAllUsers = async () => {
  const users: Array<User> = [];
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => users.push(doc.data() as User));
    return users;
  } catch (error) {
    console.error(error);
    throw new Error("ユーザーの取得に失敗しました。");
  }
};

export const fetchCurrentUser = async (mail: string) => {
  try {
    const snapshot = await getDoc(doc(db, "users", mail));
    const currentUser = snapshot.data();
    return currentUser as User;
  } catch (error) {
    console.error(error);
    throw new Error("ユーザーの取得に失敗しました。");
  }
};

export const createUser = async (id: string, name: string) => {
  try {
    await setDoc(doc(db, "users", id), {
      name: name,
      mail: id,
      admin: false,
    });
  } catch (error) {
    console.error(error);
    throw new Error("ユーザーの取得に失敗しました。");
  }
};

export const fetchMeetingUsers = async (meeting: Meeting) => {
  try {
    const meetingUsers: Array<User> = [];
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("mail", "in", meeting.users));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((res) => meetingUsers.push(res.data() as User));
    return meetingUsers;
  } catch (error) {
    console.error(error);
    throw new Error("ミーティングの取得に失敗しました。");
  }
};

export const fetchTeamUsers = async (team: Team) => {
  try {
    const teamUsers: Array<User> = [];
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("mail", "in", team.users));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((res) => teamUsers.push(res.data() as User));
    return teamUsers;
  } catch (error) {
    console.error(error);
    throw new Error("ミーティングの取得に失敗しました。");
  }
};

export const updateUser = () => {};

export const deleteUser = () => {};
