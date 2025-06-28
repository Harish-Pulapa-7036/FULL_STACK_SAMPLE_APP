import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateSignUp } from "../utils/validation";
import API from "../api";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  password: "",
  confirmPassword: "",
};

function formReducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    dispatch({ name: e.target.name, value: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // Clear error while typing
  };

  const handleSignup = async(e) => {
    e.preventDefault();
    console.log(validateSignUp(formData))
    const validationErrors = validateSignUp(formData);
    if (Object.keys(validationErrors).length > 0) {
      console.log(validationErrors);
      
      setErrors(validationErrors);
      return;
    }

    console.log("Submitted Data:", formData);
    const { fullName, email, phone, address, password } = formData;
    try {
    const res = await API.post("/auth/signup", {
      fullName,
      email,
      phone,
      address,
      password
    });

    alert(res.data.message);
    navigate("/login");
  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }
    // navigate("/login");
  };

  return (
    <form
      onSubmit={handleSignup}
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
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>

      {["fullName", "email", "phone", "address", "password", "confirmPassword"].map((field, i) => (
        <div key={i} style={{ marginBottom: "1rem", width: "100%" }}>
          <input
            type={field.includes("password") ? "password" :  "text"}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
            // required
            style={{
              width: "100%",
              padding: "0.6rem",
              borderRadius: "4px",
              border: errors[field] ? "1px solid red" : "1px solid #ccc",
            }}
          />
          {errors[field] && (
            <div style={{ color: "red", fontSize: "0.875rem" }}>{errors[field]}</div>
          )}
        </div>
      ))}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
