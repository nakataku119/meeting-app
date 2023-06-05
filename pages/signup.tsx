import { updateTeam, updateWholeTeamMember } from "@/models/TeamModel";
import { createUser } from "@/models/UserModel";
import { createAccount } from "@/utils/auth";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

type Props = {
  open: boolean;
  onClickConfirm: (name: string, mail: string) => void;
  onClickCancel: () => void;
};

export default function SignupFormDialog(props: Props) {
  const [name, setName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  };

  const handleClickConfirm = async () => {
    try {
      await createAccount(mail, password, name);
      await createUser(mail, name);
      await updateWholeTeamMember(mail);
      router.replace("/mypage");
    } catch (error) {
      console.error(error);
    }
  };

  const resetState = () => {
    setName("");
    setMail("");
    setPassword("");
    setConfirmDialogOpen(false);
  };

  return (
    <>
      <Paper
        elevation={3}
        component="form"
        sx={{ width: "500px", backgroundColor: "#E9EDC9", padding: "20px" }}
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ textAlign: "center", padding: 2 }}
        >
          新規登録
        </Typography>
        <TextField
          id="user-name"
          label="ユーザー名"
          value={name}
          variant="filled"
          sx={{ width: "100%", pb: 1 }}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <TextField
          id="user-mail"
          label="メールアドレス"
          value={mail}
          variant="filled"
          sx={{ width: "100%", pb: 1 }}
          onChange={(event) => setMail(event.target.value)}
          required
        />
        <TextField
          id="user-password"
          label="パスワード"
          type="password"
          value={password}
          variant="filled"
          sx={{ width: "100%", pb: 1 }}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <Button
          type="submit"
          variant="outlined"
          sx={{ width: "100%", padding: "10px" }}
          onClick={() => {
            setConfirmDialogOpen(true);
          }}
        >
          登録
        </Button>
        <Button
          onClick={() => {
            resetState();
          }}
          variant="outlined"
          color="error"
          sx={{ width: "100%", padding: "10px", mt: 1 }}
        >
          Cancel
        </Button>
      </Paper>
      <Dialog open={confirmDialogOpen}>
        <DialogTitle>登録確認</DialogTitle>
        <DialogContent>
          <p>以下の内容で登録しますか？</p>
          <p>名前：{name}</p>
          <p>メール：{mail}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="secondary">
            キャンセル
          </Button>
          <Button
            onClick={() => {
              resetState();
              handleClickConfirm();
            }}
            color="primary"
          >
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
