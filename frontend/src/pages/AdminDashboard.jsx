import { useEffect, useState } from "react";
import {
  getAllUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
} from "../services/api";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers(token);
      setUsers(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
    });
    setEditingUserId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      if (editingUserId) {
        const updateData = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        };

        if (formData.password.trim() !== "") {
          updateData.password = formData.password;
        }

        const data = await updateAdminUser(token, editingUserId, updateData);
        setMessage(data.message);
      } else {
        const data = await createAdminUser(token, formData);
        setMessage(data.message);
      }

      resetForm();
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setMessage("");
    setError("");
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const data = await deleteAdminUser(token, userId);
      setMessage(data.message);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>

      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.formSection}>
        <h3>{editingUserId ? "Edit User" : "Create User"}</h3>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder={editingUserId ? "Enter new password (optional)" : "Enter password"}
            value={formData.password}
            onChange={handleChange}
            required={!editingUserId}
            style={styles.input}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>

          <div style={styles.formButtons}>
            <button type="submit" style={styles.button}>
              {editingUserId ? "Update User" : "Create User"}
            </button>

            {editingUserId && (
              <button type="button" onClick={resetForm} style={styles.cancelButton}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={styles.tableSection}>
        <h3>All Users</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.role}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleEdit(user)} style={styles.editButton}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user._id)} style={styles.deleteButton}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.td}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  success: {
    color: "green",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
  formSection: {
    marginBottom: "30px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  formButtons: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "10px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px",
    cursor: "pointer",
  },
  tableSection: {
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #ccc",
    padding: "10px",
    backgroundColor: "#f0f0f0",
  },
  td: {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center",
  },
  editButton: {
    marginRight: "10px",
    padding: "6px 12px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default AdminDashboard;