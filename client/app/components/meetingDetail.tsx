import React from 'react';
import { Meeting } from '../models/Meeting';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

interface MeetingDetailsProps {
  meeting: Meeting;
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ({ meeting }) => {
  return (
    <Paper elevation={3}>
      <Typography variant="h5" component="div">
        {meeting.title}
      </Typography>
      <Typography variant="body1" component="div">
        Start: {new Intl.DateTimeFormat('default', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(meeting.startTime))}
      </Typography>
      <Typography variant="body1" component="div">
        End: {new Intl.DateTimeFormat('default', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(meeting.endTime))}
      </Typography>
      {meeting.description && (
        <Typography variant="body1" component="div">
          Description: {meeting?.description }
        </Typography>
      )}
      {meeting.participants && (
        <List>
          {meeting.participants.map((participant, index) => (
            <ListItem key={index}>
              <Typography variant="body1" component="div">
                Participant: {participant}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default MeetingDetails;
