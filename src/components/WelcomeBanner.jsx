import { Alert, Button } from 'react-bootstrap';
import { useAuth } from './AuthContext';

const WelcomeBanner = () => {
  const { welcomeData, clearWelcome } = useAuth();

  if (!welcomeData) return null;

  return (
    <Alert 
      variant={welcomeData.variant} 
      className="mt-3"
      onClose={clearWelcome} 
      dismissible
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h4>{welcomeData.title}</h4>
          <p className="mb-0">{welcomeData.message}</p>
        </div>
        <Button 
          variant={`outline-${welcomeData.variant}`}
          onClick={clearWelcome}
        >
          Cerrar
        </Button>
      </div>
    </Alert>
  );
};

export default WelcomeBanner;