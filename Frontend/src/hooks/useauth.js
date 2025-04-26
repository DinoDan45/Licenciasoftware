import { useContext } from 'react';
import { AuthContext } from '../context/authcontext.jsx';

export const useAuth = () => useContext(AuthContext);