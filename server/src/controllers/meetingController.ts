import { Request, Response } from 'express';
import meetingService from '../services/meetingService';

const createMeeting = async (req: Request, res: Response) => {
  try {
    const newMeeting = await meetingService.createMeeting(req.body);
    res.status(201).json(newMeeting);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const getMeeting = async (req: Request, res: Response) => {
  try {
    const meeting = await meetingService.getMeetingById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.json(meeting);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const updateMeeting = async (req: Request, res: Response) => {
  try {
    const updatedMeeting = await meetingService.updateMeeting(
      req.params.id,
      req.body
    );
    if (!updatedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.json(updatedMeeting);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const deleteMeeting = async (req: Request, res: Response) => {
  try {
    const deletedMeeting = await meetingService.deleteMeeting(req.params.id);
    if (!deletedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const listMeetings = async (req: Request, res: Response) => {
  try {
    const meetings = await meetingService.listMeetings();
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default {
  createMeeting,
  getMeeting,
  updateMeeting,
  deleteMeeting,
  listMeetings,
};
