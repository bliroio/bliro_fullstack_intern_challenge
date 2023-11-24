'use client'
import React, { useState } from 'react';
import MeetingList from './components/meetingList';
import MeetingForm from './components/MeetingForm';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Meeting } from './models/Meeting';

const Home: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = (meeting: Meeting) => {
    setIsCreating(false);
  };

  if (isCreating) {
    return <MeetingForm onCreate={handleCreate} />;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        Meetings
        <Button onClick={() => setIsCreating(true)} style={{ float: 'right' }}>
          Create Meeting
        </Button>
      </Typography>
      <MeetingList />
    </Container>
  );
};

export default Home;
