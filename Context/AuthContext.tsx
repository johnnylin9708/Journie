import React, { createContext, ReactNode, useContext, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  signup: () => void;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const signup = () => {
    console.log("signup");
  };
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
