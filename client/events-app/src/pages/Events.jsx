import { useEffect, useState } from "react";
import API from "../services/api";
import "../index.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      <h1>Explore Events</h1>
      <button>Search</button>

      <div className="events-grid">
        {events.length === 0 && <p>No events available</p>}

        {events.map((event) => (
          <div key={event._id} className="event-card">
            <h2>{event.name}</h2>
            <p>{event.location}</p>
            <p>{event.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
