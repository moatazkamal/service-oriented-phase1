import { useEffect, useState } from "react";
import { getWelcomeMessage } from "../services/api";

const Home = () => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    const fetchWelcome = async () => {
      if (!token) return;

      try {
        const data = await getWelcomeMessage(token);
        setWelcomeMessage(data.message);
      } catch (error) {
        setWelcomeMessage("");
      }
    };

    fetchWelcome();
  }, [token]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Home Page</h1>
      {token ? (
        <>
          <p>You are logged in as: <strong>{user?.email}</strong></p>
          <p>{welcomeMessage}</p>
        </>
      ) : (
        <p>Please login or register.</p>
      )}
    </div>
  );
};

export default Home;