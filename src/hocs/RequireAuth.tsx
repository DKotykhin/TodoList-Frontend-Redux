import { useLocation, Navigate } from 'react-router-dom';
import Spinner from "components/spinner/Spinner";

import { useAuth } from "hooks/isAuth";
import { useError } from 'hooks/isError';

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
    
    const location = useLocation();
    const isAuth = useAuth();
    const isError = useError();

    if (!isAuth) {
        return isError ? <Navigate to='/login' state={{ from: location }} /> : <Spinner />
    }

    return children;
}

export { RequireAuth };