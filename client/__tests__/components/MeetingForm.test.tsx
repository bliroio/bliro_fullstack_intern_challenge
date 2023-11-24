import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MeetingForm from '../../app/components/MeetingForm';
import { createMeeting, updateMeeting } from '../../app/services/meetingService';

jest.mock('../../app/services/meetingService', () => ({
  createMeeting: jest.fn(),
  updateMeeting: jest.fn(),
}));

const mockMeeting = {
  _id: '1',
  title: 'Meeting 1',
  startTime: '2023-11-24T11:01:29.401Z',
  endTime: '2023-11-24T12:01:29.401Z',
  description: 'Description 1',
  participants: ['Participant 1', 'Participant 2'],
};

test('renders MeetingForm with initial values', () => {
    const { getByTestId, getByLabelText, getByText } = render(
      <MeetingForm initialMeeting={mockMeeting} />
    );
  
    const titleInput = getByTestId('title-input') as HTMLInputElement;
    const startTimeInput = getByTestId('start-time-input') as HTMLInputElement;
    const endTimeInput = getByTestId('end-time-input') as HTMLInputElement;
    const descriptionInput = getByLabelText('Description') as HTMLInputElement;
    const participantsInput = getByLabelText('Participants') as HTMLInputElement;
    const submitButton = getByText('Update Meeting');
  
    expect(titleInput).toHaveValue(mockMeeting.title);
    startTimeInput.value = mockMeeting.startTime;
    endTimeInput.value = mockMeeting.endTime;
    expect(descriptionInput).toHaveValue(mockMeeting.description);
    expect(participantsInput).toHaveValue(mockMeeting.participants.join(','));
    expect(submitButton).toBeInTheDocument();
  });
  
  
  

test('submits form with create action', async () => {
  const mockOnCreate = jest.fn();
  const { getByLabelText, getByTestId, getByText } = render(
    <MeetingForm onCreate={mockOnCreate} />
  );

  fireEvent.change(getByLabelText(/title/i), { target: { value: 'New Meeting' } });
  fireEvent.change(getByLabelText(/Start Time/i), { target: { value: '2023-11-24T13:01' } });
  fireEvent.change(getByLabelText(/End Time/i), { target: { value: '2023-11-24T14:01' } });
  fireEvent.change(getByLabelText(/Description/i), { target: { value: 'New Description' } });
  fireEvent.change(getByLabelText(/Participants/i), { target: { value: ['Participant 3' ,'Participant 4']} });

  fireEvent.submit(getByTestId('submit-button'));

  await waitFor(() => {
    expect(createMeeting).toHaveBeenCalledWith({
        title: 'New Meeting',
        startTime: '2023-11-24T13:01',
        endTime: '2023-11-24T14:01',
        description: 'New Description',
        participants: ['Participant 3', 'Participant 4'],
    });
    // expect(mockOnCreate).toHaveBeenCalled();
});
  
});

test('submits form with update action', async () => {
  const mockOnSubmit = jest.fn();
  const { getByLabelText, getByTestId, getByText } = render(
    <MeetingForm initialMeeting={mockMeeting} onSubmit={mockOnSubmit} />
  );

  fireEvent.change(getByLabelText(/title/i), { target: { value: 'Updated Meeting' } });
  fireEvent.change(getByLabelText(/Start Time/i), { target: { value: '2023-11-24T15:01' } });
  fireEvent.change(getByLabelText(/End Time/i), { target: { value: '2023-11-24T16:01' } });
  fireEvent.change(getByLabelText(/Description/i), { target: { value: 'Updated Description' } });
  fireEvent.change(getByLabelText(/Participants/i), { target: { value: 'Participant 5,Participant 6' } });

  fireEvent.submit(getByTestId('submit-button'));

  await waitFor(() => {
    expect(updateMeeting).toHaveBeenCalledWith({
        _id: '1',
        title: 'Updated Meeting',
        startTime: '2023-11-24T15:01',
        endTime: '2023-11-24T16:01',
        description: 'Updated Description',
        participants: ['Participant 5', 'Participant 6'],
    });
    expect(mockOnSubmit).toHaveBeenCalled();
});
  
});
