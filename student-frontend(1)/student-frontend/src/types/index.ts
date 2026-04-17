export interface Student {
  rollNumber: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Event {
  studentName: string;
  studentRollNumber: string;
  eventName: string;
  eventLocation: string;
  eventDate: string;
  eventDescription: string;
}