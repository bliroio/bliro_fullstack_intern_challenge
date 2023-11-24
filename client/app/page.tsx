'use client'
import React, { useState } from 'react';
import MeetingList from './components/meetingList';
import MeetingForm from './components/MeetingForm';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Home: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    setIsCreating(false);
  };

  if (isCreating) {
    return <MeetingForm onCreate={handleCreate} />;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        Meetings
        <Button onClick={() => setIsCreating(true)} style={{ padding: '10px 0px 0px 20px' }}>
          Create Meeting
        </Button>
      </Typography>
      <MeetingList />
    </Container>
  );
};

export default Home;
