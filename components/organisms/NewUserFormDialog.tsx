import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";

type Props = {
  open: boolean;
  onClickConfirm: (name: string, mail: string) => void;
  onClickCancel: () => void;
};

export default function NewUserFormDialog(props: Props) {
  const [name, setName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  };

  const resetState = () => {
    setName("");
    setMail("");
    setConfirmDialogOpen(false);
  };

  return (
    <Dialog open={props.open}>
      <Paper
        elevation={3}
        component="form"
        sx={{ width: "500px", backgroundColor: "#E9EDC9", padding: "20px" }}
        onSubmit={handleSubmit}
      >
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
            props.onClickCancel();
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
              props.onClickConfirm(name, mail);
            }}
            color="primary"
          >
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}
