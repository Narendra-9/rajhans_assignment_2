import React, { useState } from 'react'
import styles from "./DeactivateUser.module.css"
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import DeactivateConfirmation from '../PasswordResetModal/DeactivateConfirmation';

const DeactivateUser = () => {
  const [show,setShow]=useState(false);

  const handleClose=()=>{
    setShow(false);
  }

  const handleOpen=()=>{
    setShow(true)
  }

  return (
    <div className={styles.container}>

      <DeactivateConfirmation handleClose={handleClose} show={show}/>

      <p className={styles.message}>  
        Are you sure you want to deactivate your account ? <br></br>
        You will no longer be able to access your account until an admin reactivates it.<br></br> 
        This action is irreversible without admin approval.
      </p>

      <div className={styles.effects}>
        <p className={styles.effect}><CloseIcon className={styles.icon}/> You won’t be able to log in.</p>
        <p className={styles.effect}><CloseIcon className={styles.icon}/>  Your profile and data will be inaccessible.</p>
        <p className={styles.effect}><CloseIcon className={styles.icon}/>  You won’t receive notifications or emails.</p>
        <p className={styles.effect}><WarningIcon className={styles.wicon}/> Only an admin can reactivate your account.</p>
      </div>

      <button className={styles.btn} onClick={handleOpen}>Deactivate</button>
    </div>
  )
}

export default DeactivateUser