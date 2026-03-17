import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
      </div>

      <div style={styles.rightLinks}>
        {!token && <Link to="/login" style={styles.link}>Login</Link>}
        {!token && <Link to="/register" style={styles.link}>Register</Link>}

        {token && user?.role === "admin" && (
          <Link to="/admin/dashboard" style={styles.link}>
            Dashboard
          </Link>
        )}

        {token && (
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px",
    backgroundColor: "#222",
  },
  rightLinks: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  button: {
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
  },
};

export default Navbar;