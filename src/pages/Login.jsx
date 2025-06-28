import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { validateSignIn } from "../utils/validation";
import API from "../api";
// import API from "../api";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignIn({ email, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
    alert("Login successful!"); 

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }

   
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        backgroundColor: "white",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        margin: "auto",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: "" }));
          }}
          placeholder="Email"
          style={{
            width: "100%",
            padding: "0.6rem",
            borderRadius: "4px",
            border: errors.email ? "1px solid red" : "1px solid #ccc",
          }}
        />
        {errors.email && (
          <div style={{ color: "red", fontSize: "0.875rem" }}>{errors.email}</div>
        )}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
          placeholder="Password"
          style={{
            width: "100%",
            padding: "0.6rem",
            borderRadius: "4px",
            border: errors.password ? "1px solid red" : "1px solid #ccc",
          }}
        />
        {errors.password && (
          <div style={{ color: "red", fontSize: "0.875rem" }}>{errors.password}</div>
        )}
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
