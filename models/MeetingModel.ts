import { db } from "@/utils/firebase";
import { Meeting } from "@/utils/types";
import {
  getDocs,
  collection,
  where,
  query,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const fetchJoinedMeetings = async (userId: string) => {
  try {
    const joinedMeetings: Array<Meeting> = [];
    const meetingsRef = collection(db, "meetings");
    const q = query(
      meetingsRef,
      where("users", "array-contains-any", [userId])
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((res) => {
      const meetingId = res.id;
      const meeting = res.data() as Meeting;
      meeting.id = meetingId;
      joinedMeetings.push(meeting);
    });
    return joinedMeetings;
  } catch (error) {
    console.error(error);
    throw new Error("ミーティングの取得に失敗しました。");
  }
};

export const createMeeting = async (
  startTime: string,
  endTime: string,
  agendas: Array<string>,
  users: Array<string>,
  freeAgenda?: string
) => {
  try {
    await addDoc(collection(db, "meetings"), {
      startTime: startTime,
      endTime: endTime,
      agendas: agendas,
      users: users,
      freeAgenda: freeAgenda,
    });
  } catch (error) {
    console.error(error);
    throw new Error("ミーティングの作成に失敗しました。");
  }
};

export const updateMeeting = async (
  meetingId: string,
  startTime: string,
  endTime: string,
  agendas: Array<string>,
  users: Array<string>,
  freeAgenda?: string
) => {
  try {
    await setDoc(doc(db, "meetings", meetingId), {
      startTime: startTime,
      endTime: endTime,
      agendas: agendas,
      users: users,
      freeAgenda: freeAgenda,
    });
  } catch (error) {
    console.error(error);
    throw new Error("ミーティングの更新に失敗しました。");
  }
};

export const deleteMeeting = async (meetingId: string) => {
  try {
    await deleteDoc(doc(db, "meetings", meetingId));
  } catch (error) {
    console.error(error);
    throw new Error("ミーティングの削除に失敗しました。");
  }
};
