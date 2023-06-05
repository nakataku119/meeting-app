import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { User } from "@/utils/types";
import { useRouter } from "next/router";

type Props = {
  users: Array<User>;
  onClickDelete: (id: string) => void;
  onClickDialogConfirm: (name: string, mail: string, password: string) => void;
};

export default function UsersList(props: Props) {
  const [userDialogOpen, setUserDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleCreateUser = (name: string, mail: string, password: string) => {
    setUserDialogOpen(false);
    props.onClickDialogConfirm(name, mail, password);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>名前</TableCell>
            <TableCell>メール</TableCell>
            <TableCell>権限</TableCell>
            <TableCell>
              <Button
                size="small"
                variant="outlined"
                onClick={() => router.push("/signup")}
              >
                ユーザーを作成
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map((user, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {user.mail}
              </TableCell>
              <TableCell component="th" scope="row">
                {user.admin ? "管理者" : "一般"}
              </TableCell>
              <TableCell component="th" scope="row">
                <Button size="small" variant="outlined" color="error">
                  削除
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
