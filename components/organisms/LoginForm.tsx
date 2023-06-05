import { login } from "@/utils/auth";
import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent, useContext, useState } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { useRouter } from "next/router";

export default function LoginForm() {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>();
  const { setCurrentUser } = useContext(CurrentUserContext);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  };

  const handleClickButton = async () => {
    await login(mail, password)
      .then((user) => {
        setError("");
        setCurrentUser(user);
        console.log(user);
        router.push("/mypage");
      })
      .catch((error) => {
        console.log(error);
        setError("メールアドレスまたはパスワードが間違っています。");
      });
  };

  return (
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
        ログイン
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        id="user-name"
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
      <Typography
        variant="body2"
        component="div"
        sx={{ fontSize: "15px", color: "red" }}
      >
        ※@genit.jpのアドレスを使用。
      </Typography>
      <Button
        type="submit"
        variant="outlined"
        sx={{ width: "100%", padding: "10px", mt: 3 }}
        onClick={handleClickButton}
      >
        ログイン
      </Button>
    </Paper>
  );
}
