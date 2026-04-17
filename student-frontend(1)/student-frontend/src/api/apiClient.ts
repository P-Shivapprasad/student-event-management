// src/api/apiClient.ts
// Base URL is empty because Vite proxy handles routing in dev.
// In production, set VITE_API_BASE_URL in your .env file.
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API error ${res.status}: ${error}`);
  }

  // Return null for 204 No Content
  if (res.status === 204) return null as T;
  return res.json() as Promise<T>;
}

// ── Student Service (/api/students → localhost:8081) ──────────────────────────

export interface Student {
  id?: number;
  name: string;
  email: string;
  // add more fields as your entity requires
}

export const studentApi = {
  getAll: ()                      => request<Student[]>('/api/students'),
  getById: (id: number)           => request<Student>(`/api/students/${id}`),
  create: (data: Student)         => request<Student>('/api/students', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Student) => request<Student>(`/api/students/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number)            => request<void>(`/api/students/${id}`, { method: 'DELETE' }),
};

// ── Event Service (/api/events → localhost:8082) ──────────────────────────────

export interface EventItem {
  id?: number;
  title: string;
  date: string;
  // add more fields as your entity requires
}

export const eventApi = {
  getAll: ()                        => request<EventItem[]>('/api/events'),
  getById: (id: number)             => request<EventItem>(`/api/events/${id}`),
  create: (data: EventItem)         => request<EventItem>('/api/events', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: EventItem) => request<EventItem>(`/api/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number)              => request<void>(`/api/events/${id}`, { method: 'DELETE' }),
};