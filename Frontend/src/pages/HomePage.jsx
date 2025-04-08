import React, { useContext, useEffect, useState } from 'react'
import styles from "../styles/HomePage.module.css"
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { LABELS } from '../constants/labels';

const HomePage = () => {
    const [greeting, setGreeting] = useState("");
    const {user}=useContext(UserContext);
    const navigate = useNavigate()

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning! ");
        else if (hour < 18) setGreeting("Good Afternoon! ");
        else setGreeting("Good Evening! ");
      }, []);

  return (
    <div className={styles.container}>

        <p className={styles.greeting}>Hi {user?.firstName}, {greeting}</p>
        <p className={styles.welcomeMsg}>Welcome to UserHub</p>
        
        {(user?.role !== LABELS.roles.user) && (
          <div className={styles.availableOptions}>
            <button className={styles.updateProfile} onClick={()=>navigate("/manage-users")}>Manage Users</button>
          </div>
        )}

        
    </div>
  )
}

export default HomePage