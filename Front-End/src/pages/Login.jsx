import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await loginUser(form);
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-card">
      <h1>Welcome Back</h1>
      <p className="auth-subtitle">Log in to manage your tasks</p>

      {error && <p className="form-error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="off" />

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} autoComplete="off" />

        <button type="submit" className="btn-primary btn-full">Log In</button>
      </form>

      <p className="auth-switch">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;