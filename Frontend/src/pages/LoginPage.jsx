import React, { useState } from 'react'
import styles from "../styles/LoginPage.module.css"
import RegisterContainer from '../components/ui/RegisterContainer/RegisterContainer';
import LoginContainer from '../components/ui/LoginContainer/LoginContainer';
import { LABELS } from '../constants/labels';
import ForgotPassword from '../components/ui/ForgotPassword/ForgotPassword';

const LoginPage = () => {
  const [showContent,setShowContent]=useState(LABELS.headings.login);

  const changeContainer=(content)=>{
    setShowContent(content);
  }

  return (
    <div className={styles.mainContainer}>

      {showContent === LABELS.headings.register && (<RegisterContainer changeContainer={changeContainer}/>)}

      {showContent === LABELS.headings.login && (<LoginContainer changeContainer={changeContainer}/>)}
      
      {showContent === LABELS.headings.forgotPassword && (<ForgotPassword changeContainer={changeContainer}/>)}
      
    </div>
  )
}

export default LoginPage