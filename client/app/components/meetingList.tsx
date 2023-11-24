import React, { useEffect, useState } from 'react';
import { getMeetings } from '../services/meetingService';
import { Meeting } from '../models/Meeting';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MeetingDetails from './meetingDetail';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('default', {
    dateStyle: 'long',
    timeStyle: 'short',
  });
  return formatter.format(date);
};

const MeetingList: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    getMeetings().then(setMeetings);
  }, []);

  const handleEdit = (updatedMeeting: Meeting) => {
    setMeetings(meetings.map(meeting => meeting._id === updatedMeeting._id ? updatedMeeting : meeting));
    setSelectedMeeting(null);
  };

  const handleDelete = (id: string) => {
    setMeetings(meetings.filter(meeting => meeting._id !== id));
    setSelectedMeeting(null);
  };

  if (selectedMeeting) {
    return <MeetingDetails meeting={selectedMeeting} onEdit={handleEdit} onDelete={handleDelete} />;
  }

  return (
    <Paper elevation={3}>
      <List>
        {meetings.map((meeting, index) => (
          <React.Fragment key={meeting._id}>
            <Button onClick={() => setSelectedMeeting(meeting)}>
              <ListItemText
                primary={meeting.title}
                secondary={
                  <>
                    <div>Start: {formatDate(meeting.startTime)}</div>
                    <div>End: {formatDate(meeting.endTime)}</div>
                  </>
                }
              />
            </Button>
            {index < meetings.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default MeetingList;
