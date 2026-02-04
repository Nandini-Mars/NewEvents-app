import { useEffect, useState } from "react";
import API from "../services/api";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "Participant",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role || "Participant",
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await API.put("/auth/me", user);
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  const handleRequestOrganizer = async () => {
    try {
      await API.post("/auth/request-organizer");
      alert("Organizer request sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to request organizer role");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Your Profile</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Email</label>
        <input type="email" name="email" value={user.email} readOnly />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => alert("Change Avatar clicked")}>
          Change Avatar
        </button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleSave}>Save Changes</button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <p>Role: {user.role}</p>
        {user.role === "Participant" && (
          <button onClick={handleRequestOrganizer}>
            Request Organizer Role
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
