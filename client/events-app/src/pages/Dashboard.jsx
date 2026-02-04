import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const res = await API.get("/users/registered-events");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRegisteredEvents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome</h1>
      <h2>Your Registered Events</h2>
      <div style={{ marginTop: "20px" }}>
        {events.length === 0 && <p>No registered events</p>}
        {events.map((event) => (
          <div
            key={event._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{event.name}</h3>
            <p>{event.location}</p>
            <p>{event.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
