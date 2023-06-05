import { db } from "@/utils/firebase";
import { Team } from "@/utils/types";
import {
  getDocs,
  collection,
  where,
  query,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export const fetchBelongedTeams = async (userId: string) => {
  try {
    const belongedTeams: Array<Team> = [];
    const teamsRef = collection(db, "teams");
    const q = query(teamsRef, where("users", "array-contains-any", [userId]));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((res) => belongedTeams.push(res.data() as Team));
    return belongedTeams;
  } catch (error) {
    console.error(error);
    throw new Error("ミーティングの取得に失敗しました。");
  }
};

export const createTeam = async (teamName: string, userId: string[]) => {
  try {
    await addDoc(collection(db, "teams"), {
      name: teamName,
      users: userId,
    });
  } catch (error) {
    console.error(error);
    throw new Error("チームの作成に失敗しました。");
  }
};

export const updateTeam = async (
  teamId: string,
  teamName: string,
  userId: string[]
) => {
  try {
    await setDoc(doc(db, "teams", teamId), {
      name: teamName,
      users: userId,
    });
  } catch (error) {
    console.error(error);
    throw new Error("チームの更新に失敗しました。");
  }
};

export const deleteTeam = async (teamId: string) => {
  try {
    await deleteDoc(doc(db, "teams", teamId));
  } catch (error) {
    console.error(error);
    throw new Error("ミーティングの削除に失敗しました。");
  }
};

export const fetchAllTeams = async () => {
  const teams: Array<Team> = [];
  try {
    const querySnapshot = await getDocs(collection(db, "teams"));
    querySnapshot.forEach((doc) => {
      const teamId = doc.id;
      const team = doc.data() as Team;
      team.id = teamId;
      teams.push(team);
    });
    return teams;
  } catch (error) {
    console.error(error);
    throw new Error("ユーザーの取得に失敗しました。");
  }
};

export const updateWholeTeamMember = async (user: string) => {
  await getDoc(doc(db, "teams", "all")).then((res) => {
    if (res.exists()) {
      const team = res.data() as Team;
      const userIds = team.users;
      userIds.push(user);
      updateDoc(doc(db, "teams", "all"), {
        users: userIds,
      });
    } else {
      setDoc(doc(db, "teams", "all"), {
        users: [user],
      });
    }
  });
};
