import axios from 'axios';
import { Meeting } from '../models/Meeting';

const API_BASE_URL = 'http://localhost:3000/api/meetings';
const MOCKED_AUTH_TOKEN = 'mocked-auth-token';

export const getMeetings = async (): Promise<Meeting[]> => {
  try {
    const response = await axios.get<Meeting[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching meetings:', error);
    throw error;
  }
};

export const createMeeting = async (meeting: Meeting): Promise<Meeting> => {
  try {
    const response = await axios.post<Meeting>(API_BASE_URL, meeting, {
      headers: {
        Authorization: MOCKED_AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating meeting:', error);
    throw error;
  }
};

export const updateMeeting = async (meeting: Meeting): Promise<Meeting> => {
  try {
    const response = await axios.put<Meeting>(`${API_BASE_URL}/${meeting._id}`, meeting, {
      headers: {
        Authorization: MOCKED_AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating meeting:', error);
    throw error;
  }
};

export const deleteMeeting = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: {
        Authorization: MOCKED_AUTH_TOKEN,
      },
    });
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw error;
  }
};
