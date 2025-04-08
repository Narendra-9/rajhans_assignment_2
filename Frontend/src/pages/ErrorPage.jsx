import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "../styles/ErrorPage.module.css"

const ErrorPage = () => {
    const navigate = useNavigate();

    const goHome = () => {
      navigate("/"); 
    };
  
    return (
      <div className={styles.errorPage}>
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <button onClick={goHome} className={styles.homeBtn}>
          Go Back to Home
        </button>
      </div>
    );
}

export default ErrorPage