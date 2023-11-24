import React, { useState, useEffect, useContext } from 'react';
import { Meeting } from '../models/Meeting';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { MeetingContext } from '../contexts/MeetingContext';
import { createMeeting, updateMeeting } from '../services/meetingService';

interface MeetingFormProps {
  initialMeeting?: Meeting;
  onSubmit?: (meeting: Meeting) => void;
}

const StyledPaper = styled(Paper)`
  padding: 16px;
  margin-bottom: 16px;
`;

const MeetingForm: React.FC<MeetingFormProps> = ({ initialMeeting, onSubmit }) => {
  const [formMeeting, setFormMeeting] = useState<Partial<Meeting>>(initialMeeting || {});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { meetings, setMeetings } = useContext(MeetingContext);

  useEffect(() => {
    setFormMeeting(initialMeeting || {});
  }, [initialMeeting]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;

    setFormMeeting((prevFormMeeting) => ({
      ...prevFormMeeting,
      [name]: name === 'participants' ? value.split(',') : value,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formMeeting.title && formMeeting.startTime && formMeeting.endTime) {
      try {
        let savedMeeting;
        if (formMeeting._id) {
          savedMeeting = await updateMeeting(formMeeting as Meeting);
        } else {
          savedMeeting = await createMeeting(formMeeting as Meeting);
        }

        if (onSubmit) {
          onSubmit(savedMeeting);
        }

        setMeetings([...meetings, savedMeeting]);
        handleSnackbar('Meeting created successfully');
      } catch (error) {
        handleSnackbar('Error creating meeting');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <StyledPaper elevation={3}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formMeeting.title || ''}
                onChange={handleChange}
                required
                inputProps={{ 'data-testid': 'title-input' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Start Time"
                name="startTime"
                type="datetime-local"
                value={formMeeting.startTime || ''}
                onChange={handleChange}
                required
                inputProps={{ 'data-testid': 'start-time-input' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="End Time"
                name="endTime"
                type="datetime-local"
                value={formMeeting.endTime || ''}
                onChange={handleChange}
                required
                inputProps={{ 'data-testid': 'end-time-input' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formMeeting.description || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Participants"
                name="participants"
                value={(formMeeting.participants || []).join(',')}
                placeholder="Enter emails separated by commas"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" data-testid="submit-button">
                {formMeeting._id ? 'Update' : 'Create'} Meeting
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </StyledPaper>
  );
};

export default MeetingForm;
