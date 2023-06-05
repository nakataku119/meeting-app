import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Auth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { useRouter } from "next/router";

export default function AppHeader() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const router = useRouter();

  const handleClickLogout = async () => {
    await signOut(auth).then(() => {
      setCurrentUser(null);
      router.replace("/");
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ color: "#cff09e", backgroundColor: "#3b8686", zIndex: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">LOGO LOGO</Link>
          </Typography>
          {currentUser ? (
            <>
              <p>name: {currentUser.name}</p>
              <Button
                color="inherit"
                onClick={handleClickLogout}
                sx={{ pl: 5 }}
              >
                ログアウト
              </Button>
              {currentUser.admin && (
                <Button color="inherit">
                  <Link href={"/admin"}>管理者画面へ</Link>
                </Button>
              )}
            </>
          ) : (
            <Button
              color="inherit"
              onClick={() => router.replace("/")}
              sx={{ pl: 5 }}
            >
              ログイン
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
