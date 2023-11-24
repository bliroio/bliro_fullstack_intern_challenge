import axios from 'axios';
import { Meeting } from '../models/Meeting';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const MOCKED_AUTH_TOKEN = 'mocked-auth-token';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = MOCKED_AUTH_TOKEN;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getMeetings = async (): Promise<Meeting[]> => {
  try {
    const response = await instance.get<Meeting[]>('');
    return response.data;
  } catch (error) {
    console.error('Error fetching meetings:', error);
    throw error;
  }
};

export const createMeeting = async (meeting: Meeting): Promise<Meeting> => {
  try {
    const response = await instance.post<Meeting>('', meeting);
    return response.data;
  } catch (error) {
    console.error('Error creating meeting:', error);
    throw error;
  }
};

export const updateMeeting = async (meeting: Meeting): Promise<Meeting> => {
  try {
    const response = await instance.put<Meeting>(`/${meeting._id}`, meeting);
    return response.data;
  } catch (error) {
    console.error('Error updating meeting:', error);
    throw error;
  }
};

export const deleteMeeting = async (id: string): Promise<void> => {
  try {
    await instance.delete(`/${id}`);
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw error;
  }
};
