import React from 'react';
import { Meeting } from '../models/Meeting';

interface MeetingContextProps {
  meetings: Meeting[];
  setMeetings: React.Dispatch<React.SetStateAction<Meeting[]>>;
}

export const MeetingContext = React.createContext<MeetingContextProps>({
  meetings: [],
  setMeetings: () => {},
});
