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

export default function LinearWithValueLabel(props) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (props.campaignData.amountNeeded ===0)
    {
      setProgress(0)
    }else
    {
      setProgress((props.campaignData.amountCurrent/props.campaignData.amountNeeded)*100)
    }
    
  }, []);

  return (
      <LinearProgressWithLabel value={progress} />
  );
}