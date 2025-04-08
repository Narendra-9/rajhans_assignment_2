import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext';
import LoadingScreen from './ui/LoadingScreen/LoadingScreen';
import showToast from '../utils/customToast';
import { LABELS } from '../constants/labels';
import { Navigate } from 'react-router-dom';
import Unauthorized from './ui/Unauthorized/unauthorized';

const PrivateRoute = ({children, role}) => {
    const { user,loading } = useContext(UserContext);

    // Ikkada load avvaka mundhe return ayipokunda undadaaniki condition pettaaanu
    if (loading) return <LoadingScreen/>
  
    if (!user) {
      showToast(LABELS.errorMessages.loginRequired,LABELS.type.error)
      return <Navigate to="/login" />;
    }
    
    if (!role.includes(user?.role)) return <Unauthorized/>
  
    return children;
}

export default PrivateRoute