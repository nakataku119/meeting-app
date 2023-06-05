import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";

type Prop = {
  onChange: (agenda: string) => void;
  agendas: Array<string>;
};

export default function AgendaSelectFrom(props: Prop) {
  const agendas = [
    "業務に関して",
    "人間関係",
    "心身の状態",
    "今後のキャリア",
    "プライベート",
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography component="h1" sx={{ width: "100%", fontSize: 5 }}>
        Agenda
      </Typography>
      {agendas.map((agenda: string, index: number) => (
        <FormControlLabel
          control={
            <Checkbox
              onChange={() => props.onChange(agenda)}
              value={agenda}
              color="primary"
              checked={props.agendas.includes(agenda)}
            />
          }
          label={agenda}
          key={index}
        />
      ))}
    </Box>
  );
}
