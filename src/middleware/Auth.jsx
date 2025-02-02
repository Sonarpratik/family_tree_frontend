import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Auth = ({ children }) => {
    const { isAuthenticated, loading, user } = useSelector((state) => state.user);  
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated || (user && user.role?.name === 'USER')) {
                navigate('/login');
            }
        }
    }, [isAuthenticated, loading, user, navigate]);

    return <>{!loading && isAuthenticated && user?.role?.name !== 'USER' ? children : null}</>;
};

export default Auth;
