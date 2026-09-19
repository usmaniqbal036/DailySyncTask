import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerUser(form);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h1>Create Account</h1>
      <p className="auth-subtitle">Sign up to start managing your tasks</p>

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} autoComplete="off" disabled={loading || success} />

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="off" disabled={loading || success} />

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} autoComplete="off" disabled={loading || success} />

        <button type="submit" className="btn-primary btn-full" disabled={loading || success}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default Register;