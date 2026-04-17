import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEventsByRollNumber, addEvent } from "../api/studentApi";

interface Event {
  id?: string;
  rollNumber: string;
  studentName: string;
  eventName: string;
  eventLocation: string;
  eventDate: string;
  eventDescription: string;
}

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    eventLocation: "",
    eventDate: "",
    eventDescription: "",
  });

  const rollNumber = localStorage.getItem("rollNumber") || "";
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    if (!token || !rollNumber) {
      navigate("/login");
      return;
    }
    getEventsByRollNumber(rollNumber)
      .then(setEvents)
      .catch(() => alert("Failed to load events."));
  }, [rollNumber, token, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const added = await addEvent(
        {
          rollNumber,
          studentName: "",
          ...newEvent,
        },
        token
      );
      setEvents((prev) => [...prev, added]);
      setNewEvent({ eventName: "", eventLocation: "", eventDate: "", eventDescription: "" });
      setShowForm(false);
    } catch {
      alert("Failed to add event.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rollNumber");
    navigate("/login");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Events</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {showForm ? "Cancel" : "+ Add Event"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddEvent}
          className="bg-white p-4 rounded shadow mb-6 max-w-lg"
        >
          <h2 className="text-lg font-semibold mb-3">Add New Event</h2>
          <input
            name="eventName"
            placeholder="Event Name"
            value={newEvent.eventName}
            onChange={handleChange}
            className="w-full p-2 border mb-2"
            required
          />
          <input
            name="eventLocation"
            placeholder="Location"
            value={newEvent.eventLocation}
            onChange={handleChange}
            className="w-full p-2 border mb-2"
            required
          />
          <input
            name="eventDate"
            type="date"
            value={newEvent.eventDate}
            onChange={handleChange}
            className="w-full p-2 border mb-2"
            required
          />
          <textarea
            name="eventDescription"
            placeholder="Description"
            value={newEvent.eventDescription}
            onChange={handleChange}
            className="w-full p-2 border mb-2"
            rows={3}
          />
          <button type="submit" className="bg-green-500 text-white p-2 w-full">
            Submit
          </button>
        </form>
      )}

      {events.length === 0 ? (
        <p className="text-gray-500">No events found for roll number <strong>{rollNumber}</strong>.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <div key={event.id || index} className="bg-blue-100 p-4 rounded shadow">
              <h3 className="font-bold text-lg">{event.eventName}</h3>
              <p className="text-sm text-gray-600">{event.eventLocation}</p>
              <p className="text-sm text-gray-600">{event.eventDate}</p>
              <p className="mt-2 text-sm">{event.eventDescription}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
