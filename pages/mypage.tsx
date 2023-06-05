import { CurrentUserContext } from "@/components/context/CurrentUserContext";
import MeetingCard from "@/components/organisms/MeetingCard";
import MeetingFormDialog from "@/components/organisms/MeetingFormDialog";
import MemberCard from "@/components/organisms/MemberCard";
import TeamSelectForm from "@/components/organisms/TeamSelectForm";
import {
  createMeeting,
  deleteMeeting,
  fetchJoinedMeetings,
  updateMeeting,
} from "@/models/MeetingModel";
import { fetchAllUsers, fetchTeamUsers } from "@/models/UserModel";
import { auth } from "@/utils/firebase";
import { getPastMeetings, getPlanedMeetings } from "@/utils/functions";
import { Meeting, Team, User } from "@/utils/types";
import { Alert, Box, Button, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const MyPage = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const [error, setError] = useState<string>();
  const [joinedMeetings, setJoinedMeetings] = useState<Array<Meeting>>([]);
  const [editedMeeting, setEditedMeeting] = useState<Meeting | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [newMeetingMemberMail, setNewMeetingMemberMail] = useState<
    string | null
  >(null);

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.replace("/");
    }
  });

  const handleDeleteMeeting = async (id: string) => {
    await deleteMeeting(id);
    await fetchJoinedMeetings(currentUser!.mail).then((res) =>
      setJoinedMeetings(res)
    );
  };

  const handleUpdateMeeting = async (
    startTime: string,
    endTime: string,
    users: Array<string>,
    agendas: Array<string>,
    freeAgenda: string,
    meetingId: string
  ) => {
    await updateMeeting(
      meetingId,
      startTime,
      endTime,
      agendas,
      users,
      freeAgenda
    );
    await fetchJoinedMeetings(currentUser!.mail).then((res) =>
      setJoinedMeetings(res)
    );
    setIsDialogOpen(false);
  };

  const handleCreateMeeting = async (
    startTime: string,
    endTime: string,
    users: Array<string>,
    agendas: Array<string>,
    freeAgenda: string
  ) => {
    try {
      await createMeeting(startTime, endTime, agendas, users, freeAgenda);
      await fetchJoinedMeetings(currentUser!.mail).then((res) =>
        setJoinedMeetings(res)
      );
      setNewMeetingMemberMail(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchJoinedMeetings(currentUser.mail).then((res) => {
        setJoinedMeetings(res);
      });
    }
  }, [currentUser]);

  const MeetingCardsList = () => {
    if (getPlanedMeetings(joinedMeetings).length === 0) {
      return (
        <Box
          sx={{
            minHeight: 600,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Typography variant="h5" component="h1" color="text.secondary">
            予定がありません。
          </Typography>
        </Box>
      );
    }
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", minHeight: 600 }}>
        {getPlanedMeetings(joinedMeetings).map((meeting, index) => (
          <Box key={index} sx={{ width: 300, height: 500 }}>
            <MeetingCard
              meeting={meeting}
              onClickEdit={() => {
                setEditedMeeting(meeting);
              }}
              onClickDelete={() => handleDeleteMeeting(meeting.id)}
            />
            <MeetingFormDialog
              onClickSubmit={handleUpdateMeeting}
              onClickCancel={() => {
                setEditedMeeting(null);
                setErrors([]);
              }}
              open={meeting == editedMeeting}
              meeting={meeting}
              errors={errors}
            />
          </Box>
        ))}
      </Box>
    );
  };

  const MemberCardList = () => {
    const [displayedUsers, setDisplayedUsers] = useState<Array<User>>([]);

    useEffect(() => {
      if (selectedTeam) {
        fetchTeamUsers(selectedTeam).then((res) => setDisplayedUsers(res));
      } else {
        fetchAllUsers().then((res) => setDisplayedUsers(res));
      }
    }, []);

    return (
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {displayedUsers.map((item: User, index: number) => {
          if (item.mail != currentUser?.mail) {
            return (
              <Box key={index} sx={{ pb: 1, width: 300, height: 250 }}>
                <MemberCard
                  user={item}
                  currentUserPlanedMeetings={getPlanedMeetings(joinedMeetings)}
                  currentUserPastedMeetings={getPastMeetings(joinedMeetings)}
                  onClick={() => {
                    setNewMeetingMemberMail(item.mail);
                    console.log(item.mail);
                  }}
                />
                <MeetingFormDialog
                  onClickSubmit={handleCreateMeeting}
                  onClickCancel={() => {
                    setNewMeetingMemberMail(null);
                    setErrors([]);
                  }}
                  open={item.mail == newMeetingMemberMail}
                  member={item}
                  errors={errors}
                />
              </Box>
            );
          }
        })}
      </Box>
    );
  };

  if (currentUser) {
    return (
      <Box sx={{ width: 1 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ display: "flex", p: 1, justifyContent: "space-between" }}>
          <Typography variant="h5" component="h1" color="text.secondary">
            今後のミーティング
          </Typography>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setIsDialogOpen(true)}
          >
            新規ミーティングを設定
          </Button>
          <MeetingFormDialog
            open={isDialogOpen}
            onClickCancel={() => {
              setIsDialogOpen(false);
              setErrors([]);
            }}
            onClickSubmit={handleCreateMeeting}
            errors={errors}
          />
        </Box>
        <MeetingCardsList />
        <Box sx={{ display: "flex", p: 1 }}>
          <Typography
            variant="h5"
            component="h1"
            color="text.secondary"
            sx={{ pb: 1, pt: 3, pr: 1 }}
          >
            チームメンバー
          </Typography>
          {/* <TeamSelectForm
            onSelectTeam={(team: Team) => setSelectedTeam(team)}
          /> */}
        </Box>
        <MemberCardList />
      </Box>
    );
  } else {
    return (
      <Box sx={{ width: 1, height: "100vh" }}>
        {/* {!hasToken ? <LoginButtonDialog /> : <p>waiting...</p>} */}
      </Box>
    );
  }
};
export default MyPage;
