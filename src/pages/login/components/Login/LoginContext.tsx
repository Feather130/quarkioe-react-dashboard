import { createContext } from 'react';

export interface LoginContextProps {}

const LoginContext: React.Context<LoginContextProps> = createContext({});

export default LoginContext;
