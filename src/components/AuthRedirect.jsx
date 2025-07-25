import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(location.state?.from?.pathname || '/', { replace: true });
    }
  }, [user, navigate, location]);

  return null;
};

export default AuthRedirect;