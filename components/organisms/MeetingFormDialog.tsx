import { Meeting, Team, User } from "@/utils/types";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useContext, useEffect, useState } from "react";
import TeamSelectForm from "./TeamSelectForm";
import "moment-timezone";
import {
  fetchAllUsers,
  fetchMeetingUsers,
  fetchTeamUsers,
} from "@/models/UserModel";
import AgendaSelectFrom from "./AgendaSelectForm";
import moment from "moment";
import { CurrentUserContext } from "../context/CurrentUserContext";

type Props = {
  meeting?: Meeting;
  member?: User;
  open: boolean;
  errors: string[];
  onClickCancel: () => void;
  onClickSubmit: (
    startTime: string,
    endTime: string,
    users: Array<string>,
    agendas: Array<string>,
    freeAgenda: string,
    meetingId: string
  ) => void;
};

export default function MeetingFormDialog(props: Props) {
  const { currentUser } = useContext(CurrentUserContext);
  const [error, setError] = useState<string>();
  const [candidateUsers, setCandidateUsers] = useState<Array<User>>([]);
  const [startTime, setStartTime] = useState<string>(
    props.meeting ? props.meeting.startTime : ""
  );
  const [endTime, setEndTime] = useState<string>(
    props.meeting ? props.meeting.endTime : ""
  );
  const [agendas, setAgendas] = useState<Array<string>>(
    props.meeting ? props.meeting.agendas : []
  );
  const [freeAgenda, setFreeAgenda] = useState<string>(
    props.meeting ? props.meeting.freeAgenda : ""
  );
  const [users, setUsers] = useState<Array<User>>(
    props.member ? [currentUser!, props.member] : [currentUser!]
  );

  useEffect(() => {
    if (props.meeting) {
      fetchMeetingUsers(props.meeting).then((users) => {
        setUsers(users);
      });
    }
  }, []);

  const handleChangeText = async (name: string) => {
    const allUsers = await fetchAllUsers();
    setCandidateUsers(
      allUsers.filter((user) => String(user.name).includes(name))
    );
  };
  const handleSelectUser = (user: User) => {
    if (!users.includes(user)) {
      setCandidateUsers([]);
      setUsers([...users, user]);
    }
  };
  const handleChangeAgendas = (agenda: string) => {
    setAgendas(
      agendas.includes(agenda)
        ? agendas.filter((item) => item !== agenda)
        : [...agendas, agenda]
    );
  };
  const handleChangeFreeAgenda = (text: string) => {
    setFreeAgenda(text);
  };
  const resetState = () => {
    setStartTime("");
    setEndTime("");
    setAgendas([]);
    setFreeAgenda("");
    setUsers([currentUser!]);
    setCandidateUsers([]);
    setError("");
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  };
  const handleSelectTeam = async (team: Team) => {
    const teamUsers = await fetchTeamUsers(team);
    setUsers(teamUsers);
  };

  return (
    <Dialog open={props.open}>
      <Paper
        elevation={3}
        component="form"
        sx={{ width: "500px", backgroundColor: "#E9EDC9", padding: "20px" }}
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{ width: "100%", pb: 3, textAlign: "center" }}
        >
          ミーティングの作成
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <label>開始時間</label>
        <TextField
          type={"datetime-local"}
          sx={{ width: "100%" }}
          value={
            startTime
              ? moment
                  .tz(new Date(startTime), "Asia/Tokyo")
                  .format("YYYY-MM-DDTHH:mm")
              : ""
          }
          onChange={(event) => {
            setStartTime(
              moment
                .tz(new Date(event.target.value), "Asia/Tokyo")
                .format("YYYY-MM-DDTHH:mm")
            );
          }}
        />
        <label>終了時間</label>
        <TextField
          type={"datetime-local"}
          sx={{ width: "100%" }}
          value={
            endTime
              ? moment
                  .tz(new Date(endTime), "Asia/Tokyo")
                  .format("YYYY-MM-DDTHH:mm")
              : ""
          }
          onChange={(event) => {
            setEndTime(
              moment
                .tz(new Date(event.target.value), "Asia/Tokyo")
                .format("YYYY-MM-DDTHH:mm")
            );
          }}
        />
        <Box
          sx={{ border: 1, borderRadius: 2, height: 100, padding: 0.5, mb: 1 }}
        >
          <Typography component="h1" sx={{ width: "100%", fontSize: 3 }}>
            招待メンバー
          </Typography>
          {users.map((user: User, index: number) => (
            <Chip
              avatar={<Avatar>F</Avatar>}
              label={user?.name}
              sx={{ margin: 0.2 }}
              onDelete={() => {
                setUsers(users.filter((item) => item.mail != user.mail));
              }}
              size="small"
              key={index}
            />
          ))}
        </Box>
        <Typography
          component="h1"
          sx={{ width: "100%", fontSize: 14, textAlign: "center" }}
        >
          メンバーまたはチームを追加してください。
        </Typography>
        <TextField
          id="user-name"
          label="Name"
          variant="filled"
          sx={{ width: "100%", pb: 0 }}
          onChange={(event) => handleChangeText(event.target.value)}
        />
        {candidateUsers?.map((user: User, index: number) => (
          <MenuItem
            key={index}
            value={user.name}
            onClick={() => handleSelectUser(user)}
          >
            {user.name}
          </MenuItem>
        ))}
        <TeamSelectForm onSelectTeam={handleSelectTeam} />
        <AgendaSelectFrom onChange={handleChangeAgendas} agendas={agendas} />
        <TextField
          id="other-agenda"
          label="その他"
          variant="filled"
          sx={{ width: "100%", pb: 1 }}
          onChange={(event) => handleChangeFreeAgenda(event.target.value)}
          multiline
          maxRows={4}
          value={freeAgenda}
        />
        {props.errors.length != 0 &&
          props.errors.map((error, index) => (
            <p key={index}>{`・ ${error}`}</p>
          ))}
        <Button
          type="submit"
          variant="outlined"
          sx={{ width: "100%", padding: "10px" }}
          onClick={() => {
            if (
              !endTime ||
              !startTime ||
              new Date(endTime)! <= new Date(startTime)!
            ) {
              return setError("時間が不正です。");
            }
            resetState();
            props.onClickSubmit(
              startTime,
              endTime,
              users.map((user) => user.mail),
              agendas,
              freeAgenda,
              props.meeting?.id || ""
            );
          }}
        >
          登録
        </Button>
        <Button
          onClick={() => {
            resetState();
            props.onClickCancel();
          }}
          variant="outlined"
          color="error"
          sx={{ width: "100%", padding: "10px", mt: 1 }}
        >
          Cancel
        </Button>
      </Paper>
    </Dialog>
  );
}
