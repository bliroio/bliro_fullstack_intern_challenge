import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MeetingDetails from '../../app/components/meetingDetail';
import { deleteMeeting } from '../../app/services/meetingService';
import { Meeting } from '../../app/models/Meeting';

jest.mock('../../app/services/meetingService', () => ({
  deleteMeeting: jest.fn(),
}));

const mockMeeting: Meeting = {
    _id: '1',
    title: 'Meeting 1',
    startTime: new Date().toISOString(),  
    endTime: new Date().toISOString(),  
    description: 'Description 1',
    participants: ['Participant 1', 'Participant 2'],
  };

test('renders meeting details', () => {
  const { getByText, getByTestId } = render(
    <MeetingDetails meeting={mockMeeting} onEdit={jest.fn()} onDelete={jest.fn()} />
  );

  const titleElement = getByText('Meeting 1');
  const startTimeElement = getByText(`Start: ${mockMeeting.startTime}`);
  const endTimeElement = getByText(`End: ${mockMeeting.endTime}`);
  const descriptionElement = getByText(`Description: ${mockMeeting.description}`);
  const participantsElement = getByText(`Participants: ${mockMeeting.participants.join(', ')}`);
  const editButton = getByText('Edit');
  const deleteButton = getByText('Delete');

  expect(titleElement).toBeInTheDocument();
  expect(startTimeElement).toBeInTheDocument();
  expect(endTimeElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
  expect(participantsElement).toBeInTheDocument();
  expect(editButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});

test('calls onDelete and deleteMeeting when delete button is clicked', async () => {
  const mockOnDelete = jest.fn();
  const { getByText } = render(
    <MeetingDetails meeting={mockMeeting} onEdit={jest.fn()} onDelete={mockOnDelete} />
  );

  const deleteButton = getByText('Delete');
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(deleteMeeting).toHaveBeenCalledWith('1');
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });
});

