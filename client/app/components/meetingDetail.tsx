import React, { useState } from 'react';
import { Meeting } from '../models/Meeting';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { updateMeeting, deleteMeeting } from '../services/meetingService';

interface MeetingDetailsProps {
  meeting: Meeting;
  onEdit: (meeting: Meeting) => void;
  onDelete: (id: string) => void;
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ({ meeting, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMeeting, setEditedMeeting] = useState(meeting);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const updatedMeeting = await updateMeeting(editedMeeting);
    onEdit(updatedMeeting);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteMeeting(meeting._id);
    onDelete(meeting.id);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedMeeting({
      ...editedMeeting,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Paper elevation={3}>
      {isEditing ? (
        <>
          <TextField label="Title" name="title" value={editedMeeting.title} onChange={handleChange} />
          <TextField label="Start Time" name="startTime" value={editedMeeting.startTime} onChange={handleChange} />
          <TextField label="End Time" name="endTime" value={editedMeeting.endTime} onChange={handleChange} />
          <TextField label="Description" name="description" value={editedMeeting.description} onChange={handleChange} />
          <TextField label="Participants" name="participants" value={editedMeeting.participants.join(',')} onChange={handleChange} />
          <Button onClick={handleSave}>Save</Button>
        </>
      ) : (
        <>
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
        </>
      )}
      <Button onClick={handleDelete}>Delete</Button>
    </Paper>
  );
};

export default MeetingDetails;
