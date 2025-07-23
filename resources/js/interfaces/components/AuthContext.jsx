import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetch('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data && data.valid !== false) {
            setAuth({ isAuthenticated: true, user: data.user || data });
          } else {
            setAuth({ isAuthenticated: false, user: null });
            sessionStorage.removeItem('token');
            setToken(null);
          }
        })
        .catch(() => {
          setAuth({ isAuthenticated: false, user: null });
          sessionStorage.removeItem('token');
          setToken(null);
        });
    } else {
      setAuth({ isAuthenticated: false, user: null });
    }
  }, [token]);

  const login = (token, user = null) => {
    sessionStorage.setItem('token', token);
    setToken(token);
    if (user) {
      setAuth({ isAuthenticated: true, user });
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login }}>
      {children}
    </AuthContext.Provider>
  );
};
