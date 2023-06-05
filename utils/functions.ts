import { Meeting, User } from "@/utils/types";

// 日時を2桁にする
function twoDigitFormatter(datetime: number): string {
  return ("0" + String(datetime)).slice(-2);
}
// YYYY/MM/DD hh:mmでフォーマット
export function startTimeFormatter(date: string): string {
  const initDate = new Date(date);
  return `${initDate.getFullYear()}/${twoDigitFormatter(
    initDate.getMonth() + 1
  )}/${twoDigitFormatter(initDate.getDate())} ${twoDigitFormatter(
    initDate.getHours()
  )}:${twoDigitFormatter(initDate.getMinutes())}`;
}
// hh:mmでフォーマット
export function endTimeFormatter(date: string): string {
  const initDate = new Date(date);
  return `${twoDigitFormatter(initDate.getHours())}:${twoDigitFormatter(
    initDate.getMinutes()
  )}`;
}
// 未来時間のミーティングを取得
export function getPlanedMeetings(meetings: Meeting[]): Meeting[] {
  const nowTime = new Date();
  const planedMeetings: Meeting[] = meetings.filter(
    (meeting) => new Date(meeting.endTime) >= nowTime
  );
  // スタート時間を昇順にソート
  planedMeetings.sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
  return planedMeetings;
}
// 過去時間のミーティングを取得
export function getPastMeetings(meetings: Meeting[]): Meeting[] {
  const nowTime = new Date();
  const pastMeetings: Meeting[] = meetings.filter(
    (meeting) => new Date(meeting.endTime) < nowTime
  );
  // スタート時間を降順にソート
  pastMeetings.sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );
  return pastMeetings;
}
// チームメンバーとの直近の予定のミーティングを取得
export function getNextMeetingSchedule(
  currentUserPlanedMeetings: Meeting[],
  teamMember: User
): string {
  const planedMeetingsWithMember = currentUserPlanedMeetings.filter(
    (meeting) => {
      return meeting.users.includes(teamMember.mail);
    }
  );
  if (planedMeetingsWithMember.length > 0) {
    const nextMeeting = planedMeetingsWithMember.reduce(
      (prev: Meeting, current: Meeting) => {
        return current.startTime < prev.startTime ? current : prev;
      }
    );
    return startTimeFormatter(nextMeeting.startTime);
  }
  return "-----";
}
// // チームメンバーとの過去直近のミーティングを取得
export function getLastMeetingSchedule(
  currentUserPastedMeetings: Meeting[],
  teamMember: User
): string {
  const pastMeetingsWithMember = currentUserPastedMeetings.filter((meeting) => {
    return meeting.users.includes(teamMember.mail);
  });
  if (pastMeetingsWithMember.length > 0) {
    const lastMeeting = pastMeetingsWithMember.reduce(
      (prev: Meeting, current: Meeting) => {
        return current.startTime < prev.startTime ? current : prev;
      }
    );
    return startTimeFormatter(lastMeeting.startTime);
  }
  return "-----";
}
