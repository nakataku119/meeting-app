import { Button } from '@mui/material';
import { styled } from '@mui/system';

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  backgroundSize: '200% 200%',
  animation: 'shining 3s ease-in-out infinite',

  '@keyframes shining': {
    '0%': {
      backgroundPosition: '200% 200%',
    },
    '50%': {
      backgroundPosition: '0% 200%',
    },
    '100%': {
      backgroundPosition: '200% 200%',
    },
  },
}));

type Props = {
  onClick: () => void;
};

export default function StartButton(props: Props) {
  return <GradientButton sx={{mb:1, width:"95%"}} onClick={props.onClick}>Start</GradientButton>;
}