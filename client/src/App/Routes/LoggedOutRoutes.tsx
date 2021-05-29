import { ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '../../Context/isAuthContext';

interface Props {
  children: ReactNode;
  [otherProps: string]: any;
}

const LoggedOutRoutes = ({ children, ...otherProps }: Props): JSX.Element => {
  const [isAuth] = useAuth();

  if (!isAuth) {
    return <Route {...otherProps}>{children}</Route>;
  }
  return <Redirect to="/dashboard" />;
};

export default LoggedOutRoutes;
