import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get JWT token from cookies
  const getTokenFromCookie = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'authToken') {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

  // Set JWT token in cookie (httpOnly would be better from backend)
  const setTokenInCookie = (token) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // 7 days
    document.cookie = `authToken=${encodeURIComponent(token)}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
  };

  // Clear JWT token from cookie
  const clearTokenFromCookie = () => {
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict';
  };

  // Load user data on mount - batch state updates
  useEffect(() => {
    const token = getTokenFromCookie();
    if (token) {
      // Verify token by fetching user data
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Token invalid, clear it
        clearTokenFromCookie();
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      clearTokenFromCookie();
    } finally {
      setLoading(false);
    }
  };

  const login = (newToken, newUser) => {
    setUser(newUser);
    setTokenInCookie(newToken);
  };

  const logout = () => {
    setUser(null);
    clearTokenFromCookie();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
