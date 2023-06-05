import { Meeting, User } from "@/utils/types";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import {
  getLastMeetingSchedule,
  getNextMeetingSchedule,
} from "@/utils/functions";

type Prop = {
  user: User;
  currentUserPlanedMeetings: Meeting[];
  currentUserPastedMeetings: Meeting[];
  onClick: () => void;
};

export default function MemberCard(props: Prop) {
  const { user, currentUserPlanedMeetings, currentUserPastedMeetings } = props;
  return (
    <Paper
      elevation={3}
      sx={{ height: "100%", mr: 1, display: "flex", flexDirection: "column" }}
    >
      <CardContent sx={{ height: "90%" }}>
        <Box
          sx={{
            display: "flex",
            mb: 1,
          }}
        >
          <Avatar sx={{ mr: 3 }}>R</Avatar>
          <Typography
            sx={{ fontSize: 20, ml: 2, height: "100%", margin: "auto 0" }}
            color="text.secondary"
          >
            {user.name}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Next Meeting
        </Typography>
        {/* 簡単に */}
        <Typography variant="body1" component="div">
          {getNextMeetingSchedule(currentUserPlanedMeetings, user)}
        </Typography>
        <Typography sx={{ mt: 1, fontSize: 14 }} color="text.secondary">
          Last Meeting
        </Typography>
        <Typography variant="body1" component="div">
          {getLastMeetingSchedule(currentUserPastedMeetings, user)}
        </Typography>
      </CardContent>
      <Box sx={{ textAlign: "center", p: 1 }}>
        <Button size="small" variant="outlined" onClick={props.onClick}>
          新規ミーティングを設定
        </Button>
      </Box>
    </Paper>
  );
}
