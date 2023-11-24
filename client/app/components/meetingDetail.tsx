import React, { useState, useContext } from 'react';
import { Meeting } from '../models/Meeting';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { deleteMeeting } from '../services/meetingService';
import MeetingForm from './MeetingForm';
import { MeetingContext } from '../contexts/MeetingContext';

interface MeetingDetailsProps {
  meeting: Meeting;
  onEdit: (meeting: Meeting) => void;
  onDelete: (id: string) => void;
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ({ meeting, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { meetings, setMeetings } = useContext(MeetingContext);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedMeeting: Meeting) => {
    onEdit(updatedMeeting);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteMeeting(meeting._id);
    onDelete(meeting._id);
    setMeetings(meetings.filter(m => m._id !== meeting._id));
  };

  if (isEditing) {
    return <MeetingForm initialMeeting={meeting} onSubmit={handleSave} />;
  }

  return (
    <Paper elevation={3}>
      <Typography variant="h5" component="div">
        {meeting.title}
      </Typography>
      <Typography variant="body1" component="div">
        Start: {meeting.startTime}
      </Typography>
      <Typography variant="body1" component="div">
        End: {meeting.endTime}
      </Typography>
      <Typography variant="body1" component="div">
        Description: {meeting.description}
      </Typography>
      <Typography variant="body1" component="div">
        Participants: {meeting.participants.join(', ')}
      </Typography>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </Paper>
  );
};

export default MeetingDetails;
