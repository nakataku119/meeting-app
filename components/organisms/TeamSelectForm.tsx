import { Team } from "@/utils/types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { fetchBelongedTeams } from "@/models/TeamModel";

type Prop = {
  initialValue?: Team;
  onSelectTeam: (team: Team) => void;
};

export default function TeamSelectForm(props: Prop) {
  const { onSelectTeam } = props;
  const { currentUser } = useContext(CurrentUserContext);
  const [belongedTeams, setBelongedTeams] = useState<Array<Team>>([]);

  useEffect(() => {
    if (currentUser) {
      fetchBelongedTeams(currentUser.mail).then((res) => setBelongedTeams(res));
    }
  }, []);

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="belonged-team-select-label">Team</InputLabel>
      <Select
        labelId="belonged-team-select-label"
        id="belonged-team-select"
        label="Team"
        disabled={Boolean(props.initialValue)}
        value={props.initialValue?.name}
      >
        {belongedTeams?.map((item: Team, index: number) => (
          <MenuItem
            key={index}
            value={item.name}
            onClick={() => onSelectTeam(item)}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
