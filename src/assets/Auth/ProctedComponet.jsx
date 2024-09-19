import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedComponent = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/protected-route', {
          method: 'GET',
          credentials: 'include', // Make sure cookies are sent
        });

        if (response.status === 401) {
          // No session or session expired, clear user and redirect to login
          setUser(null);
          localStorage.removeItem('user');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking session', error);
      }
    };

    if (!user) {
      checkSession(); // Check if the user session is still valid
    }
  }, [user, setUser, navigate]);

  return (
    <div>
      {/* Protected content here */}
    </div>
  );
};

export default ProtectedComponent;
