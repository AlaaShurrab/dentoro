import {
  ReactNode,
  useContext,
  useState,
  createContext,
  useLayoutEffect,
} from 'react';
import Axios from 'axios';

interface Props {
  children: ReactNode;
}

type IsAuthContextType = [
  boolean?,
  React.Dispatch<React.SetStateAction<boolean>>?
];

const IsAuthContext = createContext<Partial<IsAuthContextType>>([]);

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const authState = useState(false);
  const [, setIsAuth] = authState;

  useLayoutEffect(() => {
    // checkAuth
    (async () => {
      try {
        await Axios.get('/api/v1/is-auth');
        setIsAuth(true);
      } catch ({ response }) {
        setIsAuth(false);
      }
    })();
  }, [setIsAuth]);

  return (
    <IsAuthContext.Provider value={authState}>
      {children}
    </IsAuthContext.Provider>
  );
};

export const useAuth = (): IsAuthContextType => useContext(IsAuthContext);

export default IsAuthContext;
