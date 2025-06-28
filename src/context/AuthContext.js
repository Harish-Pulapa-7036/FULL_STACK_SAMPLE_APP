import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

 useEffect(() => {
  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");
  console.log(token, user);

  if (token && user) {
    setUserData(JSON.parse(user)); 
  }
}, []);


  const login = (user, token) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user",JSON.stringify( user));
    setUserData(user);
  };

  const logout = () => {
    sessionStorage.clear();
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
