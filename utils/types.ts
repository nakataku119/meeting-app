export type User = {
  name: string;
  mail: string;
  admin: boolean;
};

export type Team = {
  id: string;
  name: string;
  users: string[];
};

export type Meeting = {
  id: string;
  startTime: string;
  endTime: string;
  agendas: string[];
  freeAgenda: string;
  users: string[];
};

export type Agenda = {
  id: number;
  agenda: string;
  mtgId: number;
};

export type MeetingData = {
  id: number | null;
  startTime: Date | null;
  endTime: Date | null;
  freeAgenda?: string;
  members: Array<User>;
  newAgendas: { agenda: string }[];
  deletedAgendasId: number[];
};
