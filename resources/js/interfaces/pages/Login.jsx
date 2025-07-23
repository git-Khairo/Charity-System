import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePost from '../../services/API/usePost';
import { AuthContext } from '../components/AuthContext';

const LOGIN_ENDPOINTS = {
  beneficiary: '/api/beneficiary/login',
  volunteer: '/api/volunteer/login',
};

const Login = () => {
  const [activeLoginTab, setActiveLoginTab] = useState('beneficiary');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { post, error, loading } = usePost();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validation
    let newErrors = { email: '', password: '' };
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password || typeof formData.password !== 'string' || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      return;
    }

    try {
      const result = await post(LOGIN_ENDPOINTS[activeLoginTab], formData);
      console.log(result);
      // Save token or role info if returned
      if (result.user) {
        sessionStorage.setItem('token', result.user.token);
        login(result.user.token, result.user.user);
        navigate('/');
      }

    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <form onSubmit={handleLogin}>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Login</h2>

        {/* Login Role Tabs */}
        <div className="flex justify-center mb-8 bg-gray-50 rounded-lg p-1">
          <button
            type="button"
            className={`flex-1 px-6 py-3 text-lg font-medium rounded-md transition duration-300
              ${activeLoginTab === 'beneficiary'
                ? 'bg-[#002366] text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
              }`}
            onClick={() => setActiveLoginTab('beneficiary')}
          >
            Beneficiary Login
          </button>
          <button
            type="button"
            className={`flex-1 px-6 py-3 text-lg font-medium rounded-md transition duration-300
              ${activeLoginTab === 'volunteer'
                ? 'bg-[#002366] text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
              }`}
            onClick={() => setActiveLoginTab('volunteer')}
          >
            Volunteer Login
          </button>
        </div>
        {/* End Login Role Tabs */}

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className={`w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-200 transition duration-200
              ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        <div className="mb-8">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className={`w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-200 transition duration-200
              ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-[#002366] text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300 text-lg font-semibold shadow-md hover:shadow-lg"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300"
            onClick={() => navigate('/userSelection')}
          >
            Register Now
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;