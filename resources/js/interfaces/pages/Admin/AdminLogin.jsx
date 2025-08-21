import { useContext, useState } from 'react';
import usePost from '../../../services/API/usePost';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { post, error, loading } = usePost();
  const navigate = useNavigate();
  const { login, auth } = useContext(AuthContext);

  const validateForm = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await post('/api/admin/login', { email, password });
      
      login(result.user.token, result.user.user);

      if(result.user.user.name == 'Super Admin'){
        navigate('/superadmin/dashboard');
        return;
      }
      
      navigate(`/dashboard/${result.user.user.id}`)
    } catch (err) {
      console.error('Admin login failed:', err);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your password"
                required
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error.message || 'Login failed. Please try again.'}</p>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;