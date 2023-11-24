import React, { useState } from 'react';
import { Meeting } from '../models/Meeting';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createMeeting } from '../services/meetingService';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

interface MeetingFormProps {
  onCreate: (meeting: Meeting) => void;
}

const StyledPaper = styled(Paper)`
  padding: 16px;
  margin-bottom: 16px;
`;

const MeetingForm: React.FC<MeetingFormProps> = ({ onCreate }) => {
  const [newMeeting, setNewMeeting] = useState<Partial<Meeting>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'participants') {
      setNewMeeting({
        ...newMeeting,
        [event.target.name]: event.target.value.split(','),
      });
    } else {
      setNewMeeting({
        ...newMeeting,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newMeeting.title && newMeeting.startTime && newMeeting.endTime) {
      const createdMeeting = await createMeeting(newMeeting as Meeting);
      onCreate(createdMeeting);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <StyledPaper elevation={3}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <TextField fullWidth label="Title" name="title" onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Start Time" name="startTime" type="datetime-local" onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="End Time" name="endTime" type="datetime-local" onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" name="description" onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Participants" name="participants" placeholder="Enter emails separated by commas" onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained">Create Meeting</Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </StyledPaper>
  );
};

export default MeetingForm;
