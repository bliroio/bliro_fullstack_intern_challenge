import React, { useEffect, useState, useContext } from 'react';
import { getMeetings } from '../services/meetingService';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MeetingDetails from './meetingDetail';
import { MeetingContext } from '../contexts/MeetingContext';
import MeetingFilter from './MeetingFilter';
import { Meeting } from '../models/Meeting';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('default', {
    dateStyle: 'long',
    timeStyle: 'short',
  });
  return formatter.format(date);
};

const MeetingList = () => {
  const { meetings, setMeetings } = useContext(MeetingContext);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('title');

  useEffect(() => {
    getMeetings().then(setMeetings);
  }, []);

  const handleEdit = (updatedMeeting: Meeting) => {
    const updatedMeetings = meetings.map(meeting => meeting._id === updatedMeeting._id ? updatedMeeting : meeting);
    setMeetings(updatedMeetings);
    setSelectedMeeting(null);
  };

  const handleDelete = (id: string) => {
    const updatedMeetings = meetings.filter(meeting => meeting._id !== id);
    setMeetings(updatedMeetings);
    setSelectedMeeting(null);
  };

  if (selectedMeeting) {
    return <MeetingDetails meeting={selectedMeeting} onEdit={handleEdit} onDelete={handleDelete} />;
  }

  const filteredMeetings = meetings.filter(meeting => meeting.title.toLowerCase().includes(filter));
  const sortedMeetings = filteredMeetings.sort((a, b) => {
    if (sort === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sort === 'date') {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    } else if (sort === 'participants') {
      return a.participants.length - b.participants.length;
    } else {
      return 0;
    }
  });

  return (
    <Paper elevation={3}>
      <MeetingFilter filter={filter} sort={sort} onFilterChange={setFilter} onSortChange={setSort} />
      <List>
        {sortedMeetings.map((meeting, index) => (
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
            {index < sortedMeetings.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default MeetingList;
