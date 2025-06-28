import React, { useReducer, useEffect, useState } from "react";
import { validateProfile } from "../utils/validation"; // Make sure you have this function
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import API from "../api";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
};

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const ProfileSettings = () => {
  const [formData, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState({});
  const { userData,setUserData } = useContext(AuthContext);

  // Load existing user data from sessionStorage
  useEffect(() => {
    console.log(userData);
    
    if (userData) {
      Object.keys(initialState).forEach((key) => {
        dispatch({ name: key, value: userData[key] || "" });
      });
    }
    // else {
    //     const storedUser = sessionStorage.getItem("user");
    // if (storedUser) {
    //   const user = JSON.parse(storedUser);
    //   Object.keys(initialState).forEach((key) => {
    //     dispatch({ name: key, value: user[key] || "" });
    //   });
    // }
    // }
  }, []);

  // Revalidate whenever form changes


 const handleChange = (e) => {
    dispatch({ name: e.target.name, value: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // Clear error while typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateProfile(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      let res=await API.put("/auth/profile", formData);
      let user=res.data.user;
      setUserData(user)
 sessionStorage.setItem("user", JSON.stringify(user));
      alert("Profile updated successfully");

    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
      <h2 style={{ textAlign: "center" }}>Profile Settings</h2>

      {["fullName", "email", "phone", "address"].map((field, i) => (
        <div key={i} style={{ marginBottom: "1rem" }}>
          <input
            type={
              field === "email"
                ? "email"
                : field === "phone"
                ? "tel"
                : field === "password"
                ? "password"
                : "text"
            }
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={
              field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
            }
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

      <button
        type="submit"
       
      >
        Update Profile
      </button>
    </form>
  );
};

export default ProfileSettings;
