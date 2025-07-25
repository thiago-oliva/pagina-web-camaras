import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Alert, Spinner } from 'react-bootstrap';

const EmailCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Extraer el token del hash de la URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        
        if (accessToken) {
          // Redirigir al dashboard si el usuario ya está autenticado
          if (user) {
            navigate('/dashboard', { replace: true });
            return;
          }

          // Mostrar mensaje de éxito
          navigate('/login', {
            state: {
              success: '¡Email confirmado correctamente! Ya puedes iniciar sesión.'
            },
            replace: true
          });
        }
      } catch (error) {
        console.error('Error al confirmar email:', error);
        navigate('/login', {
          state: {
            error: 'Error al confirmar tu email. Por favor intenta nuevamente.'
          },
          replace: true
        });
      }
    };

    handleEmailConfirmation();
  }, [navigate, user]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Procesando confirmación de email...</p>
      </div>
    </div>
  );
};

export default EmailCallback;