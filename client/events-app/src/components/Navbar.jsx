import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email");

  const isAdmin = userEmail === "crio.do.test@example.com";

  const logout = () => {
    localStorage.clear();
    navigate("/events");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/events" style={{ marginRight: "15px" }}>
        The Social Hub
      </Link>

      {!token && (
        <>
          <Link to="/login" style={{ marginRight: "15px" }}>
            Login
          </Link>
          <Link to="/signup" style={{ marginRight: "15px" }}>
            Signup
          </Link>
        </>
      )}

      {token && (
        <>
          <Link to="/dashboard" style={{ marginRight: "15px" }}>
            Dashboard
          </Link>
          <Link to="/profile" style={{ marginRight: "15px" }}>
            Profile
          </Link>
          {isAdmin && (
            <>
              <Link to="/admin" style={{ marginRight: "15px" }}>
                Admin
              </Link>
              <Link to="/organizer" style={{ marginRight: "15px" }}>
                Organizer
              </Link>
            </>
          )}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
