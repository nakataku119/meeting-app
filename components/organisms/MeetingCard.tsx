import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Chip, Paper } from "@mui/material";
import { Agenda, Meeting, User } from "@/utils/types";
import { useEffect, useState } from "react";
import { fetchMeetingUsers } from "@/models/UserModel";
import { startTimeFormatter, endTimeFormatter } from "@/utils/functions";
import StartButton from "./StartButton";
import TimerDialog from "./TimerDialog";

type Props = {
  meeting: Meeting;
  onClickEdit: () => void;
  onClickDelete: (id: string) => void;
};

export default function MeetingCard(props: Props) {
  const { meeting, onClickEdit, onClickDelete } = props;
  const [meetingUsers, setMeetingUsers] = useState<Array<User>>([]);
  const [timerOpen, setTimerOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchMeetingUsers(meeting).then((res) => setMeetingUsers(res));
  }, []);

  const handleCloseButton = () => {
    setTimerOpen(false);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: "95%",
        mr: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ height: "90%" }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          ミーティング予定
        </Typography>
        <Typography variant="h6" component="div">
          {`${startTimeFormatter(meeting.startTime)} - ${endTimeFormatter(
            meeting.endTime
          )}`}
        </Typography>
        <Typography sx={{ mb: 1, mt: 1 }} color="text.secondary">
          参加メンバー
        </Typography>
        <Box sx={{ border: 1, borderRadius: 2, padding: 0.5 }}>
          {meetingUsers.map((item: User, index: number) => (
            <Chip
              avatar={<Avatar>F</Avatar>}
              label={item.name}
              sx={{ margin: 0.2 }}
              size="small"
              key={index}
            />
          ))}
        </Box>
        <Typography sx={{ mb: 1, mt: 1 }} color="text.secondary">
          トピック
        </Typography>
        <Box sx={{ height: "30%" }}>
          {meeting.agendas.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
          {meeting.freeAgenda && <li>{meeting.freeAgenda}</li>}
        </Box>
      </CardContent>
      {new Date(meeting.startTime) <= new Date() && (
        <Box sx={{ textAlign: "center" }}>
          <StartButton onClick={() => setTimerOpen(true)} />
        </Box>
      )}
      <Box sx={{ textAlign: "center", mb: 1 }}>
        <Button size="small" variant="outlined" onClick={onClickEdit}>
          詳細・編集
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={() => onClickDelete(meeting.id)}
          sx={{ ml: 1 }}
        >
          削除
        </Button>
      </Box>
      <TimerDialog open={timerOpen} onClose={handleCloseButton} />
    </Paper>
  );
}
