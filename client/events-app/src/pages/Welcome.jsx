import { useNavigate } from "react-router-dom";
import "../index.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>
        Welcome to <span>The Social Hub</span>
      </h1>
      <p>
        Your one-stop hub for <b>exciting events</b> — meet, explore, and
        experience like never before!
      </p>
      <button onClick={() => navigate("/events")}>Explore Events</button>
    </div>
  );
};

export default Welcome;
