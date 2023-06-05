import { Box, Button, Dialog, Paper, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function TimerDialog(props: Props) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [count, setCount] = useState<number>(0);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  // useEffect(() => {
  //   if (props.open) {
  //     intervalId.current = setInterval(() => {
  //       setCount((prevCount) => prevCount + 1);
  //     }, 1000);
  //   }else if (intervalId.current) {
  //     clearInterval(intervalId.current);
  //     setCount(0);
  //   }
  //   // ComponentがUnmountされた時にタイマーをクリアします
  //   return () => {
  //     if (intervalId.current) {
  //       clearInterval(intervalId.current);
  //     }
  //   };
  // }, [props.open]);

  const data = [
    { option: "好きな本について" },
    { option: "今週末の予定は" },
    { option: "最近のマイブーム" },
  ];

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <Dialog open={props.open}>
      <Paper
        elevation={3}
        sx={{ width: "500px", backgroundColor: "#E9EDC9", padding: "20px" }}
      >
        {/* <Typography
          variant="h5"
          component="div"
          sx={{ textAlign: "center", padding: 2 }}
        >
          経過時間 : {Math.floor(count / 60)}分 {count % 60}秒
        </Typography> */}
        <Box display="flex" justifyContent="center">
          <Button onClick={props.onClose}>ミーティング終了</Button>
        </Box>
        {/* <IceBreaker /> */}
      </Paper>
    </Dialog>
  );
}
