// utils/validation.js

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6; // Minimum length 6
};

export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/; // Indian phone numbers
  return re.test(phone);
};

export const validateSignIn = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!validateEmail(email)) {
    errors.email = "Invalid email format";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!validatePassword(password)) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const validateSignUp = ({ fullName, email, phone, address, password, confirmPassword }) => {
  const errors = {};

  if (!fullName?.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!validateEmail(email)) {
    errors.email = "Invalid email format";
  }

  if (!phone) {
    errors.phone = "Phone number is required";
  } else if (!validatePhone(phone)) {
    errors.phone = "Invalid phone number";
  }

  if (!address?.trim()) {
    errors.address = "Address is required";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!validatePassword(password)) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const validateProfile = (data) => {
  const errors = {};

  if (!data.fullName.trim()) errors.fullName = "Full name is required.";

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone is required.";
  } else if (!/^\d{10}$/.test(data.phone)) {
    errors.phone = "Phone must be 10 digits.";
  }

  if (!data.address.trim()) errors.address = "Address is required.";

  // Password is optional, validate only if filled
  if (data.password && data.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
};
