import React, { useEffect, useState } from 'react'
import styles from "./Unauthorized.module.css"
import { LABELS } from '../../../constants/labels'
import { useNavigate } from 'react-router-dom';
const Unauthorized = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

        useEffect(() => {
            let timer;

            const startCountdown=()=> {
                timer = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev === 1) {
                            clearInterval(timer);
                            navigate("/");
                        }
                        return prev - 1;
                    });
                }, 1000);
            }

            startCountdown();
    
            return () => {
                if (timer) clearInterval(timer);
            };
    
        }, [navigate]);
  return (
    <div className={styles.container}>
        <h1 className={styles.heading}>{LABELS.errorMessages.unauthorized}</h1>
        <p className={styles.message}>{LABELS.errorMessages.unauthorizedMsg}</p>
        <p className={styles.countDownMsg}>Redirecting in <span className={styles.countdown}>{countdown}</span> seconds...</p>
    </div>
  )
}


export default Unauthorized