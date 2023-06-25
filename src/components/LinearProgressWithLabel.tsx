import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
      <Box sx={{ width: '100%', height:'100%', display:'flex', justifyContent:'center', alignContent:'center', alignItems:'center' }}>
        <LinearProgress variant="determinate" style={{height:'6px', width:'100%',borderRadius:'10px'}} {...props} />
      </Box>
  );
}

export default function LinearWithValueLabel() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
      <LinearProgressWithLabel value={progress} />
  );
}