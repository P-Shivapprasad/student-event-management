const STUDENT_BASE_URL = "http://localhost:8081/api/students";
const EVENT_BASE_URL = "http://localhost:8082/api/events";

// Helper to handle responses properly
const handleResponse = async (res: Response) => {
  const text = await res.text();

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = text;
  }

  if (!res.ok) {
    throw new Error(
      typeof data === "string"
        ? data
        : data.message || "Request failed"
    );
  }

  return data;
};

// Register
export const registerStudent = async (data: {
  rollNumber: string;
  name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${STUDENT_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

// Login — returns { token }
export const loginStudent = async (data: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${STUDENT_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

// Get student by roll number
export const getStudentByRollNumber = async (rollNumber: string) => {
  const res = await fetch(`${STUDENT_BASE_URL}/roll/${rollNumber}`);
  return handleResponse(res);
};

// Get events for a specific student
export const getEventsByRollNumber = async (rollNumber: string) => {
  const res = await fetch(`${EVENT_BASE_URL}/student/${rollNumber}`);
  return handleResponse(res);
};

// Get all events
export const getAllEvents = async () => {
  const res = await fetch(`${EVENT_BASE_URL}/all`);
  return handleResponse(res);
};

// Add an event (requires JWT token)
export const addEvent = async (
  event: {
    rollNumber: string;
    studentName: string;
    eventName: string;
    eventLocation: string;
    eventDate: string;
    eventDescription: string;
  },
  token: string
) => {
  const res = await fetch(`${EVENT_BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(event),
  });

  return handleResponse(res);
};