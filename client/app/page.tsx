'use client'
import { MeetingContext } from './contexts/MeetingContext';
import MeetingForm from './components/MeetingForm';
import MeetingList from './components/meetingList';
import React, { useState } from 'react';
import { Meeting } from './models/Meeting';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Home: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const handleCreate = () => {
    setIsCreating(false);
  };

  return (
    <MeetingContext.Provider value={{ meetings, setMeetings }}>
      <Typography variant="h2" gutterBottom>
        Meetings
        <Button onClick={() => setIsCreating(true)} style={{ padding: '10px 0px 0px 20px' }}>
          Create Meeting
        </Button>
      </Typography>
      {isCreating ? <MeetingForm onCreate={handleCreate} /> : <MeetingList />}
    </MeetingContext.Provider>
  );
};

export default Home;
